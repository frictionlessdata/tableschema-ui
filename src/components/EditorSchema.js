const React = require('react')
const {hot} = require('react-hot-loader')
const {connect} = require('react-redux')
const {Provider} = require('react-redux')
const {EditorField} = require('./EditorField')
const {mutations} = require('../stores/editorSchema')
const {createStore} = require('../store')


// Components

const PureEditorSchema = ({schema, onSave}) => {
  const refs = {}
  return (
    <div class="tableschema-ui-editor">

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


// State

const mapStateToProps = (state) => ({

  schema:
    state.schema,

})


// Actions

const mapDispatchToProps = (dispatch) => ({
})


// Containers

let EditorSchema = connect(mapStateToProps, mapDispatchToProps)(PureEditorSchema)
EditorSchema.Provider = (props) => {
  const store = createStore(mutations, props)
  return (
    <Provider store={store}>
      <EditorSchema />
    </Provider>
  )
}


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? EditorSchema = hot(module)(EditorSchema): EditorSchema,

}
