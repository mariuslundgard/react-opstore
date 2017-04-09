# react-opstore

React bindings for [`opstore`](https://github.com/mariuslundgard/opstore).

```sh
npm install react-opstore
```

[![Build Status](https://travis-ci.org/mariuslundgard/react-opstore.svg?branch=master)](https://travis-ci.org/mariuslundgard/react-opstore)

> DISCLAIMER: `react-opstore` is inspired by [`react-redux`](https://github.com/reactjs/react-redux).

## Usage

```js
import {connect, Provider} from 'react-opstore'
import {createStore} from 'opstore'
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
  render () {
    return (
      <div className="couter">
        <button onClick={this.props.decr}>-</button>
        <span>{this.props.count}</span>
        <button onClick={this.props.incr}>+</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

const mapStateToProps = (store) => {
  const countRef = store.ref('count')
  return {
    decr: () => countRef.decr(),
    incr: () => countRef.incr()
  }
}

const ConnectedApp = connect(mapStateToProps, mapStoreToProps)(App)

const store = createStore({count: 0})

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.body
)
```
