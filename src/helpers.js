const uuidv4 = require('uuid/v4')
const {Table} = require('tableschema')


// Module API

const composeColumns = async (source, schema) => {

  // Defaults
  source = source || []
  schema = schema || {}

  // Load table
  const table = await Table.load(source, schema)

  // Compose columns
  const columns = []
  for (const field of table.schema.fields || []) {
    columns.push({id: uuidv4(), field: field.descriptor})
  }

  return columns
}


const composeSchema = (columns) => {
  return {fields: columns.map(column => column.field)}
}


// System

module.exports = {
  composeColumns,
  composeSchema,
}
