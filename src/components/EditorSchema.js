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
  mapDispatch: ['onSaveClick'],

})(({columns, onSaveClick}) => {
  return (
    <div className="tableschema-ui-editor">

      {/* Fields */}
      <div className="form-group fields">
      {columns.map(column => (
        <EditorField key={column.id} columnId={column.id} />
      ))}
      </div>

      {/* Button */}
      <div className="form-group controls">
        <div className="btn btn-primary" onClick={onSaveClick}>
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
