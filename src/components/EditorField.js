const React = require('react')
const find = require('lodash/find')
const {storeManager} = require('../stores/editorSchema')
const helpers = require('../helpers')


// Components

const EditorField = storeManager.connect({

  name: 'EditorField',
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
    <div className="tableschema-ui-editor-field">

      {/* General */}
      <div className="row">

        {/* Name */}
        <div className="col-lg-4 name">
          <div className="handle">&equiv;</div>
          <div className="input-group">
            <div className="input-group-addon">
              <div>Name</div>
            </div>
            <input
              type="text"
              className="form-control"
              defaultValue={props.column.field.name}
              onBlur={(ev) =>
                props.onFieldPropertyChange(props.column.id, 'name', ev.target.value)
              }
            />
          </div>
        </div>

        {/* Type */}
        <div className="col-lg-3 type">
          <div className="input-group">
            <div className="input-group-addon">
              <div>Type</div>
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
        <div className="col-lg-3 format">
          <div className="input-group">
            <div className="input-group-addon">
              <div>Format</div>
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
        <div className="col-lg-2 controls">

          {/* Details */}
          <button
            type="button"
            className="btn btn-light btn-lg button-details"
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
            className="btn btn-light btn-lg button-remove"
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
      <div className="collapse details" id={`field-details-${props.column.id}`}>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">

              {/* Extra fields */ }
              <div className="col-lg-4 extra">

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
                    rows="5"
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
              <div className="col-lg-8 data">
                {!!props.column.values.length &&
                  <div className="form-group">
                    <label>Data <small>(first 5 rows)</small></label>
                    <table className="table table-condensed">
                      <thead>
                        <tr><th>{props.column.field.name}</th></tr>
                      </thead>
                      <tbody>
                        {props.column.values.map((value, index) => (
                          <tr key={index}><td>{value}</td></tr>
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
