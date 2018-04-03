# tableschema-ui

[![Travis](https://img.shields.io/travis/frictionlessdata/tableschema-ui/master.svg)](https://travis-ci.org/frictionlessdata/tableschema-ui)
[![Coveralls](https://coveralls.io/repos/github/frictionlessdata/tableschema-ui/badge.svg?branch=master)](https://coveralls.io/github/frictionlessdata/tableschema-ui?branch=master)

A web UI for creating, editing and validating Table Schemas.

## Features

- `render` - framework-agnostic component render
- List of components:
  - `EditorSchema` - table schema editor widget

## Getting Started

You could use this components in plain JavaScript code or mixing with any modern framework (with native support for React). To render `EditorSchema` you have use `tableschemaUI.render(tableschemaUI.<Component>, props, element)` function.

First add bootstrap styles and scripts:

```html
<!-- Styles -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Scripts -->
<script src="//code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```

### Installation

#### NPM

> Install the package in your terminal `$ npm install --save tableschema-ui`

The package could be used as `tableschema-ui` package from NPM:

```javascript
const tableschemaUI = require('tableschema-ui')

const props = '<YOUR-PROPS>'
const element = document.getElementById('component')
tableschemaUI.render(tableschemaUI.Component, {...props}, element)
```

#### CDN

The package could be used as pluggable script from CDN:

```html
<div id="component"></div>
<script src="//unpkg.com/tableschema-ui/dist/tableschema-ui.min.js"></script>
<script>
  var props = '<YOUR-PROPS>'
  var element = document.getElementById('component')
  tableschemaUI.render(tableschemaUI.Component, {...props}, element)
</script>
```

### Examples

#### React

You could use presented components as native React component (import from `tableschema-ui/lib` to get native React support):

```javascript
const React = require('react')
const ReactDOM = require('react-dom')
const tableschemaUI = require('tableschema-ui/lib')

const props = '<YOUR-PROPS>'
const element = document.getElementById('component')
ReactDOM.render(<tableschemaUI.Component ...props />, element)
```

#### Angular

The package's components could be used as `angular` component:

```javascript
const {Component, Input} = require('@angular/core')
const tableschemaUI = require('tableschema-ui')

@Component({
  selector: 'component',
  template: '<div id="component"></div>'
})
class Report {
  @Input() <YOUR_PROPS>: any;
  ngAfterViewInit() {
    const element = document.getElementById('component')
    tableschemaUI.render(tableschemaUI.Component, {...this.props}, element)
  }
}
```

#### Vue

The package's components could be used as `vue` component:

```javascript
const tableschemaUI = require('tableschema-ui')

const Report = {
  props: [<YOUR_PROPS>],
  template: '<div id="component"></div>',
  mounted() {
    const element = document.getElementById('component')
    tableschemaUI.render(tableschemaUI.Report, {...this.props}, element)
  },
}
```


## Documentation

The whole public API of this package is described here and follows semantic versioning rules. Everything outside of this readme are private API and could be changed without any notification on any new version.

### Render

To render one of the provided component `render` function should be used. Let's see on the basic usage example:

```javascript
// Render
const props = {key: value}
const element = document.getElementById('component')
const component = tableschemaUI.render(tableschemaUI.Component, {...props}, element)

// Dispose
component.dispose()
```

#### `render(component, props, element)`

- `component (Component)` - it could be one of provided by the library component
- `props (Object)` - object containing props
- `element (Element)` - DOM element to render into
- **returns** `controls (Object)` - controls object containing:
  - `dispose (() => {})` - function to remove the component from the DOM

### EditorSchema

This component provides a simple Table Schema editor. Let's see on the basic usage example:

```javascript
// Render
const props = {
    source: 'http://example.com/data.csv',
    schema: '{"fields": []}',
    onSave: (schema, error) => {
        handleError(error)
        handleSchema(schema)
        component.dispose()
    },
}
const element = document.getElementById('schema-editor')
const component = tableschemaUI.render(tableschemaUI.EditorSchema, {...props}, element)
```

If data source is provided and data schema is not provided than it will be inferred from the data. The component support various options to provide the source/schema including URL and File object.

#### `<EditorSchema {source, schema, onSave}/>`

- `source (URL/File/Array[])` - data source
- `schema (URL/File/String/Object)` - data schema
- `onSave ((schema, error) => {})` - callback will be executed on the save button click

## Contributing

The project follows the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards). There are common commands to work with the project:

```bash
$ npm run dev
$ npm run build
$ npm run test
```

## Changelog

Here described only breaking and the most important changes. The full changelog and documentation for all released versions could be found in nicely formatted [commit history](https://github.com/frictionlessdata/datapackage-ui/commits/master).

### v0.1

Initial version.
