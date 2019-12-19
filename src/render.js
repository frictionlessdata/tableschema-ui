const React = require('react')
const ReactDOM = require('react-dom')


// Module API

/**
 * Render tableschema editor
 *
 * @param {URL/File/Array[]} source - data source
 * @param {URL/File/String/Object} schema - data schema
 * @param {Function} onSave - callback executed on the save button click
 * @param {boolean} disablePreview - if `true` the preview tab will not be shown
 */
const render = (component, props, element) => {
  ReactDOM.render(React.createElement(component, props, null), element)
  return {dispose: () => ReactDOM.unmountComponentAtNode(element)}
}


// System

module.exports = {
  render,
}
