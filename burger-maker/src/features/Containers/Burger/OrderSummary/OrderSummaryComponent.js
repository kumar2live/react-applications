import React, { Component } from 'react';

import CssClasses from './OrderSummary.module.css';
import ButtonsComponent from '../../../Components/UIElments/Buttons/Buttons';

class OrderSummaryComponent extends Component {

  componentDidUpdate() {
    console.log('OrderSummaryComponent componentDidUpdate');
  }

  render () {
    const ingrediantsSummary = Object.keys(this.props.ingrediants)
      .map((ingKey) => {
        return (
        <li key={ingKey}>
          <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingrediants[ingKey]}
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

        <strong>Total Price ${this.props.price.toFixed(2)}</strong>
        <p>Continue to Checkout?</p>
        <ButtonsComponent btnType='Danger' btnClicked={this.props.purchaseCancelled}>CANCEL</ButtonsComponent>
        <ButtonsComponent btnType='Success' btnClicked={this.props.purchaseContineued}>CONTINUE</ButtonsComponent>
      </div>
    );
  }
}

export default OrderSummaryComponent;