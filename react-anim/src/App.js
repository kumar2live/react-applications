import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import './App.css';

import Modal from "./components/modal/modal";
import Backdrop from "./components/backdrop/backdrop";
import List from "./components/list/list";


class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  }

  showModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render () {

    return (
      <div className="App">
        <h1> React Animations </h1>

        <button className="Button" onClick={() => this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button>
        {/* {this.state.showBlock ? (
          <div style={{
              backgroundColor: '#511850',
              margin: 'auto',
              width: 100,
              height: 100 }}></div>) : null} */}

        <Transition 
          onEnter={() => console.log('OnEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
          in={this.state.showBlock} timeout={300} mountOnEnter unmountOnExit>
          {state => (
            <div style={{
              transition: 'opacity 1s ease-out',
              opacity: state === 'exiting' ? 0 : 1,
              backgroundColor: '#347568',
              margin: 'auto',
              width: 100,
              height: 100 }}></div>
          )}
           
        </Transition>

        {/* <Transition in={this.state.modalIsOpen} timeout={300} mountOnEnter unmountOnExit>
          {state => (
            <Modal closed={this.closeModal} show={state}/>
          )}
           
        </Transition> */}

        <Modal closed={this.closeModal} show={this.state.modalIsOpen}/>
        {this.state.modalIsOpen ? <Backdrop show={this.state.modalIsOpen}/> : null}

        <hr />
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
