import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as ActionTypes from './store/actions/index';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import LayoutComponent from './features/Containers/Layout/LayoutComponent';
import BurgerBuilderComponent from './features/Containers/BurgerBuilder/BurgerBuilder';
// import CheckOutSummary from './features/Containers/CheckOut/CheckoutComponent';
// import OrdersComponent from './features/Containers/Orders/OrdersComponent';
// import AuthComponent from './features/Containers/Auth/AuthComponent';
import LogoutComponent from './features/Containers/Auth/LogoutComponent/LogoutComponent';

import asyncComponent from './features/hoc/AsyncComponent/AsyncComponent';

const asyncAuth = asyncComponent(() => {
  return import('./features/Containers/Auth/AuthComponent');
})

const asyncCheckout = asyncComponent(() => {
  return import('./features/Containers/CheckOut/CheckoutComponent');
})

const asyncOrders = asyncComponent(() => {
  return import('./features/Containers/Orders/OrdersComponent');
})

class App extends Component {
  state = {
    showComp: true,
  }

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render() {
    let routes = null;

    if (this.props.isAuthenticated) {
      routes = (
        <React.Fragment>
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={LogoutComponent} />
            <Route path="/" component={BurgerBuilderComponent} />
            <Redirect to="/" />
          </Switch>
        </React.Fragment>
      )
    } else {
      routes = (
      <React.Fragment>
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilderComponent} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>);
    }

    return (
      <div className="App">
        <LayoutComponent>
          <Switch>
            {routes}
          </Switch>
            {/* {this.state.showComp ? <BurgerBuilderComponent /> : null} */}
        </LayoutComponent>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(ActionTypes.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
