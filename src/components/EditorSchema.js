const React = require('react')
const {hot} = require('react-hot-loader')
const {Provider} = require('react-redux')
const {EditorField} = require('./EditorField')
const {EditorPreview} = require('./EditorPreview')
const {EditorFeedback} = require('./EditorFeedback')
const {storeManager} = require('../stores/editorSchema')


// Components

const EditorSchema = ({source, schema, onSave}) => {

  // Create store
  const store = storeManager.createStore()
  store.dispatch(storeManager.handlers.onRender({source, schema, onSave}))

  // Render
  return (
    <Provider store={store}>
      <EditorSchemaConsumer />
    </Provider>
  )
}


const EditorSchemaConsumer = storeManager.connect({

  mapState: ['columns', 'error'],
  mapDispatch: ['onSaveClick', 'onAddFieldClick'],

})((props) => {
  return (
    <div className="tableschema-ui-editor">

      {/* Tab navigation */}
      <ul className="nav nav-pills" role="tablist">

        {/* Title */}
        <li>
          <h2 className="mr-4">Schema Editor</h2>
        </li>

        {/* Edit */}
        {!props.error &&
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#schema-editor-fields"
              role="tab"
              aria-controls="schema-editor-fields"
              aria-selected="true"
            >
              <small>1.</small> Edit
            </a>
          </li>
        }

        {/* Preview */}
        {!props.error &&
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#schema-editor-preview"
              role="tab"
              aria-controls="schema-editor-preview"
              aria-selected="false"
            >
              <small>2.</small> Preview
            </a>
          </li>
        }

        {/* Save/Close */}
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            role="tab"
            aria-selected="false"
            onClick={(ev) => {
              ev.preventDefault()
              props.onSaveClick()
            }}
          >
            {!props.error
              ? <span><small>3.</small> Save</span>
              : <span>Close</span>}
          </a>
        </li>

      </ul>

      <hr />

      {/* Feedback */}
      <EditorFeedback />

      {/* Tab contents */}
      {!props.error &&
        <div className="tab-content">

          {/* Fields */}
          <div
            className="tab-pane fade show active"
            id="schema-editor-fields"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group fields">

              {/* List fields */}
              {props.columns.map(column => (
                <EditorField key={column.id} columnId={column.id} />
              ))}

              {/* Add field */}
              <div className="field">
                <button
                  type="button"
                  className="btn btn-light btn-lg btn-block field-add"
                  onClick={(ev) => {
                    ev.preventDefault()
                    props.onAddFieldClick()
                  }}
                >
                  Add Field
                </button>
              </div>

            </div>
          </div>

          {/* Preview */}
          <div
            className="tab-pane fade"
            id="schema-editor-preview"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <EditorPreview />
          </div>

        </div>
      }

    </div>
  )
})


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? hot(module)(EditorSchema): EditorSchema,

}
