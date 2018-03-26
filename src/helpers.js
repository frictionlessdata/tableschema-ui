const uuidv4 = require('uuid/v4')
const {infer} = require('tableschema')


// Module API

const composeColumns = async (source, schema) => {

  // TODO: support File API

  // Get schema
  if (!schema) {
    schema = source ? await infer(source) : {}
  }

  // Compose columns
  const columns = []
  for (const field of schema.fields || []) {
    columns.push({id: uuidv4(), field})
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
