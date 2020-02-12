import React, { useState, useEffect } from 'react';

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

const BurgerBuilderComponent = (props) => {
  const [purchasing, setpurchasing] = useState(false);
  const [showSpinner, setshowSpinner] = useState(false);

  useEffect(() => {
    props.onFetchIngrediants();
  }, []);

  const updateOrderable = (ingrediants) => {
    const sum = Object.keys(ingrediants).map((ingrediant) => {
      return ingrediants[ingrediant];
    }).reduce((acc, nxtValue) => {
      return acc + nxtValue;
    }, 0)

    return sum > 0;
  }

  const purchasingHandler = () => {
    if (props.isAuthenticated) {
      setpurchasing(true);
    } else {
      props.onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelledHandler = () => {
    setpurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onOrderingInit();
    props.history.push('/checkout');
  }

  const disableInfo = {
    ...props.ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burgersElem = props.errorRef ? <p style={{paddingTop: '5rem'}}>Application can't be used. Sorry :(</p> :
    (<SpinnerComponent />);

  if (props.ings) {
    burgersElem = (
      <Aux>
        <BurgerComponent ingrediants={props.ings}/>

        <BuildControlsComponent 
            isAuthenticated={props.isAuthenticated}
            orderClicked={purchasingHandler}
            orderable={updateOrderable(props.ings)}
            price={props.tPrice}
            disabled={disableInfo}
            ingrediantRemoved={props.onIngrediantRemoved}
            ingrediantAdded={props.onIngrediantAdded}/>
      </Aux>
    );

    orderSummary = (
      <OrderSummaryComponent
            price={props.tPrice}
            ingrediants={props.ings}
            purchaseCancelled={purchaseCancelledHandler}
            purchaseContineued={purchaseContinueHandler}/>
    );

    if (showSpinner) {
      orderSummary = (<SpinnerComponent />);
    }
  }

  return (
    <Aux>
      <ModelComponent showModal={purchasing} modalClosed={purchaseCancelledHandler}>
        {orderSummary}
      </ModelComponent>
      
      {burgersElem}
    </Aux>
  );
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingrediants,
    tPrice: state.burger.totalPrice,
    errorRef: state.burger.error,
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngrediantAdded: (ingre) => dispatch(actionTypes.addIngrediant(ingre)),
    onIngrediantRemoved: (ingre) => dispatch(actionTypes.removeIngrediant(ingre)),
    onFetchIngrediants: () => dispatch(actionTypes.fetchIngrediants()),
    onOrderingInit: () => dispatch(actionTypes.orderInit()),
    onSetRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandlerComponent(BurgerBuilderComponent, OrderxAxios));