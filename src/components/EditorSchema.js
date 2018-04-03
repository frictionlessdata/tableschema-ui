const React = require('react')
const {hot} = require('react-hot-loader')
const {Provider} = require('react-redux')
const {SortableContainer, SortableElement} = require('react-sortable-hoc')
const {EditorField} = require('./EditorField')
const {EditorPreview} = require('./EditorPreview')
const {EditorFeedback} = require('./EditorFeedback')
const {storeManager} = require('../stores/editorSchema')


// Components

const EditorSchema = ({source, schema, onSave}) => {

  // Create store
  const store = storeManager.createStore()
  store.dispatch(storeManager.handlers.onRender({source, schema, onSave}))

  // Render
  return (
    <Provider store={store}>
      <EditorSchemaConsumer />
    </Provider>
  )
}


const EditorSchemaConsumer = storeManager.connect({

  name: 'EditorSchemaConsumer',
  mapState: ['columns', 'loading', 'error'],
  mapDispatch: ['onSaveClick', 'onMoveFieldEnd', 'onAddFieldClick'],

})((props) => {
  return (
    <div className="tableschema-ui-editor-schema">

      {/* Tab navigation */}
      <ul className="nav nav-pills navigation" role="tablist">

        {/* Title */}
        <li>
          <h2 className="title">Schema Editor</h2>
        </li>

        {/* Edit/Error */}
        <li className="nav-item active">
          <a
            className="nav-link"
            data-toggle="tab"
            href="#schema-editor-fields"
            role="tab"
            aria-controls="schema-editor-fields"
            aria-selected="true"
          >
            {!props.error
              ? <span><small>1.</small> Edit</span>
              : <span>Error</span>}
          </a>
        </li>

        {/* Preview */}
        {!props.loading && !props.error &&
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#schema-editor-preview"
              role="tab"
              aria-controls="schema-editor-preview"
              aria-selected="false"
            >
              <small>2.</small> Preview
            </a>
          </li>
        }

        {/* Save/Close */}
        {!props.loading &&
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              role="tab"
              aria-selected="false"
              onClick={(ev) => {
                ev.preventDefault()
                props.onSaveClick()
              }}
            >
              {!props.error
                ? <span><small>3.</small> Save</span>
                : <span>Close</span>}
            </a>
          </li>
        }

      </ul>

      <hr />

      {/* Feedback */}
      <EditorFeedback />

      {/* Tab contents */}
      {!props.loading && !props.error &&
        <div className="tab-content content">

          {/* Edit */}
          <div
            className="tab-pane active"
            id="schema-editor-fields"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group fields">

              {/* List fields */}
              <SortableFields
                columns={props.columns}
                helperClass="tableschema-ui-editor-sortable-body"
                onSortEnd={props.onMoveFieldEnd}
                lockAxis="y"
              />

              {/* Add field */}
              <div>
                <button
                  type="button"
                  className="btn btn-light btn-lg btn-block"
                  onClick={(ev) => {
                    ev.preventDefault()
                    props.onAddFieldClick()
                  }}
                >
                  Add Field
                </button>
              </div>

            </div>
          </div>

          {/* Preview */}
          <div
            className="tab-pane"
            id="schema-editor-preview"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <EditorPreview />
          </div>

        </div>
      }

    </div>
  )
})


const SortableFields = SortableContainer(({columns}) => (
  <ul className="tableschema-ui-editor-sortable-list">
    {columns.map((column, index) => (
      <SortableField key={column.id} index={index} column={column} />
    ))}
  </ul>
))


const SortableField = SortableElement(({column}) => (
  <li className="tableschema-ui-editor-sortable-item">
    <EditorField key={column.id} columnId={column.id} />
  </li>
))


// System

module.exports = {

  // Public
  EditorSchema: module.hot ? hot(module)(EditorSchema): EditorSchema,

}
