const React = require('react')
const {hot} = require('react-hot-loader')
const {Provider} = require('react-redux')
const {EditorField} = require('./EditorField')
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

      {/* Feedback */}
      <EditorFeedback />

      {/* Fields */}
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
  )
})


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? hot(module)(EditorSchema): EditorSchema,

}
