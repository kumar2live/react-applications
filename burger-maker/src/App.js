import React, { Component } from 'react';

import { Route, Switch} from 'react-router-dom';

import LayoutComponent from './features/Containers/Layout/LayoutComponent';
import BurgerBuilderComponent from './features/Containers/BurgerBuilder/BurgerBuilder';
import CheckOutSummary from './features/Containers/CheckOut/CheckoutComponent';
import OrdersComponent from './features/Containers/Orders/OrdersComponent';

class App extends Component {
  state = {
    showComp: true,
  }

  render () {
    return (
      <div className="App">
        <LayoutComponent>
          <Switch>
            <Route path="/checkout" component={CheckOutSummary} / >
            <Route path="/orders" component={OrdersComponent} / >
            <Route path="/" component={BurgerBuilderComponent} / >
          </Switch>
            {/* {this.state.showComp ? <BurgerBuilderComponent /> : null} */}
        </LayoutComponent>
      </div>
    );
  };

}

export default App;
