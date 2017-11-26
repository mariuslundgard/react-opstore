/* tslint:disable max-classes-per-file */

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

  it('should re-render when the state changes', () => {
    expect.assertions(2)

    class Test extends React.Component<any> {
      public render() {
        expect(this.props.count.get()).toEqual(this.props.count.get())
        return <div>{this.props.count.get()}</div>
      }
    }

    const ConnectedTest = connect(s => ({count: s.ref('count')}))(Test)
    const store = createStore({count: 0})

    const tree = renderIntoDocument(
      <Provider store={store}>
        <ConnectedTest />
      </Provider>
    )

    store.ref('count').incr()
    store.ref('count').set(1)
  })
})
