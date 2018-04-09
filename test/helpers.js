const {assert} = require('chai')
// const config = require('../src/config')
const {importSchema, exportSchema} = require('../src/helpers')
const {catchError} = require('./setup')


// Tests

describe('helpers', () => {

  it('#importSchema - source infer', async () => {

    // Import
    const source = makeUrl('valid.csv')
    const schema = null
    const {columns, metadata} = await importSchema(source, schema)

    // Assert
    assert.deepEqual(columns.length, 2)
    assert.deepEqual(columns[0].field, {name: 'id', type: 'integer', format: 'default'})
    assert.deepEqual(columns[0].values, ['1', '2'])
    assert.deepEqual(columns[1].field, {name: 'name', type: 'string', format: 'default'})
    assert.deepEqual(columns[1].values, ['english', '中国人'])
    assert.deepEqual(metadata, {missingValues: ['']})

  })

  it('#importSchema - schema priority', async () => {

    // Import
    const source = makeUrl('valid.csv')
    const schema = {fields: [{name: 'field1'}], missingValues: ['-']}
    const {columns, metadata} = await importSchema(source, schema)

    // Assert
    assert.deepEqual(columns.length, 1)
    assert.deepEqual(columns[0].field.name, 'field1')
    assert.deepEqual(columns[0].values, ['1', '2'])
    assert.deepEqual(metadata, {missingValues: ['-']})

  })

  it('#importSchema - defective rows', async () => {

    // Import
    const source = makeUrl('defective_rows.csv')
    const schema = null
    const {columns, metadata} = await importSchema(source, schema)

    // Assert
    assert.deepEqual(columns.length, 3)
    assert.deepEqual(columns[0].field, {name: 'id', type: 'year', format: 'default'})
    assert.deepEqual(columns[0].values, ['1101', '1102'])
    assert.deepEqual(columns[1].field, {name: 'name', type: 'string', format: 'default'})
    assert.deepEqual(columns[1].values, ['John', 'Julie'])
    assert.deepEqual(metadata, {missingValues: ['']})

  })

  it('#importSchema - not supported source format', async () => {

    // Import
    const source = makeUrl('test_schema.json')
    const schema = null
    const {columns, metadata} = await importSchema(source, schema)

    // Assert
    assert.deepEqual(columns.length, 0)
    assert.deepEqual(metadata, {})

  })

  it('#importSchema - stringified schema', async () => {

    // Import
    const source = null
    const schema = '{"fields": []}'
    const {columns, metadata} = await importSchema(source, schema)

    // Assert
    assert.deepEqual(columns.length, 0)
    assert.deepEqual(metadata, {missingValues: ['']})

  })

  it('#importSchema - bad schema', async () => {

    // Import
    const source = null
    const schema = 'bad schema'

    // Assert
    const error = await catchError(importSchema, source, schema)
    assert(error)

  })

  it('#exportSchema', () => {

    // Import
    const columns = [{field: {name: 'field1'}}, {field: {name: 'field2'}}]
    const metadata = {missingValues: ['-']}
    const schema = exportSchema(columns, metadata)

    // Assert
    assert.deepEqual(schema, {
      fields: [{name: 'field1'}, {name: 'field2'}],
      missingValues: ['-'],
    })

  })

})


// Helpers

const makeUrl = (path) => {
  return `https://raw.githubusercontent.com/frictionlessdata/tableschema-ui/master/data/${path}` // eslint-disable-line
}
