const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')
const {assert} = require('chai')
const {shallow} = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const {EditorSchema} = require('../../src/components/EditorSchema')
Enzyme.configure({adapter: new Adapter()})


// Tests

describe('EditorSchema', () => {

  it('should render', () => {
    const onSchemaChange = sinon.spy()
    const wrapper = shallow(
      <EditorSchema onSchemaChange={onSchemaChange} />
    )
    assert(wrapper.contains('Schema Editor'))
  })

})
