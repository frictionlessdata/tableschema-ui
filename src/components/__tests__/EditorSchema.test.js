const React = require('react')
const Enzyme = require('enzyme')
const { shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { EditorPreview } = require('../EditorPreview')
const { EditorFeedback } = require('../EditorFeedback')
const { SortableFields } = require('../EditorSchema')
const { EditorSchemaConsumer } = require('../EditorSchema')
Enzyme.configure({ adapter: new Adapter() })

// Tests

it('should render', () => {
  // Render
  const columns = [
    { column: 'column1', field: { name: 'field1' } },
    { column: 'column2', field: { name: 'field2' } },
  ]
  const onMoveFieldEnd = jest.fn()
  const wrapper = shallow(<EditorSchemaConsumer.Inner {...{ columns, onMoveFieldEnd }} />)

  // Assert
  expect(wrapper.find('.tableschema-ui-editor-schema').length).toEqual(1)
  expect(wrapper.find('.button-edit').text()).toEqual('1. Edit')
  expect(wrapper.find('.button-preview').text()).toEqual('2. Preview')
  expect(wrapper.find('.button-save').text()).toEqual('3. Save')
  expect(wrapper.find(SortableFields).props().onSortEnd).toEqual(onMoveFieldEnd)
  expect(wrapper.find(SortableFields).props().columns).toEqual(columns)
  expect(wrapper.find(EditorFeedback).length).toEqual(1)
  expect(wrapper.find(EditorPreview).length).toEqual(1)
})

it.skip('should be able to save schema', () => {
  // Render
  const columns = []
  const onSaveClick = jest.fn()
  const wrapper = shallow(<EditorSchemaConsumer.Inner {...{ columns, onSaveClick }} />)

  // Assert
  const ev = { preventDefault: jest.fn() }
  wrapper.find('.button-save').simulate('click', ev)
  expect(onSaveClick).toHaveBeenCalled()
})

it.skip('should be able to add field', () => {
  // Render
  const columns = []
  const onAddFieldClick = jest.fn()
  const wrapper = shallow(<EditorSchemaConsumer.Inner {...{ columns, onAddFieldClick }} />)

  // Assert
  const ev = { preventDefault: jest.fn() }
  wrapper.find('.button-add').simulate('click', ev)
  expect(onAddFieldClick).toHaveBeenCalled()
})

it('should render if loading', () => {
  // Render
  const columns = []
  const loading = true
  const wrapper = shallow(<EditorSchemaConsumer.Inner {...{ columns, loading }} />)

  // Assert
  expect(wrapper.find('.button-edit').text()).toEqual('1. Edit')
  expect(wrapper.find('.button-preview').length).toEqual(0)
  expect(wrapper.find('.button-save').length).toEqual(0)
})

it('should render if error', () => {
  // Render
  const columns = []
  const error = new Error('error')
  const wrapper = shallow(<EditorSchemaConsumer.Inner {...{ columns, error }} />)

  // Assert
  expect(wrapper.find('.button-edit').text()).toEqual('Error')
  expect(wrapper.find('.button-preview').length).toEqual(0)
  expect(wrapper.find('.button-save').text()).toEqual('Close')
})

it('should render with disabled preview', () => {
  // Render
  const columns = []
  const disablePreview = true
  const wrapper = shallow(<EditorSchemaConsumer.Inner {...{ columns, disablePreview }} />)

  // Assert
  expect(wrapper.find('.button-edit').text()).toEqual('Edit')
  expect(wrapper.find('.button-preview').length).toEqual(0)
  expect(wrapper.find('.button-save').text()).toEqual('Save')
})
