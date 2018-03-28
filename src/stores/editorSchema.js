const find = require('lodash/find')
const {StoreManager} = require('../store')
const helpers = require('../helpers')


// Initial

const initial = {
  columns: [],
  metadata: {},
  feedback: false,
  onSave: false,
}


// Handlers

const handlers = {

  // EditorSchema

  onRender:
    ({source, schema, onSave}) => (dispatch) => {
      dispatch(async () => {
        const {columns, metadata} = await helpers.importSchema(source, schema)
        dispatch({type: 'SET_AFTER_RENDER', columns, metadata, onSave})
      })
    },

  onSaveClick:
    () => (dispatch, getState) => {
      const state = getState()
      if (state.onSave) {
        const schema = helpers.exportSchema(state.columns, state.metadata)
        state.onSave(schema)
      }
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
      state.onSave = action.onSave
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
}


// System

module.exports = {
  storeManager: new StoreManager(initial, handlers, mutations, processor),
}
