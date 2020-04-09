const { storeManager } = require('../editorSchema')

// Tests

it('should handle onRender success', (done) => {
  // Assert
  const store = storeManager.createStore()
  store.subscribe(() => {
    const state = store.getState()

    // Loading
    if (state.loading) {
      expect(state.feedback.type).toEqual('warning')
      expect(state.onSave).toEqual('onSave')
      expect(state.columns).toEqual([])
    }

    // Success
    if (!state.loading) {
      expect(state.feedback).toEqual(null)
      expect(state.onSave).toEqual('onSave')
      expect(state.columns[0].field.name).toEqual('field1')
      done()
    }
  })

  // Trigger
  const source = null
  const schema = { fields: [{ name: 'field1' }] }
  const onSave = 'onSave'
  storeManager.handlers.onRender({ source, schema, onSave })(store.dispatch, store.getState)
})

it('should handle onRender error', (done) => {
  // Assert
  const store = storeManager.createStore()
  store.subscribe(() => {
    const state = store.getState()

    // Loading
    if (state.loading) {
      expect(state.feedback.type).toEqual('warning')
      expect(state.onSave).toEqual('onSave')
      expect(state.columns).toEqual([])
    }

    // Error
    if (!state.loading) {
      expect(state.feedback.type).toEqual('danger')
      expect(state.onSave).toEqual('onSave')
      expect(state.columns).toEqual([])
      done()
    }
  })

  // Trigger
  const source = null
  const schema = 'bad schema'
  const onSave = 'onSave'
  storeManager.handlers.onRender({ source, schema, onSave })(store.dispatch, store.getState)
})

it('should handle onSaveClick', () => {
  // Prepare
  const onSave = jest.fn()
  const store = storeManager.createStore()
  store.dispatch({
    type: 'SET_RENDER',
    onSave,
  })
  store.dispatch({
    type: 'SET_LOAD_SUCCESS',
    columns: [{ field: { name: 'field1' } }, { field: { name: 'field2' } }],
    metadata: {
      missingValues: ['-'],
    },
  })

  // Assert
  storeManager.handlers.onSaveClick()(store.dispatch, store.getState)
  expect(onSave).toHaveBeenCalledWith(
    {
      fields: [{ name: 'field1' }, { name: 'field2' }],
      missingValues: ['-'],
    },
    null
  )
})

it('should handle onReset', () => {
  // Prepare
  const store = storeManager.createStore()
  store.dispatch({
    type: 'SET_RENDER',
  })

  // Assert
  store.dispatch(storeManager.handlers.onReset())
  const state = store.getState()
  expect(state.loading).toBeFalsy()
})

it('should handle onMoveFieldEnd', () => {
  // Prepare
  const store = storeManager.createStore()
  store.dispatch({
    type: 'SET_LOAD_SUCCESS',
    columns: [{ field: { name: 'field1' } }, { field: { name: 'field2' } }],
    metadata: {},
  })

  // Assert
  store.dispatch(storeManager.handlers.onMoveFieldEnd({ oldIndex: 1, newIndex: 0 }))
  const state = store.getState()
  expect(state.columns[0].field.name).toEqual('field2')
  expect(state.columns[1].field.name).toEqual('field1')
})

it('should handle onAddFieldClick', () => {
  // Prepare
  const store = storeManager.createStore()
  store.dispatch({
    type: 'SET_LOAD_SUCCESS',
    columns: [{ field: { name: 'field1' } }, { field: { name: 'field2' } }],
    metadata: {},
  })

  // Assert
  store.dispatch(storeManager.handlers.onAddFieldClick())
  const state = store.getState()
  expect(state.columns[0].field.name).toEqual('field1')
  expect(state.columns[1].field.name).toEqual('field2')
  expect(state.columns[2].field.name).toEqual('field3')
})

it('should handle onRemoveFieldClick', () => {
  // Prepare
  const store = storeManager.createStore()
  store.dispatch({
    type: 'SET_LOAD_SUCCESS',
    columns: [
      { id: 'column1', field: { name: 'field1' } },
      { id: 'column2', field: { name: 'field2' } },
    ],
    metadata: {},
  })

  // Assert
  store.dispatch(storeManager.handlers.onRemoveFieldClick('column1'))
  const state = store.getState()
  expect(state.columns[0].field.name).toEqual('field2')
})

it('should handle onFieldPropertyChange', () => {
  // Prepare
  const store = storeManager.createStore()
  store.dispatch({
    type: 'SET_LOAD_SUCCESS',
    columns: [
      { id: 'column1', field: { name: 'field1' } },
      { id: 'column2', field: { name: 'field2' } },
    ],
    metadata: {},
  })

  // Assert
  const handler = storeManager.handlers.onFieldPropertyChange
  store.dispatch(handler('column1', 'name', 'name'))
  store.dispatch(handler('column1', 'type', 'geopoint'))
  store.dispatch(handler('column1', 'format', 'array'))
  store.dispatch(handler('column1', 'title', 'Title'))
  store.dispatch(handler('column1', 'description', 'Description'))
  const state = store.getState()
  expect(state.columns[0].field).toEqual({
    name: 'name',
    type: 'geopoint',
    format: 'array',
    title: 'Title',
    description: 'Description',
  })
})
