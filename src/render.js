const React = require('react')
const ReactDOM = require('react-dom')
const {Provider} = require('react-redux')


// Module API

const render = (component, props, element) => {
  ReactDOM.render(React.createElement(component, props, null), element)
}


// System

module.exports = {
  render,
}
