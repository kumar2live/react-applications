import React, { useState, useEffect } from 'react';

import ModelComponent from '../../Components/UIElments/Model/ModelComponent';
import Aux from '../Aux';

const WithErrorHandlerComponent = (WrappedComponent, axios) => {
  // WithErrorHandlerComponent
  return props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, seterror] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      seterror(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use((res) => res, (errorRef) => {
      seterror(errorRef);
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    const errorActionHandler = () => {
      seterror(null);
    }
    
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