const redux = require('redux')
const pick = require('lodash/pick')
const reactRedux = require('react-redux')
const thunk = require('redux-thunk').default
const produce = require('immer').default


// Module API

const connect = (component, mapping) => {
  const mapState = mapping instanceof Array ? (state) => pick(state, mapping) : mapping
  return reactRedux.connect(mapState)(component)
}


const createStore = (initial, handlers, mutations) => {
  return redux.createStore(
    createReducer(initial, handlers, mutations),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    redux.applyMiddleware(thunk)
  )
}


const createReducer = (initial, handlers, mutations) => (state, action) => {
  if (!state) return {...initial, handlers}
  const mutation = mutations[action.type]
  return mutation ? produce(state, draft => mutation(draft, action)) : state
}


// System

module.exports = {
  connect,
  createStore,
  createReducer,
}
