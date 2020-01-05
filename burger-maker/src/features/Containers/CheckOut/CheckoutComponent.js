import React, { Component } from 'react';

import CheckOutSummary from '../../Components/Orders/CheckOutSummary/CheckOutSummary';
import ContactDataComponent from '../CheckOut/ContactData/ContactData';

import { Route } from 'react-router-dom';

class CheckoutComponent extends Component {
  state = {
    ingrediants: null,
    totalPrice: 0,
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingrediantsRef = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingrediantsRef[param[0]] = +param[1]
      }
    }

    this.setState({ingrediants: ingrediantsRef, totalPrice: price});
  }

  purchaseContineuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  purchaseCancelledHandler = () => {
    this.props.history.goBack();
  }

  render () {
    // console.log('CheckoutComponent -- ', this.props);

    return (
      <React.Fragment>
        <div>
          <CheckOutSummary 
            purchaseCancelled={this.purchaseCancelledHandler}
            purchaseContineued={this.purchaseContineuedHandler}
            ingrediants={this.state.ingrediants}/>

          <Route path={this.props.match.path + '/contact-data'} render={(props) => {
            return (
            <ContactDataComponent 
              {...props}
              totalPrice={this.state.totalPrice} 
              ingrediants={this.state.ingrediants}/>)
          }}/>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckoutComponent;