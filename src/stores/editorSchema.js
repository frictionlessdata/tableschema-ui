const produce = require('immer')
const uuidv4 = require('uuid/v4')


// Mutations

const mutations = {

  // State

  INITIATE_STATE:
    (state, {source, schema}) => {
      state.source = source
      state.schema = schema
    },

  // Schema

  UPDATE_FIELD:
    ({schema}, {columnId, payload}) => {
    },

}


// System

module.exports = {
  mutations,
}
