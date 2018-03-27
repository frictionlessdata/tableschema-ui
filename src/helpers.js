const uuidv4 = require('uuid/v4')
const omit = require('lodash/omit')
const {Readable} = require('stream')
const {Table, infer} = require('tableschema')


// Module API

const importSchema = async (source, schema) => {

  // Get table/rows/schema
  const tableSource = await prepareTableSource(source)
  const tableOptions = await prepareTableOptions(schema)
  const table = await Table.load(tableSource, tableOptions)
  const rows = await table.read({limit: 10, cast: false})
  if (rows.length) await table.infer()

  // Compose columns
  const columns = []
  if (table.schema) {
    for (const [index, field] of table.schema.descriptor.fields.entries()) {
      columns.push(createColumn(field, rows.map(row => row[index])))
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


const createColumn = (field, values=[]) => {
  return {id: uuidv4(), field, values}
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

  // Schema url
  return {schema}

}


const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}


// System

module.exports = {
  importSchema,
  exportSchema,
  createColumn,
}
