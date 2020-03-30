const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')
const { assert } = require('chai')
const { shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { EditorFeedback } = require('../../src/components/EditorFeedback')
Enzyme.configure({ adapter: new Adapter() })

// Tests

describe('EditorFeedback', () => {
  it('should render', () => {
    // Render
    const feedback = { type: 'warning', message: 'Warning Message' }
    const wrapper = shallow(<EditorFeedback.Inner feedback={feedback} />)

    // Assert
    assert.deepEqual(wrapper.find('.tableschema-ui-editor-feedback').length, 1)
    assert.deepEqual(wrapper.find('.alert-warning').text(), 'Warning Message')
  })

  it('should render nothing if no feedback', () => {
    // Render
    const feedback = null
    const wrapper = shallow(<EditorFeedback.Inner feedback={feedback} />)

    // Assert
    assert.isNull(wrapper.getElement())
  })

  it('should support reset capability', () => {
    // Render
    const onReset = sinon.spy()
    const feedback = { type: 'error', message: 'Error Message', reset: true }
    const wrapper = shallow(<EditorFeedback.Inner {...{ feedback, onReset }} />)

    // Assert
    assert.deepEqual(wrapper.find('.tableschema-ui-editor-feedback').length, 1)
    assert.include(wrapper.find('.alert-error').text(), 'Error Message')
    assert.include(wrapper.find('.alert-error').text(), 'To start from scratch')
    assert.include(wrapper.find('.reset').text(), 'click here')

    // Reset
    const ev = { preventDefault: sinon.spy() }
    wrapper.find('.reset').simulate('click', ev)
    assert.isTrue(ev.preventDefault.called)
    assert.isTrue(onReset.called)
  })
})
