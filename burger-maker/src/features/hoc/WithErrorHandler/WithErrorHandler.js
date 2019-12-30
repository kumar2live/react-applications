import React, { Component } from 'react';

import ModelComponent from '../../Components/UIElments/Model/ModelComponent';
import Aux from '../Aux';

const WithErrorHandlerComponent = (WrappedComponent, axios) => {
  
  return class WithErrorHandlerComponent extends Component {
    state = {
      error: null,
    }

    componentWillUnmount() {
      console.log('componentWillUnmount -- ', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use((res) => res, (errorRef) => {
        this.setState({error: errorRef});
      });
    }

    errorActionHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <ModelComponent modalClosed={this.errorActionHandler} showModal={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </ModelComponent>

          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
}

export default WithErrorHandlerComponent;