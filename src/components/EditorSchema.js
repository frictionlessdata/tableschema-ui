const React = require('react')


// Component

const EditorSchema = ({descriptor, onSave}) => {
  console.log(descriptor)
  const refs = {}
  return (
    <div className="container" style={{border: 'solid 1px #f00', padding: '1em'}}>
      <h3>Schema Editor</h3>
      <div className="form-group">
        <textarea className="form-control" ref={(ref) => {refs.text = ref}} />
      </div>
      <button className="btn btn-primary" onClick={(ev) => onSave(refs.text.value)}>
        Save
      </button>
    </div>
  )
}


// System

module.exports = {

  // Public
  EditorSchema,

}
