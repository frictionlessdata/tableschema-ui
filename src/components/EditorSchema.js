const React = require('react')
const {hot} = require('react-hot-loader')
const {Provider} = require('react-redux')
const {EditorField} = require('./EditorField')
const {EditorPreview} = require('./EditorPreview')
const {EditorFeedback} = require('./EditorFeedback')
const {storeManager} = require('../stores/editorSchema')


// Components

const EditorSchema = ({source, schema, onChange}) => {

  // Create store
  const store = storeManager.createStore()
  store.dispatch(storeManager.handlers.onRender({source, schema, onChange}))

  // Render
  return (
    <Provider store={store}>
      <EditorSchemaConsumer />
    </Provider>
  )
}


const EditorSchemaConsumer = storeManager.connect({

  mapState: ['columns'],
  mapDispatch: ['onSaveClick', 'onAddFieldClick'],

})((props) => {
  return (
    <div className="tableschema-ui-editor">

      {/* Tab navigation */}
      <ul className="nav nav-pills" role="tablist">
        <li>
          <h2 class="mr-3">Schema Editor</h2>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="tab"
            href="#schema-editor-fields"
            role="tab"
            aria-controls="schema-editor-fields"
            aria-selected="true"
          >
            Fields
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tab"
            href="#schema-editor-preview"
            role="tab"
            aria-controls="schema-editor-preview"
            aria-selected="false"
          >
            Preview
          </a>
        </li>
      </ul>

      <hr />
      <EditorFeedback />

      {/* Tab contentes */}
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

    </div>
  )
})


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? hot(module)(EditorSchema): EditorSchema,

}
