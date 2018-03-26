const uuidv4 = require('uuid/v4')
const omit = require('lodash/omit')
const {infer} = require('tableschema')


// Module API

const importSchema = async (source, schema) => {

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

  // Compose metadata
  const metadata = omit(schema, 'fields')

  return {columns, metadata}
}


const exportSchema = (columns, metadata) => {
  return {
    fields: columns.map(column => column.field),
    ...metadata,
  }
}


// System

module.exports = {
  importSchema,
  exportSchema,
}
