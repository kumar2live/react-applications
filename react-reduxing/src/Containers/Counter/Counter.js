import React, { Component } from 'react';

import { connect } from 'react-redux';

import CounterControl from '../../Components/CounterControl/CounterControl';
import CounterOutput from '../../Components/CounterOutput/CounterOutput';

class Counter extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <CounterOutput value={this.props.cntr}/>

        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 50" clicked={() => this.props.onAddFiveCounter(55)} />
        <CounterControl label="Subtract 5" clicked={this.props.onSubFiveCounter} />

        <hr />

        <button onClick={this.props.onStoreResult}
          style={{padding: '1rem', borderRadius: '0.5rem', outline: 'none'}}> Store Results </button>
        <ul>
          {this.props.storedResults.map((strRes) => {
            return (
              <li 
              style={{cursor: 'pointer'}} 
              key={strRes.id} 
              onClick={this.props.onDeleteResult}> {strRes.value}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cntr: state.counter, storedResults: state.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
    onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
    onAddFiveCounter: (val) => dispatch({type: 'ADD_FIVE', value: val}),
    onSubFiveCounter: () => dispatch({type: 'SUB_FIVE', value: 5}),
    onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
    onDeleteResult: () => dispatch({type: 'DELETE_RESULT'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Counter);
// if you dont want to get reducer 
// export default connect(null, mapDispatchToProps) (Counter);
