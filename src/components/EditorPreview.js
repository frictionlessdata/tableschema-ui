const React = require('react')
const { storeManager } = require('../stores/editorSchema')
const helpers = require('../helpers')

// Components

const EditorPreview = storeManager.connect({
  name: 'EditorPreview',
  mapState: ['columns', 'metadata'],
  mapDispatch: [],
})((props) => {
  // Prepare
  const schema = helpers.exportSchema(props.columns, props.metadata)
  const schemaAsText = JSON.stringify(schema, null, 2)

  // Render
  return (
    <div className="tableschema-ui-editor-preview">
      <pre>
        <code>{schemaAsText}</code>
      </pre>
    </div>
  )
})

// System

module.exports = {
  // Public
  EditorPreview,
}
