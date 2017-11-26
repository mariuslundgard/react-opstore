/* tslint:disable max-classes-per-file */

import {IStore} from 'opstore'
import * as PropTypes from 'prop-types'
import {Children, Component, ComponentClass, createElement} from 'react'

const noop = (...args: any[]) => {
  // Purposefully empty
}

export interface IProviderProps {
  store: IStore<any>
}

export class Provider extends Component<IProviderProps> {
  public static childContextTypes = {
    store: PropTypes.object.isRequired,
    storeSubscription: PropTypes.func
  }

  public store: IStore<any>

  constructor(props: IProviderProps, context: any) {
    super(props, context)
    this.store = props.store
  }

  public getChildContext(): any {
    return {
      store: this.store,
      storeSubscription: null
    }
  }

  public render(): any {
    return Children.only(this.props.children)
  }
}

interface IConnectedContext {
  store: IStore<any>
}

interface IConnectedState {
  data: any
}

export const connect = (mapStateToProps = noop, mapStoreToProps = noop) => (WrappedComponent: ComponentClass): any => {
  class ConnectedComponent extends Component<any, IConnectedState> {
    public static contextTypes = {
      store: PropTypes.object
    }

    public store: IStore<any>
    public storeProps: any
    public storeSubscription: any

    constructor(props: any, context: IConnectedContext) {
      super(props, context)
      this.store = context.store
      this.storeProps = mapStoreToProps(this.store)
      this.state = {
        data: mapStateToProps(this.store.get())
      }
    }

    public componentDidMount() {
      this.storeSubscription = this.store.subscribe({
        next: (state: any) => {
          this.setState({data: mapStateToProps(state)})
        }
      })
    }

    public componentWillUnmount() {
      this.storeSubscription.unsubscribe()
    }

    public render() {
      return createElement(WrappedComponent, Object.assign({}, this.state.data, this.storeProps))
    }
  }

  return ConnectedComponent
}

export default {connect, Provider}
