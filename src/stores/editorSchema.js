const uuidv4 = require('uuid/v4')
const {StoreManager} = require('../store')


// Initial

const initial = {

}


// Handlers

const handlers = {

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

}


// Mutations

const mutations = {

  SET_COLUMNS:
    (state, {columns}) => {
      state.columns = columns
    },

  SET_ON_SAVE:
    (state, {onSave}) => {
      state.onSave = onSave
    },

}


// System

module.exports = {
  storeManager: new StoreManager(initial, handlers, mutations),
}
