import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import BurgerComponent from '../Burger/BurgerComponent';
import BuildControlsComponent from '../Burger/BuildControls/BuildControlsComponent';
import ModelComponent from '../../Components/UIElments/Model/ModelComponent';
import OrderSummaryComponent from '../../Containers/Burger/OrderSummary/OrderSummaryComponent';
import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import WithErrorHandlerComponent from '../../hoc/WithErrorHandler/WithErrorHandler'; 

import OrderxAxios from '../../../axios-orders';

const INGREDIANT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 2.0,
}

class BurgerBuilderComponent extends Component {
  constructor() {
    super();

    this.state = {
      ingrediants: null,
      totalPrice: 4,
      orderable: false,
      purchasing: false,
      showSpinner: false,
      errorRef: false,
    };

    this.purchasingHandler = this.purchasingHandler.bind(this)
  }

  componentDidMount() {
    OrderxAxios.get('/ingrediants.json').then((response) => {
      this.setState({
        ingrediants: response.data,
      })
    }).catch((error) => {
      this.setState({errorRef: true});
    });
  }

  updateOrderable = (ingrediants) => {
    const sum = Object.keys(ingrediants).map((ingrediant) => {
      return ingrediants[ingrediant];
    }).reduce((acc, nxtValue) => {
      return acc + nxtValue;
    }, 0)

    this.setState({
      orderable: sum > 0,
    })
  }

  addIngrediantHandler = (type) => {
    const oldCount = this.state.ingrediants[type];
    const updatedCount = oldCount + 1;

    const updatedIngrediants = {
      ...this.state.ingrediants
    }

    updatedIngrediants[type] = updatedCount;
    const priceAddition = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingrediants: updatedIngrediants,
    });
    this.updateOrderable(updatedIngrediants);
  }

  removeIngrediantHandler = (type) => {
    const oldCount = this.state.ingrediants[type];
    if (oldCount === 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    const updatedIngrediants = {
      ...this.state.ingrediants
    }

    updatedIngrediants[type] = updatedCount;
    const priceDetuctions = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDetuctions;

    this.setState({
      totalPrice: newPrice,
      ingrediants: updatedIngrediants,
    });
    this.updateOrderable(updatedIngrediants );
  }

  purchasingHandler () {
    this.setState({
      purchasing: true,
    })
  }

  purchaseCancelledHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // this.setState({ showSpinner: true });
    // const order = {
    //   ingrediants: this.state.ingrediants,
    //   price: (this.state.totalPrice).toFixed(2),
    //   customer: {
    //     name: 'Muthu Kumar',
    //     address: { street: 'Street', country: 'SG'},
    //     email: 'test@test.com',
    //     deliveryMethod: 'fastest'
    //   }
    // }

    // OrderxAxios.post('/orders.json', order).then((response) => {
    //   this.setState({ showSpinner: false, purchasing: false });
    // }).catch((error) => {
    //   this.setState({ showSpinner: false, purchasing: false });
    // });
    const queryParams = [];
    for (let i in this.state.ingrediants) {
      queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(this.state.ingrediants[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  }

  render() {
    const disableInfo = {
      ...this.state.ingrediants,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burgersElem = this.state.errorRef ? <p style={{paddingTop: '5rem'}}>Application can't be used. Sorry :(</p> :
      (<SpinnerComponent />);

    if (this.state.ingrediants) {
      burgersElem = (
        <Aux>
          <BurgerComponent ingrediants={this.state.ingrediants}/>
          <BuildControlsComponent 
              orderClicked={this.purchasingHandler}
              orderable={this.state.orderable}
              price={this.state.totalPrice}
              disabled={disableInfo}
              ingrediantRemoved={this.removeIngrediantHandler}
              ingrediantAdded={this.addIngrediantHandler}/>
        </Aux>
      );

      orderSummary = (
        <OrderSummaryComponent
              price={this.state.totalPrice}
              ingrediants={this.state.ingrediants}
              purchaseCancelled={this.purchaseCancelledHandler}
              purchaseContineued={this.purchaseContinueHandler}/>
      );

      if (this.state.showSpinner) {
        orderSummary = (<SpinnerComponent />);
      }
    }

    return (
      <Aux>
        <ModelComponent showModal={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
          {orderSummary}
        </ModelComponent>
        
        {burgersElem}
      </Aux>
    );
  }
}

export default WithErrorHandlerComponent(BurgerBuilderComponent, OrderxAxios);