const uuidv4 = require('uuid/v4')
const omit = require('lodash/omit')
const {Readable} = require('stream')
const {Table} = require('tableschema')
const config = require('./config')


// Module API

const importSchema = async (source, schema) => {

  // Get table/rows/schema
  const tableSource = await prepareTableSource(source)
  const tableOptions = await prepareTableOptions(schema)
  // TODO: here we use unofficial `relax_column_count` option
  const table = await Table.load(tableSource,
    {relax_column_count: true, delimiter: ',', ...tableOptions, })
  const rows = await table.read({limit: 5, cast: false})
  if (rows.length) await table.infer()

  // Compose columns
  const columns = []
  if (table.schema && table.schema.descriptor.fields) {
    for (const [index, field] of table.schema.descriptor.fields.entries()) {
      const values = rows.map(row => row[index]).filter(value => value !== undefined)
      columns.push(createColumn(columns, field, values))
    }
  }

  // Compose metadata
  let metadata = {}
  if (table.schema) {
    metadata = omit(table.schema.descriptor, 'fields')
  }

  return {columns, metadata}
}


const exportSchema = (columns, metadata) => {
  return {fields: columns.map(column => column.field), ...metadata}
}


const createColumn = (columns, field={}, values=[]) => {
  const formats = getFieldFormats(field.type)
  const name = field.name || `field${columns.length + 1}`
  const type = formats.length ? field.type : 'string'
  const format = formats.includes(field.format) ? field.format : 'default'
  return {id: uuidv4(), field: {...field, name, type, format}, values}
}


const getFieldTypes = () => {
  return Object.keys(config.FIELD_TYPES_AND_FORMATS)
}


const getFieldFormats = (type) => {
  return config.FIELD_TYPES_AND_FORMATS[type] || []
}


// Internal

const prepareTableSource = async (source) => {

  // Source not provided
  if (!source) {
    return []
  }

  // Source uploaded
  if (source instanceof File) {
    const text = await readFile(source)
    return () => {
      const stream = new Readable()
      stream.push(text)
      stream.push(null)
      return stream
    }
  }

  // Source url
  return source

}


const prepareTableOptions = async (schema) => {

  // Schema not provided
  if (!schema) {
    return {}
  }

  // Schema uploaded
  if (schema instanceof File) {
    const text = await readFile(schema)
    return {schema: JSON.parse(text)}
  }

  // Schema stringified
  if (schema.trim && schema.trim().startsWith('{')) {
    return {schema: JSON.parse(schema)}
  }

  // Schema url
  return {schema}

}


const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file.slice(0, 65536))
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
  })
}


// System

module.exports = {
  importSchema,
  exportSchema,
  createColumn,
  getFieldTypes,
  getFieldFormats,
}
