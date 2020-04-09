const React = require('react')
const Enzyme = require('enzyme')
const { shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { EditorFeedback } = require('../EditorFeedback')
Enzyme.configure({ adapter: new Adapter() })

// Tests

it('should render', () => {
  // Render
  const feedback = { type: 'warning', message: 'Warning Message' }
  const wrapper = shallow(<EditorFeedback.Inner feedback={feedback} />)

  // Assert
  expect(wrapper.find('.tableschema-ui-editor-feedback').length).toEqual(1)
  expect(wrapper.find('.alert-warning').text()).toEqual('Warning Message')
})

it('should render nothing if no feedback', () => {
  // Render
  const feedback = null
  const wrapper = shallow(<EditorFeedback.Inner feedback={feedback} />)

  // Assert
  expect(wrapper.getElement()).toBe(null)
})

it('should support reset capability', () => {
  // Render
  const onReset = jest.fn()
  const feedback = { type: 'error', message: 'Error Message', reset: true }
  const wrapper = shallow(<EditorFeedback.Inner {...{ feedback, onReset }} />)

  // Assert
  expect(wrapper.find('.tableschema-ui-editor-feedback').length).toEqual(1)
  expect(wrapper.find('.alert-error').text()).toContain('Error Message')
  expect(wrapper.find('.alert-error').text()).toContain('To start from scratch')
  expect(wrapper.find('.reset').text()).toContain('click here')

  // Reset
  const ev = { preventDefault: jest.fn() }
  wrapper.find('.reset').simulate('click', ev)
  expect(ev.preventDefault).toHaveBeenCalled()
  expect(onReset).toHaveBeenCalled()
})
