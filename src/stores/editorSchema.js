const uuidv4 = require('uuid/v4')
const find = require('lodash/find')
const {StoreManager} = require('../store')


// Initial

const initial = {

}


// Handlers

const handlers = {

  // EditorSchema

  onRender:
    ({source, schema, onSave}) => (dispatch) => {

      // Load source

      // Load schema

      // Compose columns
      const columns = []
      for (const field of schema.fields) {
        columns.push({id: uuidv4(), field})
      }

      // Dispatch actions
      dispatch({type: 'SET_COLUMNS', columns})
      dispatch({type: 'SET_ON_SAVE', onSave})

    },

  onSaveClick:
    () => (dispatch, getState) => {
      const state = getState()
      const schema = {fields: state.columns.map(column => column.field)}
      state.onSave(schema)
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

  // Init

  SET_COLUMNS:
    (state, {columns}) => {
      state.columns = columns
    },

  SET_ON_SAVE:
    (state, {onSave}) => {
      state.onSave = onSave
    },

  // Field

  ADD_FIELD:
    (state) => {
      const field = {}
      state.columns.push({id: uuidv4(), field})
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


// System

module.exports = {
  storeManager: new StoreManager(initial, handlers, mutations),
}
