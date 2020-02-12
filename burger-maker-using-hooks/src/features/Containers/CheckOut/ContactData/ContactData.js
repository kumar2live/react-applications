import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/index';

import OrderxAxios from '../../../../axios-orders';

import CssClasses from './ContactData.module.css';

import ButtonsComponent from '../../../Components/UIElments/Buttons/Buttons';
import SpinnerComponent from '../../../Components/UIElments/Spinner/Spinner';
import InputComponent from '../../../Components/UIElments/Input/Input';

import { checkValidity } from '../../../../shared/utility';

import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';

const ContactDataComponent = (props) => {
  const [orderForm, setorderForm] = useState(
    {
      name: {
        name: 'Name: ',
        elemType: 'input',
        elemConfig: {
          type: 'text', placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        name: 'Street: ',
        elemType: 'input',
        elemConfig: {
          type: 'text', placeholder: 'Where is your house',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        name: 'Country: ',
        elemType: 'input',
        elemConfig: {
          type: 'text', placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        name: 'Zip Code: ',
        elemType: 'input',
        elemConfig: {
          type: 'text', placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      email: {
        name: 'Email: ',
        elemType: 'email',
        elemConfig: {
          type: 'text', placeholder: 'Your Email ID',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        name: 'Delivery Method: ',
        elemType: 'select',
        elemConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest method'},
            {value: 'cheapest', displayValue: 'Cheapest method'}
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    }
  );
  const [formIsValid, setformIsValid] = useState(false);

  const getFormData = () => {
    const formData = {};

    for (let elemIden in orderForm) {
      formData[elemIden] = orderForm[elemIden].value;
    }

    return formData;
  }

  const orderHandler = (event) => {
    event.preventDefault();

    const order = {
      ingrediants: props.ings,
      price: props.tPrice,
      orderData: getFormData(),
      userId: props.userId,
    }

    props.onOrderSubmit(order, props.token);
  }

  const propertyChangedHandler = (event, inputIdentifier) => {
    const {value} = event.target;
    const updatedOrderForm = {...orderForm};
    const updatedOrderElem = {...updatedOrderForm[inputIdentifier]};
    updatedOrderElem.value = value;
    updatedOrderElem.touched = true;
    updatedOrderElem.valid = checkValidity(updatedOrderElem.value , updatedOrderElem.validation)

    updatedOrderForm[inputIdentifier] = updatedOrderElem;
    
    let formValidity = true;
    for (let elems in updatedOrderForm) {
      formValidity = (updatedOrderForm[elems].valid && formValidity);
    }

    setorderForm(updatedOrderForm);
    setformIsValid(formValidity);
  }

  const formElemArr = [];
  for(let key in orderForm) {
    formElemArr.push({
      id: key,
      config: orderForm[key],
    });
  }

  let elem = null;

  if (props.loading) {
    elem = (<SpinnerComponent />);
  } else {
    elem = (
      <form onSubmit={orderHandler}>
        {formElemArr.map((formElem) => {
          return (
            <InputComponent
              invalid={!formElem.config.valid}
              shouldValidate={formElem.config.validation}
              touched={formElem.config.touched}
              key={formElem.id}
              label={formElem.config.name}
              elemType={formElem.config.elemType}
              elemConfig={formElem.config.elemConfig}
              value={formElem.config.value}
              propertyChanged={(e) => {propertyChangedHandler(e, formElem.id)}}
            />
          );
        })}

        <ButtonsComponent btnType='Success' btnDisabled={!formIsValid} >ORDER</ButtonsComponent>
      </form>
    );
  }

  return (
    <React.Fragment>
      <div className={CssClasses.ContactData}>
        <h4>Your Burger is just ${(+props.tPrice).toFixed(2)}</h4>
        <h4>Enter yout Contact Information</h4>

        {elem}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingrediants,
    tPrice: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderSubmit: (order, token) => dispatch(actionTypes.orderBurger(order, token)),
    onIngrediantsReset: () => dispatch(actionTypes.resetIngrediant()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactDataComponent, OrderxAxios));