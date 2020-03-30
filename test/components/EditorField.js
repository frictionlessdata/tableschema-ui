const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')
const { assert } = require('chai')
const { shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { EditorField, EditorFieldFormat } = require('../../src/components/EditorField')
Enzyme.configure({ adapter: new Adapter() })

// Tests

describe('EditorField', () => {
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
    assert.deepEqual(wrapper.find('.tableschema-ui-editor-field').length, 1)
    assert.deepEqual(wrapper.find('.name input').props().defaultValue, 'location')
    assert.deepEqual(wrapper.find('.type select').props().value, 'geopoint')
    assert.deepEqual(formatWrapper.find('select').props().value, 'array')
    assert.deepEqual(wrapper.find('.extra input').props().defaultValue, 'title')
    assert.deepEqual(wrapper.find('.extra textarea').props().defaultValue, 'description')
    assert.deepEqual(wrapper.find('.data').text(), '')
  })

  it('should allow free text format for date/time', () => {
    // Render
    const column = { field: { name: 'date', type: 'date', format: 'default' } }
    const wrapper = shallow(<EditorField.Inner column={column} />)
    const formatWrapper = wrapper.find(EditorFieldFormat).dive()

    // Assert
    assert.deepEqual(formatWrapper.find('input').props().defaultValue, 'default')
  })

  it('should render sample values if provided', () => {
    // Render
    const column = { field: { name: 'name' }, values: ['1', '2', '3'] }
    const wrapper = shallow(<EditorField.Inner column={column} />)

    // Assert
    assert.deepEqual(wrapper.find('.data').text(), 'Data (first 5 values)name123')
  })

  it.skip('should allow to change field properties', () => {
    // Render
    const onFieldPropertyChange = sinon.spy()
    const column = { field: { name: 'name' }, id: 'columnId' }
    const wrapper = shallow(<EditorField.Inner {...{ column, onFieldPropertyChange }} />)
    const formatWrapper = wrapper.find(EditorFieldFormat).dive()

    // Assert name change
    const nameEv = { target: { value: 'newName' } }
    assert.deepEqual(wrapper.find('.name input').simulate('blur', nameEv))
    assert.isTrue(onFieldPropertyChange.calledWith('columnId', 'name', 'newName'))

    // Assert type change
    const typeEv = { target: { value: 'newType' } }
    assert.deepEqual(wrapper.find('.type select').simulate('change', typeEv))
    assert.isTrue(onFieldPropertyChange.calledWith('columnId', 'format', 'default'))
    assert.isTrue(onFieldPropertyChange.calledWith('columnId', 'type', 'newType'))

    // Assert format change
    const formatEv = { target: { value: 'newFormat' } }
    assert.deepEqual(formatWrapper.find('select').simulate('change', formatEv))
    assert.isTrue(onFieldPropertyChange.calledWith('columnId', 'format', 'newFormat'))

    // Assert title change
    const titleEv = { target: { value: 'newTitle' } }
    assert.deepEqual(wrapper.find('.extra input').simulate('blur', titleEv))
    assert.isTrue(onFieldPropertyChange.calledWith('columnId', 'title', 'newTitle'))

    // Assert description change
    const descriptionEv = { target: { value: 'newDesc' } }
    assert.deepEqual(wrapper.find('.extra textarea').simulate('blur', descriptionEv))
    assert.isTrue(onFieldPropertyChange.calledWith('columnId', 'description', 'newDesc'))
  })

  it.skip('should allow to remove field', () => {
    // Render
    const onRemoveFieldClick = sinon.spy()
    const column = { field: { name: 'name' }, id: 'columnId' }
    const wrapper = shallow(<EditorField.Inner {...{ column, onRemoveFieldClick }} />)

    // Assert name change
    const ev = { preventDefault: sinon.spy() }
    assert.deepEqual(wrapper.find('.button-remove').simulate('click', ev))
    assert.isTrue(onRemoveFieldClick.calledWith('columnId'))
  })
})
