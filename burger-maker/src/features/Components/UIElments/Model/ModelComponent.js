import React, { Component } from 'react';

import CssClasses from './Model.module.css';
import BackDropComponent from '../BackDrop/BackDropComponent';

class ModelComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.showModal !== this.props.showModal) || (nextProps.children !== this.props.children);
  }

  componentDidUpdate() {
    console.log('ModelComponent componentDidUpdate');
  }

  render() {
    return (
      <div>
        <BackDropComponent show={this.props.showModal} backDropClicked={this.props.modalClosed}/>
        <div style={{
                transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.showModal ? '1' : '0'
              }} 
              className={CssClasses.Modal}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ModelComponent;