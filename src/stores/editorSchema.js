const find = require('lodash/find')
const {StoreManager} = require('../store')
const helpers = require('../helpers')


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
    ({source, schema, onChange}) => (dispatch) => {
      dispatch(async () => {
        const {columns, metadata} = await helpers.importSchema(source, schema)
        dispatch({type: 'SET_AFTER_RENDER', columns, metadata, onChange})
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
      state.metadata = action.metadata
      state.onChange = action.onChange
    },

  // Field

  ADD_FIELD:
    (state) => {
      state.columns.push(helpers.createColumn(state.columns))
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
    const schema = helpers.exportSchema(state.columns, state.metadata)
    state.onChange(schema)
  }

}


// System

module.exports = {
  storeManager: new StoreManager(initial, handlers, mutations, processor),
}
