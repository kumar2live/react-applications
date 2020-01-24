import React, { Component } from 'react';

import { connect } from 'react-redux';

import CheckOutSummary from '../../Components/Orders/CheckOutSummary/CheckOutSummary';
import ContactDataComponent from '../CheckOut/ContactData/ContactData';


import { Route, Redirect } from 'react-router-dom';

class CheckoutComponent extends Component {

  purchaseContineuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  purchaseCancelledHandler = () => {
    this.props.history.goBack();
  }

  render () {
    // console.log('CheckoutComponent -- ', this.props);
    let summary = (
      <Redirect to="/" />
    );

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary 
            purchaseCancelled={this.purchaseCancelledHandler}
            purchaseContineued={this.purchaseContineuedHandler}
            ingrediants={this.props.ings}/>

          <Route path={this.props.match.path + '/contact-data'} component={ContactDataComponent}/>
        </div>
      );
    }

    return (
      <React.Fragment>
        {summary}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingrediants,
    purchased: state.order.purchased,
  }
}


export default connect(mapStateToProps) (CheckoutComponent);