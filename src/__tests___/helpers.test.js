// const config = require('../src/config')
const { importSchema, exportSchema } = require('../helpers')

// Tests

it('#importSchema - source infer', async () => {
  // Import
  const source = makeUrl('valid.csv')
  const schema = null
  const { columns, metadata } = await importSchema(source, schema)

  // Assert
  expect(columns.length).toEqual(2)
  expect(columns[0].field).toEqual({ name: 'id', type: 'integer', format: 'default' })
  expect(columns[0].values).toEqual(['1', '2'])
  expect(columns[1].field).toEqual({ name: 'name', type: 'string', format: 'default' })
  expect(columns[1].values).toEqual(['english', '中国人'])
  expect(metadata).toEqual({ missingValues: [''] })
})

it('#importSchema - schema priority', async () => {
  // Import
  const source = makeUrl('valid.csv')
  const schema = { fields: [{ name: 'field1' }], missingValues: ['-'] }
  const { columns, metadata } = await importSchema(source, schema)

  // Assert
  expect(columns.length).toEqual(1)
  expect(columns[0].field.name).toEqual('field1')
  expect(columns[0].values).toEqual(['1', '2'])
  expect(metadata).toEqual({ missingValues: ['-'] })
})

it('#importSchema - defective rows', async () => {
  // Import
  const source = makeUrl('defective_rows.csv')
  const schema = null
  const { columns, metadata } = await importSchema(source, schema)

  // Assert
  expect(columns.length).toEqual(3)
  expect(columns[0].field).toEqual({ name: 'id', type: 'year', format: 'default' })
  expect(columns[0].values).toEqual(['1101', '1102'])
  expect(columns[1].field).toEqual({ name: 'name', type: 'string', format: 'default' })
  expect(columns[1].values).toEqual(['John', 'Julie'])
  expect(metadata).toEqual({ missingValues: [''] })
})

it('#importSchema - not supported source format', async () => {
  // Import
  const source = makeUrl('test_schema.json')
  const schema = null
  const { columns, metadata } = await importSchema(source, schema)

  // Assert
  expect(columns.length).toEqual(0)
  expect(metadata).toEqual({})
})

it('#importSchema - stringified schema', async () => {
  // Import
  const source = null
  const schema = '{"fields": []}'
  const { columns, metadata } = await importSchema(source, schema)

  // Assert
  expect(columns.length).toEqual(0)
  expect(metadata).toEqual({ missingValues: [''] })
})

it('#importSchema - bad schema', async () => {
  // Import
  const source = null
  const schema = 'bad schema'

  // Assert
  const error = await catchError(importSchema, source, schema)
  expect(error)
})

it('#exportSchema', () => {
  // Import
  const columns = [{ field: { name: 'field1' } }, { field: { name: 'field2' } }]
  const metadata = { missingValues: ['-'] }
  const schema = exportSchema(columns, metadata)

  // Assert
  expect(schema).toEqual({
    fields: [{ name: 'field1' }, { name: 'field2' }],
    missingValues: ['-'],
  })
})

// Helpers

const makeUrl = (path) => {
  return `https://raw.githubusercontent.com/frictionlessdata/tableschema-ui/master/data/${path}` // eslint-disable-line
}

const catchError = async (func, ...args) => {
  let error
  try {
    await func(...args)
  } catch (exception) {
    error = exception
  }
  return error
}
