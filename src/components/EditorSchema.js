const React = require('react')


// Component

const EditorSchema = ({descriptor, onSave}) => {
  const refs = {}
  return (
    <div className="container" style={{border: 'solid 1px #f00', padding: '1em'}}>
      <h3>Schema Editor</h3>

      {/* Text */}
      <div className="form-group">
        <textarea
          className="form-control"
          ref={(ref) => {refs.text = ref}}
          defaultValue={descriptor}
        />
      </div>

      {/* Button */}
      <div className="form-group">
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
  EditorSchema,

}
