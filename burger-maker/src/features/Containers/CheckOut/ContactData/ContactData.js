import React, { Component } from "react";

import ButtonsComponent from '../../../Components/UIElments/Buttons/Buttons';
import CssClasses from './ContactData.module.css';

import SpinnerComponent from '../../../Components/UIElments/Spinner/Spinner';

import OrderxAxios from '../../../../axios-orders';

class ContactDataComponent extends Component {
  state = {
    showSpinner: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  componentDidMount() {
    console.log('ContactDataComponent this.props -- ', this.props);
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ showSpinner: true });
    const order = {
      ingrediants: this.props.ingrediants,
      price: this.props.totalPrice,
      customer: {
        name: 'Muthu Kumar',
        address: { street: 'Street', country: 'SG'},
        email: 'test@test.com',
        deliveryMethod: 'fastest'
      }
    }

    OrderxAxios.post('/orders.json', order).then((response) => {
      console.log('response -- ', response);
      this.setState({ showSpinner: false });
      this.props.history.push('/');
    }).catch((error) => {
      this.setState({ showSpinner: false });
    });
  }

  render() {
    let elem = null;

    if (this.state.showSpinner) {
      elem = (<SpinnerComponent />);
    } else {
      elem = (
        <form>
          <input className={CssClasses.Input} type="text" name="name" placeholder="Your Name"/>
          <input className={CssClasses.Input} type="email" name="email" placeholder="Your Email ID"/>
          <input className={CssClasses.Input} type="text" name="street" placeholder="Street name"/>
          <input className={CssClasses.Input} type="number" name="postalCode" placeholder="Your arer code"/>

          <ButtonsComponent btnType='Success' btnClicked={this.orderHandler}>ORDER</ButtonsComponent>
        </form>
      );
    }

    return (
      <React.Fragment>
        <div className={CssClasses.ContactData}>
          <h4>Your Burger is just ${this.props.totalPrice}</h4>
          <h4>Enter yout Contact Information</h4>

          {elem}
        </div>
      </React.Fragment>
    );
  }
}

export default ContactDataComponent;