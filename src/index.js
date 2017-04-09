import {Children, Component, createElement} from 'react'
import PropTypes from 'prop-types'

const noop = () => {}

class Provider extends Component {
  getChildContext() {
    return {
      store: this.store,
      storeSubscription: null
    }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.childContextTypes = {
  store: PropTypes.object.isRequired,
  storeSubscription: PropTypes.func
}

const connect = (mapStateToProps = noop, mapStoreToProps = noop) =>
  (WrappedComponent) => {
    class ConnectedComponent extends Component {
      constructor (props, context) {
        super()
        this.store = props.store || context.store
        this.storeProps = mapStoreToProps(this.store)
        this.state = {
          data: mapStateToProps(this.store.get())
        }
      }
      
      componentDidMount () {
        this.storeSubscription = this.store.subscribe((state) => {
          this.setState({data: mapStateToProps(state)})
        })
      }

      componentWillUnmount () {
        this.storeSubscription()
      }

      render () {
        return createElement(WrappedComponent, Object.assign({}, this.state.data, this.storeProps))
      }
    }

    ConnectedComponent.contextTypes = {
      store: PropTypes.object
    }

    return ConnectedComponent
  }

module.exports = {
  connect,
  Provider
}
