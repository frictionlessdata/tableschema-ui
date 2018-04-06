const find = require('lodash/find')
const {arrayMove} = require('react-sortable-hoc')
const {StoreManager} = require('../store')
const helpers = require('../helpers')


// Initial

const initial = {
  columns: [],
  metadata: {},
  loading: false,
  feedback: null,
  onSave: null,
  error: null,
}


// Handlers

const handlers = {

  // EditorSchema

  onRender:
    ({source, schema, onSave}) => (dispatch, getState) => {
      dispatch({type: 'SET_RENDER', onSave})
      dispatch(async () => {
        try {
          const {columns, metadata} = await helpers.importSchema(source, schema)
          const state = getState()
          if (state.loading) {
            dispatch({type: 'SET_LOAD_SUCCESS', columns, metadata})
          }
        } catch (error) {
          const state = getState()
          if (state.loading) {
            dispatch({type: 'SET_LOAD_ERROR', error})
          }
        }
      })
    },

  onSaveClick:
    () => (dispatch, getState) => {
      const state = getState()
      if (state.onSave) {
        const schema = helpers.exportSchema(state.columns, state.metadata)
        state.onSave(schema, state.error)
      }
    },

  onReset:
    () => ({type: 'RESET'}),

  onMoveFieldEnd:
    ({oldIndex, newIndex}) => ({type: 'MOVE_FIELD', oldIndex, newIndex}),

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

  SET_RENDER:
    (state, {onSave}) => {
      state.loading = true
      state.onSave = onSave
    },

  SET_LOAD_SUCCESS:
    (state, {columns, metadata}) => {
      state.loading = false
      state.columns = columns
      state.metadata = metadata
    },

  SET_LOAD_ERROR:
    (state, {error}) => {
      state.loading = false
      state.error = error
    },

  RESET:
    (state) => {
      state.loading = false
      state.error = false
      state.columns = []
      state.metadata = {}
    },

  // Schema

  MOVE_FIELD:
    (state, {oldIndex, newIndex}) => {
      state.columns = arrayMove(state.columns, oldIndex, newIndex)
    },

  ADD_FIELD:
    (state) => {
      state.columns.push(helpers.createColumn(state.columns))
    },

  // Field

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
  state.feedback = null

  // Loading warning
  if (state.loading) {
    state.feedback = {
      type: 'warning',
      message: 'Data source or data schema are loading. Please wait.',
      reset: true,
    }
  }

  // Loading error
  if (state.error) {
    state.feedback = {
      type: 'danger',
      message: 'Can\'t load and parse data source or data schema. Please try again.',
      reset: true,
    }
  }

}


// System

module.exports = {
  storeManager: new StoreManager(initial, handlers, mutations, processor),
}
