const redux = require('redux')
const produce = require('immer').default
const thunk = require('redux-thunk').default


// Module API

const createStore = (mutations, props={}) => {
  return redux.createStore(
    createReducer(mutations, props),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    redux.applyMiddleware(thunk),
  )
}


const createReducer = (mutations, props={}) => (state, action) => {
  action = state ? action : {type: 'INITIATE_STATE', ...props}
  const mutation = mutations[action.type]
  return mutation ? produce(state || {}, draft => mutation(draft, action)) : state
}


// System

module.exports = {
  createStore,
  createReducer,
}
