import assert from 'assert'
import {connect, Provider} from '../src'
import {createStore} from 'opstore'
import {describe, it} from 'mocha'
import React, {Component} from 'react'
import TestUtils from 'react-dom/test-utils'

describe('react-opstore', () => {
  it('should add the store to the child context', () => {
    class Test extends Component {
      render () {
        return (
          <div>Test</div>
        )
      }
    }

    const ConnectedTest = connect()(Test)
    const store = createStore({count: 0})

    const tree = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTest />
      </Provider>
    )

    assert(tree.store === store)
  })
})
