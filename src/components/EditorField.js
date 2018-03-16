const React = require('react')
const config = require('../config')


// Component

const EditorField = ({field}) => {
  return (
    <div className="field form-row">

      {/* Name */}
      <div className="col-md-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Name</div>
          </div>
          <input
            type="text"
            className="form-control field-name"
            placeholder="name"
            value={field.name}
          />
        </div>
      </div>

      {/* Type */}
      <div className="col-md-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Type</div>
          </div>
          <select class="form-control">
            {getFieldTypes().map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Format */}
      <div className="col-md-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Format</div>
          </div>
          <select class="form-control">
            <option>default</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="col-md-3">
        <div class="btn btn-warning">S</div>
        <div class="btn btn-danger">X</div>
      </div>

    </div>
  )
}


// Internal

const getFieldTypes = () => {
  return Object.keys(config.FIELD_TYPES_AND_FORMATS)
}


// System

module.exports = {

  // Public
  EditorField,

}
