import {createStore} from 'opstore'
import * as React from 'react'
import {renderIntoDocument} from 'react-dom/test-utils'
import {connect, Provider} from '../src'

describe('react-opstore', () => {
  it('should add the store to the child context', () => {
    class Test extends React.Component {
      public render() {
        return <div>Test</div>
      }
    }

    const ConnectedTest = connect()(Test)
    const store = createStore({count: 0})

    const tree = renderIntoDocument(
      <Provider store={store}>
        <ConnectedTest />
      </Provider>
    )

    expect(tree.store).toEqual(store)
  })
})
