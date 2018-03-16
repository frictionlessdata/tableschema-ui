const React = require('react')
const {hot} = require('react-hot-loader')
const {EditorField} = require('./EditorField')


// Component

const EditorSchema = ({descriptor, onSave}) => {
  const refs = {}
  return (
    <div class="tableschema-ui-editor">

      {/* Fields */}
      <div className="form-group fields">
      {descriptor.fields.map(field => (
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


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? hot(module)(EditorSchema) : EditorSchema,

}
