const React = require('react')
const find = require('lodash/find')
const partial = require('lodash/partial')
const {storeManager} = require('../stores/editorSchema')
const config = require('../config')


// Components

const EditorField = storeManager.connect({

  mapState: ({columns}, {columnId}) => ({
    column: find(columns, column => column.id === columnId),
  }),
  mapDispatch: [
    'onRemoveFieldClick',
    'onFieldPropertyChange',
  ],

})((props) => {
  return (
    <div className="field form-row">

      {/* Name */}
      <div className="col-md-4">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Name</div>
          </div>
          <input
            type="text"
            className="form-control field-name"
            defaultValue={props.column.field.name}
            onBlur={(ev) =>
              props.onFieldPropertyChange(props.column.id, 'name', ev.target.value)
            }
          />
        </div>
      </div>

      {/* Type */}
      <div className="col-md-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Type</div>
          </div>
          <select
            className="form-control"
            onChange={(ev) =>
              props.onFieldPropertyChange(props.column.id, 'type', ev.target.value)
            }
          >
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
          <select
            className="form-control"
            onChange={(ev) =>
              props.onFieldPropertyChange(props.column.id, 'format', ev.target.value)
            }
          >
            <option>default</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="col-md-2">
        <div className="btn btn-light btn-lg">Details</div>
        <div
          className="btn btn-light btn-lg"
          onClick={partial(props.onRemoveFieldClick, props.column.id)}
        >
          Remove
        </div>
      </div>

    </div>
  )
})


// Helpers


const getFieldTypes = () => {
  return Object.keys(config.FIELD_TYPES_AND_FORMATS)
}


// System

module.exports = {

  // Public
  EditorField,

}
