const React = require('react')
const ReactDOM = require('react-dom')


// Module API

const render = (component, props, element) => {
  ReactDOM.render(React.createElement(component, props, null), element)
}


// System

module.exports = {
  render,
}
