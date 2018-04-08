const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')
const {assert} = require('chai')
const {shallow} = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const {EditorPreview} = require('../../src/components/EditorPreview')
Enzyme.configure({adapter: new Adapter()})


// Tests

describe('EditorPreview', () => {

  it('should render', () => {

    // Render
    const columns = [{field: {name: 'id'}}, {field: {name: 'name'}}]
    const metadata = {missingValues: ['-']}
    const wrapper = shallow(<EditorPreview.Inner columns={columns} metadata={metadata} />)

    // Assert
    assert.deepEqual(wrapper.find('.tableschema-ui-editor-preview').length, 1)
    assert.deepEqual(wrapper.find('code').text(), JSON.stringify({
      fields: [{name: 'id'}, {name: 'name'}],
      missingValues: ['-'],
    }, null, 2))

  })

})
