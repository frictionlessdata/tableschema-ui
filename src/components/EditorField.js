const React = require('react')
const find = require('lodash/find')
const config = require('../config')
const {storeManager} = require('../stores/editorSchema')


// Components

const EditorField = storeManager.connect({

  mapState: ({columns}, {columnId}) => ({column: findColumn(columns, columnId)}),
  mapDispatch: [],

})(({column}) => {
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
            value={column.field.name}
          />
        </div>
      </div>

      {/* Type */}
      <div className="col-md-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Type</div>
          </div>
          <select className="form-control">
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
          <select className="form-control">
            <option>default</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="col-md-3">
        <div className="btn btn-warning">S</div>
        <div className="btn btn-danger">X</div>
      </div>

    </div>
  )
})


// Helpers


const findColumn = (columns, columnId) => {
  return find(columns, column => column.id === columnId)
}


const getFieldTypes = () => {
  return Object.keys(config.FIELD_TYPES_AND_FORMATS)
}


// System

module.exports = {

  // Public
  EditorField,

}
