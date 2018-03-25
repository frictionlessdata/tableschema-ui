const uuidv4 = require('uuid/v4')
const find = require('lodash/find')
const {Table} = require('tableschema')
const {StoreManager} = require('../store')


// Initial

const initial = {
  feedback: false,
  onChange: false,
  columns: [],
}


// Handlers

const handlers = {

  // EditorSchema

  onRender:
    ({source=[], schema={}, onChange}) => (dispatch) => {

      // Load table
      Table.load(source, {schema})
        .then(table => {

          // Compose columns
          const columns = []
          for (const field of schema.fields || []) {
            columns.push({id: uuidv4(), field})
          }

          // Dispatch actions
          dispatch({type: 'SET_AFTER_RENDER', columns, onChange})

        })

    },


  onAddFieldClick:
    () => ({type: 'ADD_FIELD'}),

  // EditorField

  onRemoveFieldClick:
    (columnId) => ({type: 'REMOVE_FIELD', columnId}),

  onFieldPropertyChange:
    (columnId, key, value) => ({type: 'UPDATE_FIELD', columnId, key, value}),

}


// Mutations

const mutations = {

  // General

  SET_AFTER_RENDER:
    (state, action) => {
      state.columns = action.columns
      state.onChange = action.onChange
    },

  // Field

  ADD_FIELD:
    (state) => {
      const columnId = uuidv4()
      const fieldName = `field${state.columns.length + 1}`
      const field = {name: fieldName, type: 'string', format: 'default'}
      state.columns.push({id: columnId, field})
    },

  REMOVE_FIELD:
    (state, {columnId}) => {
      state.columns = state.columns.filter(column => column.id !== columnId)
    },

  UPDATE_FIELD:
    (state, {columnId, key, value}) => {
      const column = find(state.columns, column => column.id === columnId)
      column.field[key] = value
    }

}


// Processor

const processor = (state) => {

  // Feedback: no fields
  state.feedback = state.columns.length ? false : {
    type: 'warning',
    message: `
      There are no fields at the moment.
      Fields could be added using the "Add Field" button.
    `
  }

  // Call onChange
  if (state.onChange) {
    const schema = {fields: state.columns.map(column => column.field)}
    state.onChange(schema)
  }

}


// System

module.exports = {
  storeManager: new StoreManager(initial, handlers, mutations, processor),
}
