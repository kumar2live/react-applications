import React from 'react';

import { connect } from 'react-redux';

import CheckOutSummary from '../../Components/Orders/CheckOutSummary/CheckOutSummary';
import ContactDataComponent from '../CheckOut/ContactData/ContactData';


import { Route, Redirect } from 'react-router-dom';

const CheckoutComponent = (props) => {

  const purchaseContineuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  const purchaseCancelledHandler = () => {
    props.history.goBack();
  }

  let summary = (
    <Redirect to="/" />
  );

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckOutSummary 
          purchaseCancelled={purchaseCancelledHandler}
          purchaseContineued={purchaseContineuedHandler}
          ingrediants={props.ings}/>

        <Route path={props.match.path + '/contact-data'} component={ContactDataComponent}/>
      </div>
    );
  }

  return (
    <React.Fragment>
      {summary}
    </React.Fragment>
  );
  
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingrediants,
    purchased: state.order.purchased,
  }
}


export default connect(mapStateToProps) (CheckoutComponent);