# react-opstore

React bindings for [`opstore`](https://github.com/mariuslundgard/opstore).

```sh
npm install react-opstore
```

[![build status](https://img.shields.io/travis/mariuslundgard/react-opstore/master.svg?style=flat-square)](https://travis-ci.org/mariuslundgard/react-opstore)
[![coverage status](https://img.shields.io/coveralls/mariuslundgard/react-opstore/master.svg?style=flat-square)](https://coveralls.io/github/mariuslundgard/react-opstore?branch=master)
[![npm version](https://img.shields.io/npm/v/react-opstore.svg?style=flat-square)](https://www.npmjs.com/package/react-opstore)

> DISCLAIMER: `react-opstore` is inspired by [`react-redux`](https://github.com/reactjs/react-redux).

## Usage

```js
import {connect, Provider} from 'react-opstore'
import {createStore} from 'opstore'
import React, {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
  render() {
    const {count} = this.props

    return (
      <div className="counter">
        <button onClick={count.decr}>-</button>
        <span>{count.get()}</span>
        <button onClick={count.incr}>+</button>
      </div>
    )
  }
}

const mapStoreToProps = store => ({
  count: store.ref('count')
})

const ConnectedApp = connect(mapStoreToProps)(App)

const store = createStore({count: 0})

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.body
)
```

## License

MIT © [Marius Lundgård](https://mariuslundgard.com)
