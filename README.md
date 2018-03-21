# tableschema-ui

[![Travis](https://img.shields.io/travis/frictionlessdata/tableschema-ui/master.svg)](https://travis-ci.org/frictionlessdata/tableschema-ui)
[![Coveralls](https://coveralls.io/repos/github/frictionlessdata/tableschema-ui/badge.svg?branch=master)](https://coveralls.io/github/frictionlessdata/tableschema-ui?branch=master)

A web UI for creating, editing and validating Table Schemas.

## Documentation

The whole public API of this package is described here and follows semantic versioning rules. Everything outside of this readme are private API and could be changed without any notification on any new version.

### Render

To render one of the provided component `render` function should be used.

#### `render(component, props, element)`

- `component (Component)` - it could be one of provided by the library component
- `props (Object)` - object containing props
- `element (Element)` - DOM element to render into

### EditorSchema

This component represents a `goodtables` report object.

#### `<EditorSchema {source, schema, onSave}/>`

- `source (Array[])` - array of arrays containing data sample headers and rows
- `schema (Object)` - Table Schema descriptor
- `onSave ((schema) => {})` - callback will be executed on the save button click
