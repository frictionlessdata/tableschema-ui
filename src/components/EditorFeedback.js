const React = require('react')
const classNames = require('classnames')
const { storeManager } = require('../stores/editorSchema')

// Components

const EditorFeedback = storeManager.connect({
  name: 'EditorFeedback',
  mapState: ['feedback'],
  mapDispatch: ['onReset'],
})((props) => {
  // No feedback
  if (!props.feedback) {
    return null
  }

  // Render
  return (
    <div className="tableschema-ui-editor-feedback">
      <div className={classNames('alert', `alert-${props.feedback.type}`)}>
        <span>{props.feedback.message}</span>
        {!!props.feedback.reset && (
          <span>
            &nbsp;To start from scratch please&nbsp;
            <a
              href="#"
              className="reset"
              onClick={(ev) => {
                ev.preventDefault()
                props.onReset()
              }}
            >
              click here
            </a>
            .
          </span>
        )}
      </div>
    </div>
  )
})

// System

module.exports = {
  // Public
  EditorFeedback,
}
