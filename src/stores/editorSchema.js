const uuidv4 = require('uuid/v4')


// Initial

const initial = {

}


// Handlers

const handlers = {

  onRender:
    ({schema}) => (dispatch) => {
      dispatch({
        type: 'UPDATE_SCHEMA',
        schema,
      })
    },

}


// Mutations

const mutations = {

  // Schema

  UPDATE_SCHEMA:
    (state, {schema}) => {
      state.schema = schema
    },

}


// System

module.exports = {
  initial,
  handlers,
  mutations,
}
