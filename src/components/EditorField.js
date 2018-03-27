const React = require('react')
const find = require('lodash/find')
const {storeManager} = require('../stores/editorSchema')
const helpers = require('../helpers')


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

  // Prepare
  const types = helpers.getFieldTypes()
  const formats = helpers.getFieldFormats(props.column.field.type)

  // Render
  return (
    <div className="field">

      {/* General */}
      <div className="form-row">

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
              value={props.column.field.type}
              onChange={(ev) => {
                props.onFieldPropertyChange(props.column.id, 'format', 'default')
                props.onFieldPropertyChange(props.column.id, 'type', ev.target.value)
              }}
            >
              {types.map(type => (
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
            <EditorFieldFormat
              formats={formats}
              format={props.column.field.format}
              onChange={(ev) => {
                props.onFieldPropertyChange(props.column.id, 'format', ev.target.value)
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="col-md-2">

          {/* Details */}
          <button
            type="button"
            className="btn btn-light btn-lg"
            data-toggle="collapse"
            data-target={`#field-details-${props.column.id}`}
            aria-expanded="false"
            aria-controls={`field-details-${props.column.id}`}
          >
            Details
          </button>

          {/* Remove */}
          <button
            type="button"
            className="btn btn-light btn-lg"
            onClick={(ev) => {
              ev.preventDefault()
              props.onRemoveFieldClick(props.column.id)
            }}
          >
            Remove
          </button>

        </div>

      </div>

      {/* Details */}
      <div className="collapse field-details" id={`field-details-${props.column.id}`}>
        <div className="card card-body">
          <div className="row">

            {/* Extra fields */ }
            <div className="col-md-4">

              {/* Title */}
              <div className="form-group">
                <label htmlFor={`field-title-${props.column.id}`}>
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`field-title-${props.column.id}`}
                  defaultValue={props.column.field.title}
                  onBlur={(ev) =>
                    props.onFieldPropertyChange(props.column.id, 'title', ev.target.value)
                  }
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor={`field-description-${props.column.id}`}>
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id={`field-description-${props.column.id}`}
                  defaultValue={props.column.field.description}
                  onBlur={(ev) => {
                    const value = ev.target.value
                    props.onFieldPropertyChange(props.column.id, 'description', value)
                  }}
                />
              </div>

            </div>

            {/* Sample data */}
            <div className="col-md-8">
              {!!props.column.values.length &&
                <div className="form-group">
                  <label>
                    Data
                  </label>
                  <table className="table table-sm">
                    <thead>
                      <tr><th>{props.column.field.name}</th></tr>
                    </thead>
                    <tbody>
                      {props.column.values.map(value => (
                        <tr><td>{value}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>

          </div>
        </div>
      </div>

    </div>
  )
})


const EditorFieldFormat = ({formats, format, onChange}) => {

  // Basic
  if (!formats.includes('custom')) {
    return (
      <select
        className="form-control"
        value={format}
        onChange={onChange}
      >
        {formats.map(format => (
          <option key={format}>{format}</option>
        ))}
      </select>
    )

  // Custom
  } else {
    return (
      <input
        type="text"
        className="form-control"
        defaultValue={format}
        onBlur={onChange}
      />
    )
  }

}


// System

module.exports = {

  // Public
  EditorField,

}
