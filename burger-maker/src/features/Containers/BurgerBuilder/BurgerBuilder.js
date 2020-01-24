import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';

import Aux from '../../hoc/Aux';
import BurgerComponent from '../Burger/BurgerComponent';
import BuildControlsComponent from '../Burger/BuildControls/BuildControlsComponent';
import ModelComponent from '../../Components/UIElments/Model/ModelComponent';
import OrderSummaryComponent from '../../Containers/Burger/OrderSummary/OrderSummaryComponent';
import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import WithErrorHandlerComponent from '../../hoc/WithErrorHandler/WithErrorHandler'; 

import OrderxAxios from '../../../axios-orders';

class BurgerBuilderComponent extends Component {
  constructor() {
    super();

    this.state = {
      purchasing: false,
      showSpinner: false,
    };

    this.purchasingHandler = this.purchasingHandler.bind(this)
  }

  componentDidMount() {
    this.props.onFetchIngrediants()
    // OrderxAxios.get('/ingrediants.json').then((response) => {
    //   this.setState({
    //     ingrediants: response.data,
    //   })
    // }).catch((error) => {
    //   this.setState({errorRef: true});
    // });
  }

  updateOrderable = (ingrediants) => {
    const sum = Object.keys(ingrediants).map((ingrediant) => {
      return ingrediants[ingrediant];
    }).reduce((acc, nxtValue) => {
      return acc + nxtValue;
    }, 0)

    return sum > 0;
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
    this.props.onOrderingInit();
    this.props.history.push('/checkout');
  }

  render() {
    // console.log('props -- ', this.props);
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burgersElem = this.props.errorRef ? <p style={{paddingTop: '5rem'}}>Application can't be used. Sorry :(</p> :
      (<SpinnerComponent />);

    if (this.props.ings) {
      burgersElem = (
        <Aux>
          <BurgerComponent ingrediants={this.props.ings}/>

          <BuildControlsComponent 
              orderClicked={this.purchasingHandler}
              orderable={this.updateOrderable(this.props.ings)}
              price={this.props.tPrice}
              disabled={disableInfo}
              ingrediantRemoved={this.props.onIngrediantRemoved}
              ingrediantAdded={this.props.onIngrediantAdded}/>
        </Aux>
      );

      orderSummary = (
        <OrderSummaryComponent
              price={this.props.tPrice}
              ingrediants={this.props.ings}
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

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingrediants,
    tPrice: state.burger.totalPrice,
    errorRef: state.burger.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngrediantAdded: (ingre) => dispatch(actionTypes.addIngrediant(ingre)),
    onIngrediantRemoved: (ingre) => dispatch(actionTypes.removeIngrediant(ingre)),
    onFetchIngrediants: () => dispatch(actionTypes.fetchIngrediants()),
    onOrderingInit: () => dispatch(actionTypes.orderInit()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandlerComponent(BurgerBuilderComponent, OrderxAxios));