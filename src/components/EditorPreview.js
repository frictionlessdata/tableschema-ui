const React = require('react')
const classNames = require('classnames')
const {storeManager} = require('../stores/editorSchema')
const helpers = require('../helpers')


// Components

const EditorPreview = storeManager.connect({

  mapState: ['columns', 'metadata'],
  mapDispatch: [],

})((props) => {

  // Prepare
  const schema = helpers.exportSchema(props.columns, props.metadata)
  const schemaAsText = JSON.stringify(schema, null, 2)

  // Render
  return (
    <pre className="preview">
      <code>
        {schemaAsText}
      </code>
    </pre>
  )
})


// System

module.exports = {

  // Public
  EditorPreview,

}
