import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as ActionTypes from '../../../store/actions/index';

import ButtonsComponent from '../../Components/UIElments/Buttons/Buttons';
import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import InputComponent from '../../Components/UIElments/Input/Input';

import { checkValidity } from '../../../shared/utility';

import CssClasses from './AuthComponent.module.css';

class AuthComponent extends Component {
  state = {
    controls: {
      email: {
        name: 'Email: ',
        elemType: 'input',
        elemConfig: {
          type: 'email', placeholder: 'User name',
        },
        value: 'test@test.com',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        name: 'Password: ',
        elemType: 'input',
        elemConfig: {
          type: 'password', placeholder: 'Password',
        },
        value: 'testing',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: false,
  }

  componentDidMount() {
    if (!this.props.isBurgerBuilding && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  toggleIsSignUp = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  formChangedHanleder = (event, input) => {
    const {value} = event.target;
    const updatedControls = {
      ...this.state.controls,
      [input]: {
        ...this.state.controls[input],
        value: value,
        valid: checkValidity(value, this.state.controls[input].validation),
        touced: true,
      }
    }

    this.setState({controls: updatedControls});
  }

  propertyChangedHandler = (event, inputIdentifier) => {
    const {value} = event.target;
    const updatedOrderForm = {...this.state.controls};
    const updatedOrderElem = {...updatedOrderForm[inputIdentifier]};
    updatedOrderElem.value = value;
    updatedOrderElem.touched = true;
    updatedOrderElem.valid = checkValidity(updatedOrderElem.value , updatedOrderElem.validation)

    updatedOrderForm[inputIdentifier] = updatedOrderElem;
    
    let formValidity = true;
    for (let elems in updatedOrderForm) {
      formValidity = (updatedOrderForm[elems].valid && formValidity);
    }

    this.setState({
      controls: updatedOrderForm, formIsValid: formValidity,
    })
  }

  render () {
    const formElemArr = [];
    for(let key in this.state.controls) {
      formElemArr.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    let form = formElemArr.map((formElem) => {
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
    })

    if (this.props.loading) {
      form = (<SpinnerComponent />);
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
      <p style={{color: '#ff1407'}}>{this.props.error.message}</p>
      );
    }

    return (
      <React.Fragment>
        <div style={{textAlign: 'center'}}>Prefilled to ease access, feel free to create new account by registering</div>
        <div className={CssClasses.Auth}>
          {authRedirect}
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {form}
            <ButtonsComponent btnType='Success'> {this.state.isSignUp ? 'Register' : 'Login'} </ButtonsComponent>
            {/* <ButtonsComponent btnType='Success' btnDisabled={!this.state.formIsValid} >Go !</ButtonsComponent> */}
          </form>
          <ButtonsComponent btnType='Danger' btnClicked={this.toggleIsSignUp}>
            Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'} !</ButtonsComponent>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBurgerBuilding: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(ActionTypes.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(ActionTypes.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);