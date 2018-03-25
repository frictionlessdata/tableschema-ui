const redux = require('redux')
const pick = require('lodash/pick')
const reactRedux = require('react-redux')
const thunk = require('redux-thunk').default
const produce = require('immer').default


// Module API

class StoreManager {

  // Public

  constructor(initial, handlers, mutations, processor) {
    this.initial = initial
    this.handlers = handlers
    this.mutations = mutations
    this.processor = processor
  }

  connect({mapState, mapDispatch}) {
    return (component) => reactRedux.connect(
      mapState instanceof Array ? (state) => pick(state, mapState) : mapState,
      mapDispatch instanceof Array ? pick(this.handlers, mapDispatch) : mapDispatch
    )(component)
  }

  createStore() {
    return redux.createStore(
      this.createReducer(),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      redux.applyMiddleware(thunk)
    )
  }

  createReducer() {
    return (state, action) => {
      if (!state) return this.initial
      const mutation = this.mutations[action.type]
      return !mutation ? state : produce(state, draft => {
        mutation(draft, action)
        this.processor(draft)
      })
    }
  }

}


// System

module.exports = {
  StoreManager,
}
