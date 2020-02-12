import React from 'react';

import ButtonsComponent from '../../../Components/UIElments/Buttons/Buttons';

const OrderSummaryComponent = (props) => {

  const ingrediantsSummary = Object.keys(props.ingrediants)
    .map((ingKey) => {
      return (
      <li key={ingKey}>
        <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingrediants[ingKey]}
      </li>
      );
    });

  return (
    <div>
      <h3>Your Order </h3>
      <p>A delicious burger with the following ingrediants:</p>

      <ul>
        {ingrediantsSummary}
      </ul>

      <strong>Total Price ${props.price.toFixed(2)}</strong>
      <p>Continue to Checkout?</p>
      <ButtonsComponent btnType='Danger' btnClicked={props.purchaseCancelled}>CANCEL</ButtonsComponent>
      <ButtonsComponent btnType='Success' btnClicked={props.purchaseContineued}>CONTINUE</ButtonsComponent>
    </div>
  );
}

export default OrderSummaryComponent;