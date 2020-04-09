const React = require('react')
const Enzyme = require('enzyme')
const { shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { EditorPreview } = require('../EditorPreview')
Enzyme.configure({ adapter: new Adapter() })

// Tests

it('should render', () => {
  // Render
  const columns = [{ field: { name: 'id' } }, { field: { name: 'name' } }]
  const metadata = { missingValues: ['-'] }
  const wrapper = shallow(<EditorPreview.Inner columns={columns} metadata={metadata} />)

  // Assert
  expect(wrapper.find('.tableschema-ui-editor-preview').length).toEqual(1)
  expect(wrapper.find('code').text()).toEqual(
    JSON.stringify(
      {
        fields: [{ name: 'id' }, { name: 'name' }],
        missingValues: ['-'],
      },
      null,
      2
    )
  )
})
