import React, { Component, Suspense, useEffect } from 'react';

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

const AsyncAuth = React.lazy(() => {
  return import('./features/Containers/Auth/AuthComponent');
})

const AsyncCheckout = React.lazy(() => {
  return import('./features/Containers/CheckOut/CheckoutComponent');
})

const AsyncOrders = React.lazy(() => {
  return import('./features/Containers/Orders/OrdersComponent');
})

const App = (props) => {

  useEffect(() => {
    props.onAutoSignIn();
  }, [props]);

  let routes = null;

  if (props.isAuthenticated) {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/checkout" render={(props) => <AsyncCheckout {...props}/>} />
          <Route path="/orders" render={(props) => <AsyncOrders {...props} />} />
          <Route path="/auth" render={(props) => <AsyncAuth {...props} />} />
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
        <Route path="/auth" render={(props) => <AsyncAuth {...props} />} />
        <Route path="/" component={BurgerBuilderComponent} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>);
  }

  return (
    <div className="App">
      <LayoutComponent>
        <Suspense fallback={<p>Loading...!</p>}>{routes}</Suspense>
          {/* {this.state.showComp ? <BurgerBuilderComponent /> : null} */}
      </LayoutComponent>
    </div>
  );
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
