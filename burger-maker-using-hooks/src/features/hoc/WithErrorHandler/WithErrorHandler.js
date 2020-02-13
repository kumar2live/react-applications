/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import ModelComponent from '../../Components/UIElments/Model/ModelComponent';
import Aux from '../Aux';

import useErrorHandler from '../../../hooks/errorHandler';

const WithErrorHandlerComponent = (WrappedComponent, axios) => {
  // WithErrorHandlerComponent
  return props => {
    const [error, errorActionHandler] = useErrorHandler(axios);

    return (
      <Aux>
        <ModelComponent modalClosed={errorActionHandler} showModal={error}>
          {error ? error.message : null}
        </ModelComponent>

        <WrappedComponent {...props}/>
      </Aux>
    );
  }
}

export default WithErrorHandlerComponent;