import React, { Component } from 'react';

import { connect } from 'react-redux';

import CheckOutSummary from '../../Components/Orders/CheckOutSummary/CheckOutSummary';
import ContactDataComponent from '../CheckOut/ContactData/ContactData';

import { Route } from 'react-router-dom';

class CheckoutComponent extends Component {
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
            ingrediants={this.props.ings}/>

          <Route path={this.props.match.path + '/contact-data'} component={ContactDataComponent}/>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingrediants,
  }
}

export default connect(mapStateToProps) (CheckoutComponent);