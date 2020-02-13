import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as ActionTypes from '../../../store/actions/index';

import ButtonsComponent from '../../Components/UIElments/Buttons/Buttons';
import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import InputComponent from '../../Components/UIElments/Input/Input';

import { checkValidity } from '../../../shared/utility';

import CssClasses from './AuthComponent.module.css';

const AuthComponent = (props) => {
  const [controls, setcontrols] = useState({
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
  })
  const [isSignUp, setisSignUp] = useState(false);

  const { isBurgerBuilding, authRedirectPath, onSetAuthRedirectPath } = props;
  useEffect(() => {
    if (!isBurgerBuilding && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [isBurgerBuilding, authRedirectPath, onSetAuthRedirectPath]);

  const toggleIsSignUp = () => {
    setisSignUp(!isSignUp);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  }

  const formChangedHanleder = (event, input) => {
    const {value} = event.target;
    const updatedControls = {
      ...controls,
      [input]: {
        ...controls[input],
        value: value,
        valid: checkValidity(value, controls[input].validation),
        touced: true,
      }
    }

    setcontrols(updatedControls);
  }

  const propertyChangedHandler = (event, inputIdentifier) => {
    const {value} = event.target;
    const updatedOrderForm = {...controls};
    const updatedOrderElem = {...updatedOrderForm[inputIdentifier]};
    updatedOrderElem.value = value;
    updatedOrderElem.touched = true;
    updatedOrderElem.valid = checkValidity(updatedOrderElem.value , updatedOrderElem.validation)

    updatedOrderForm[inputIdentifier] = updatedOrderElem;
    
    let formValidity = true;
    for (let elems in updatedOrderForm) {
      formValidity = (updatedOrderForm[elems].valid && formValidity);
    }

    setcontrols(updatedOrderForm);
  }

  const formElemArr = [];
  for(let key in controls) {
    formElemArr.push({
      id: key,
      config: controls[key],
    });
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
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
        propertyChanged={(e) => {propertyChangedHandler(e, formElem.id)}}
      />
    );
  })

  if (props.loading) {
    form = (<SpinnerComponent />);
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
    <p style={{color: '#ff1407'}}>{props.error.message}</p>
    );
  }

  return (
    <React.Fragment>
      <div style={{textAlign: 'center'}}>Prefilled to ease access, feel free to create new account by registering</div>
      <div className={CssClasses.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <ButtonsComponent btnType='Success'> {isSignUp ? 'Register' : 'Login'} </ButtonsComponent>
        </form>
        <ButtonsComponent btnType='Danger' btnClicked={toggleIsSignUp}>
          Switch To {isSignUp ? 'Sign In' : 'Sign Up'} !</ButtonsComponent>
      </div>
    </React.Fragment>
  );
  
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