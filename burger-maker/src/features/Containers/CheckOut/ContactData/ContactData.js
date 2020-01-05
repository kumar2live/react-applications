import React, { Component } from "react";

import OrderxAxios from '../../../../axios-orders';

import CssClasses from './ContactData.module.css';

import ButtonsComponent from '../../../Components/UIElments/Buttons/Buttons';
import SpinnerComponent from '../../../Components/UIElments/Spinner/Spinner';
import InputComponent from '../../../Components/UIElments/Input/Input';

class ContactDataComponent extends Component {
  state = {
    showSpinner: false,
    formIsValid: false,
    orderForm: {
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
    },
  }

  componentDidMount() {
    // console.log('ContactDataComponent this.props -- ', this.props);
  }

  getFormData() {
    const formData = {};

    for (let elemIden in this.state.orderForm) {
      formData[elemIden] = this.state.orderForm[elemIden].value;
    }

    return formData;
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ showSpinner: true });

    const order = {
      ingrediants: this.props.ingrediants,
      price: this.props.totalPrice,
      orderData: this.getFormData(),
    }

    OrderxAxios.post('/orders.json', order).then((response) => {
      this.setState({ showSpinner: false });
      this.props.history.push('/');
    }).catch((error) => {
      this.setState({ showSpinner: false });
    });
  }

  checkValidity (value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = (value.trim() !== '') && isValid;
    }

    if (rules.minLength) {
      isValid = (value.length >= rules.minLength && isValid);
    }
    
    if (rules.maxLength) {
      isValid = (value.length <= rules.maxLength && isValid);
    }
    
    return isValid;
  }

  propertyChangedHandler = (event, inputIdentifier) => {
    const {value} = event.target;
    const updatedOrderForm = {...this.state.orderForm};
    const updatedOrderElem = {...updatedOrderForm[inputIdentifier]};
    updatedOrderElem.value = value;
    updatedOrderElem.touched = true;
    updatedOrderElem.valid = this.checkValidity(updatedOrderElem.value , updatedOrderElem.validation)

    updatedOrderForm[inputIdentifier] = updatedOrderElem;
    
    let formValidity = true;
    for (let elems in updatedOrderForm) {
      formValidity = (updatedOrderForm[elems].valid && formValidity);
    }

    this.setState({
      orderForm: updatedOrderForm, formIsValid: formValidity,
    })
  }

  render() {

    const formElemArr = [];
    for(let key in this.state.orderForm) {
      formElemArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let elem = null;

    if (this.state.showSpinner) {
      elem = (<SpinnerComponent />);
    } else {
      elem = (
        <form onSubmit={this.orderHandler}>
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
                propertyChanged={(e) => {this.propertyChangedHandler(e, formElem.id)}}
              />
            );
          })}

          <ButtonsComponent btnType='Success' btnDisabled={!this.state.formIsValid} >ORDER</ButtonsComponent>
        </form>
      );
    }

    return (
      <React.Fragment>
        <div className={CssClasses.ContactData}>
          <h4>Your Burger is just ${(+this.props.totalPrice).toFixed(2)}</h4>
          <h4>Enter yout Contact Information</h4>

          {elem}
        </div>
      </React.Fragment>
    );
  }
}

export default ContactDataComponent;