const React = require('react')
const classNames = require('classnames')
const {storeManager} = require('../stores/editorSchema')


// Components

const EditorFeedback = storeManager.connect({

  name: 'EditorFeedback',
  mapState: ['feedback'],
  mapDispatch: [],

})((props) => {

  // No feedback
  if (!props.feedback) {
    return null
  }

  // Render
  return (
    <div className="tableschema-ui-editor-feedback">
      <div className={classNames('alert', `alert-${props.feedback.type}`)}>
        {props.feedback.message}
      </div>
    </div>
  )
})


// System

module.exports = {

  // Public
  EditorFeedback,

}
