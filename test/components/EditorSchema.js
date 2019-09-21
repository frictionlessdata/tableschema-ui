const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')
const {assert} = require('chai')
const {shallow} = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const {EditorPreview} = require('../../src/components/EditorPreview')
const {EditorFeedback} = require('../../src/components/EditorFeedback')
const {SortableFields} = require('../../src/components/EditorSchema')
const {EditorSchemaConsumer} = require('../../src/components/EditorSchema')
Enzyme.configure({adapter: new Adapter()})


// Tests

describe('EditorSchemaConsumer', () => {

  it('should render', () => {

    // Render
    const columns = [
      {column: 'column1', field: {name: 'field1'}},
      {column: 'column2', field: {name: 'field2'}},
    ]
    const onMoveFieldEnd = sinon.spy()
    const wrapper = shallow(<EditorSchemaConsumer.Inner {...{columns, onMoveFieldEnd}} />)

    // Assert
    assert.deepEqual(wrapper.find('.tableschema-ui-editor-schema').length, 1)
    assert.deepEqual(wrapper.find('.button-edit').text(), '1. Edit')
    assert.deepEqual(wrapper.find('.button-preview').text(), '2. Preview')
    assert.deepEqual(wrapper.find('.button-save').text(), '3. Save')
    assert.deepEqual(wrapper.find(SortableFields).props().onSortEnd, onMoveFieldEnd)
    assert.deepEqual(wrapper.find(SortableFields).props().columns, columns)
    assert.deepEqual(wrapper.find(EditorFeedback).length, 1)
    assert.deepEqual(wrapper.find(EditorPreview).length, 1)

  })

  it.skip('should be able to save schema', () => {

    // Render
    const columns = []
    const onSaveClick = sinon.spy()
    const wrapper = shallow(<EditorSchemaConsumer.Inner {...{columns, onSaveClick}} />)

    // Assert
    const ev = {preventDefault: sinon.spy()}
    assert.deepEqual(wrapper.find('.button-save').simulate('click', ev))
    assert.isTrue(onSaveClick.called)

  })

  it.skip('should be able to add field', () => {

    // Render
    const columns = []
    const onAddFieldClick = sinon.spy()
    const wrapper = shallow(
      <EditorSchemaConsumer.Inner {...{columns, onAddFieldClick}} />)

    // Assert
    const ev = {preventDefault: sinon.spy()}
    assert.deepEqual(wrapper.find('.button-add').simulate('click', ev))
    assert.isTrue(onAddFieldClick.called)

  })

  it('should render if loading', () => {

    // Render
    const columns = []
    const loading = true
    const wrapper = shallow(<EditorSchemaConsumer.Inner {...{columns, loading}} />)

    // Assert
    assert.deepEqual(wrapper.find('.button-edit').text(), '1. Edit')
    assert.deepEqual(wrapper.find('.button-preview').length, 0)
    assert.deepEqual(wrapper.find('.button-save').length, 0)

  })

  it('should render if error', () => {

    // Render
    const columns = []
    const error = new Error('error')
    const wrapper = shallow(<EditorSchemaConsumer.Inner {...{columns, error}} />)

    // Assert
    assert.deepEqual(wrapper.find('.button-edit').text(), 'Error')
    assert.deepEqual(wrapper.find('.button-preview').length, 0)
    assert.deepEqual(wrapper.find('.button-save').text(), 'Close')

  })

  it('should render with disabled preview', () => {

    // Render
    const columns = []
    const disablePreview = true
    const wrapper = shallow(<EditorSchemaConsumer.Inner {...{columns, disablePreview}} />)

    // Assert
    assert.deepEqual(wrapper.find('.button-edit').text(), 'Edit')
    assert.deepEqual(wrapper.find('.button-preview').length, 0)
    assert.deepEqual(wrapper.find('.button-save').text(), 'Save')

  })

})
