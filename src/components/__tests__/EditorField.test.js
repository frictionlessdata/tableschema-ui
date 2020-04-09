const React = require('react')
const Enzyme = require('enzyme')
const { shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { EditorField, EditorFieldFormat } = require('../EditorField')
Enzyme.configure({ adapter: new Adapter() })

// Tests

it('should render', () => {
  // Render
  const column = {
    field: {
      name: 'location',
      type: 'geopoint',
      format: 'array',
      title: 'title',
      description: 'description',
    },
  }
  const wrapper = shallow(<EditorField.Inner column={column} />)
  const formatWrapper = wrapper.find(EditorFieldFormat).dive()

  // Assert
  expect(wrapper.find('.tableschema-ui-editor-field').length).toEqual(1)
  expect(wrapper.find('.name input').props().defaultValue).toEqual('location')
  expect(wrapper.find('.type select').props().value).toEqual('geopoint')
  expect(formatWrapper.find('select').props().value).toEqual('array')
  expect(wrapper.find('.extra input').props().defaultValue).toEqual('title')
  expect(wrapper.find('.extra textarea').props().defaultValue).toEqual('description')
  expect(wrapper.find('.data').text()).toEqual('')
})

it('should allow free text format for date/time', () => {
  // Render
  const column = { field: { name: 'date', type: 'date', format: 'default' } }
  const wrapper = shallow(<EditorField.Inner column={column} />)
  const formatWrapper = wrapper.find(EditorFieldFormat).dive()

  // Assert
  expect(formatWrapper.find('input').props().defaultValue).toEqual('default')
})

it('should render sample values if provided', () => {
  // Render
  const column = { field: { name: 'name' }, values: ['1', '2', '3'] }
  const wrapper = shallow(<EditorField.Inner column={column} />)

  // Assert
  expect(wrapper.find('.data').text()).toEqual('Data (first 5 values)name123')
})

it.skip('should allow to change field properties', () => {
  // Render
  const onFieldPropertyChange = jest.fn()
  const column = { field: { name: 'name' }, id: 'columnId' }
  const wrapper = shallow(<EditorField.Inner {...{ column, onFieldPropertyChange }} />)
  const formatWrapper = wrapper.find(EditorFieldFormat).dive()

  // Assert name change
  const nameEv = { target: { value: 'newName' } }
  wrapper.find('.name input').simulate('blur', nameEv)
  expect(onFieldPropertyChange.calledWith('columnId', 'name', 'newName')).toBeTruthy()

  // Assert type change
  const typeEv = { target: { value: 'newType' } }
  wrapper.find('.type select').simulate('change', typeEv)
  expect(onFieldPropertyChange.calledWith('columnId', 'format', 'default')).toBeTruthy()
  expect(onFieldPropertyChange.calledWith('columnId', 'type', 'newType')).toBeTruthy()

  // Assert format change
  const formatEv = { target: { value: 'newFormat' } }
  formatWrapper.find('select').simulate('change', formatEv)
  expect(onFieldPropertyChange.calledWith('columnId', 'format', 'newFormat')).toBeTruthy()

  // Assert title change
  const titleEv = { target: { value: 'newTitle' } }
  wrapper.find('.extra input').simulate('blur', titleEv)
  expect(onFieldPropertyChange.calledWith('columnId', 'title', 'newTitle')).toBeTruthy()

  // Assert description change
  const descriptionEv = { target: { value: 'newDesc' } }
  wrapper.find('.extra textarea').simulate('blur', descriptionEv)
  expect(onFieldPropertyChange.calledWith('columnId', 'description', 'newDesc')).toBeTruthy()
})

it.skip('should allow to remove field', () => {
  // Render
  const onRemoveFieldClick = jest.fn()
  const column = { field: { name: 'name' }, id: 'columnId' }
  const wrapper = shallow(<EditorField.Inner {...{ column, onRemoveFieldClick }} />)

  // Assert name change
  const ev = { preventDefault: jest.fn() }
  wrapper.find('.button-remove').simulate('click', ev)
  expect(onRemoveFieldClick.calledWith('columnId')).toBeTruthy()
})
