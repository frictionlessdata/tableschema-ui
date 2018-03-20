const React = require('react')
const {hot} = require('react-hot-loader')
const {Provider} = require('react-redux')
const {EditorField} = require('./EditorField')
const {connect, createStore} = require('../store')
const {initial, handlers, mutations} = require('../stores/editorSchema')


// Components

const PureEditorSchema = ({schema, onSave}) => {
  const refs = {}
  return (
    <div className="tableschema-ui-editor">

      {/* Fields */}
      <div className="form-group fields">
      {schema.fields.map(field => (
        <EditorField key={field.name} field={field} />
      ))}
      </div>

      {/* Button */}
      <div className="form-group controls">
        <a href="#" className="btn btn-primary" onClick={(ev) => onSave(refs.text.value)}>
          Save
        </a>
      </div>

    </div>
  )
}


// Containers

const EditorSchema = (props) => {
  const store = createStore(initial, handlers, mutations, props)
  const Consumer = connect(PureEditorSchema, ['schema'])
  store.dispatch(handlers.onRender(props))
  return (
    <Provider store={store}>
      <Consumer />
    </Provider>
  )
}


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? hot(module)(EditorSchema): EditorSchema,

}
