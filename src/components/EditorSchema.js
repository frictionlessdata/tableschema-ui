const React = require('react')
const {hot} = require('react-hot-loader')
const {Provider} = require('react-redux')
const {EditorField} = require('./EditorField')
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

  mapState: ['columns'],
  mapDispatch: ['onSaveClick', 'onAddFieldClick'],

})((props) => {
  return (
    <div className="tableschema-ui-editor">

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
            onClick={props.onAddFieldClick}
          >
            Add Field
          </button>
        </div>

      </div>

      {/* Controls */}
      <div className="form-group controls">
        <div className="btn btn-primary" onClick={props.onSaveClick}>
          Save
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
