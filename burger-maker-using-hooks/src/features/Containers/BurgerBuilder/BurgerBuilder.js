import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
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

  const dispatch = useDispatch();
  
  const ings = useSelector((state) => state.burger.ingrediants);
  const tPrice = useSelector((state) => state.burger.totalPrice);
  const errorRef = useSelector((state) => state.burger.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onIngrediantAdded = (ingre) => dispatch(actionTypes.addIngrediant(ingre));
  const onIngrediantRemoved = (ingre) => dispatch(actionTypes.removeIngrediant(ingre));
  // use callback is important to remember the onFetchIngridiants method below
  const onFetchIngrediants = useCallback(() => dispatch(actionTypes.fetchIngrediants()), [dispatch]);
  const onOrderingInit = () => dispatch(actionTypes.orderInit());
  const onSetRedirectPath = (path) => dispatch(actionTypes.setAuthRedirectPath(path));

  useEffect(() => {
    onFetchIngrediants();
  }, [onFetchIngrediants]);

  const updateOrderable = (ingrediants) => {
    const sum = Object.keys(ingrediants).map((ingrediant) => {
      return ingrediants[ingrediant];
    }).reduce((acc, nxtValue) => {
      return acc + nxtValue;
    }, 0)

    return sum > 0;
  }

  const purchasingHandler = () => {
    if (isAuthenticated) {
      setpurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelledHandler = () => {
    setpurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onOrderingInit();
    props.history.push('/checkout');
  }

  const disableInfo = {
    ...ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burgersElem = errorRef ? <p style={{paddingTop: '5rem'}}>Application can't be used. Sorry :(</p> :
    (<SpinnerComponent />);

  if (ings) {
    burgersElem = (
      <Aux>
        <BurgerComponent ingrediants={ings}/>

        <BuildControlsComponent 
            isAuthenticated={isAuthenticated}
            orderClicked={purchasingHandler}
            orderable={updateOrderable(ings)}
            price={tPrice}
            disabled={disableInfo}
            ingrediantRemoved={onIngrediantRemoved}
            ingrediantAdded={onIngrediantAdded}/>
      </Aux>
    );

    orderSummary = (
      <OrderSummaryComponent
            price={tPrice}
            ingrediants={ings}
            purchaseCancelled={purchaseCancelledHandler}
            purchaseContineued={purchaseContinueHandler}/>
    );
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

export default (WithErrorHandlerComponent(BurgerBuilderComponent, OrderxAxios));