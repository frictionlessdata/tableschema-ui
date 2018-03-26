const uuidv4 = require('uuid/v4')
const omit = require('lodash/omit')
const {Table, infer} = require('tableschema')


// Module API

const importSchema = async (source, schema) => {

  // TODO: support File API

  // Get table/rows
  const opts = schema ? {schema} : {}
  const table = await Table.load(source || [], opts)
  const rows = await table.read({limit: 10, cast: false})
  if (rows.length) await table.infer()

  // Compose columns
  const columns = []
  if (table.schema) {
    for (const [index, field] of table.schema.fields.entries()) {
      columns.push({
        id: uuidv4(),
        field: field.descriptor,
        values: rows.map(row => row[index]),
      })
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


// System

module.exports = {
  importSchema,
  exportSchema,
}
