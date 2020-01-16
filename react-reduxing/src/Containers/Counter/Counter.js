import React, { Component } from 'react';

import { connect } from 'react-redux';

import CounterControl from '../../Components/CounterControl/CounterControl';
import CounterOutput from '../../Components/CounterOutput/CounterOutput';

import * as actionCreators from '../../Store/actions/index';

class Counter extends Component {

  render() {
    const listStyles = {
      cursor: 'pointer', padding: '10px', margin: '5px 0',
      boxSizing: 'border-box',
      boxShadow: '0px 1px 2px #3f67fa'
    }

    console.log(this.props);

    return (
      <div>
        <CounterOutput value={this.props.cntr}/>

        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 50" clicked={() => this.props.onAddFiveCounter(55)} />
        <CounterControl label="Subtract 5" clicked={this.props.onSubFiveCounter} />

        <hr />

        <button onClick={() => this.props.onStoreResult(this.props.cntr)}
          style={{padding: '1rem', borderRadius: '0.5rem', outline: 'none'}}> Store Results </button>
        
          <ul style={{listStyle: 'none'}}>
            {this.props.storedResults.map((strRes) => {
              return (
                <li 
                style={listStyles} 
                key={strRes.id} 
                onClick={() => this.props.onDeleteResult(strRes.id)}> {strRes.value}</li>
              );
            })}
          </ul>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cntr: state.ctr.counter, storedResults: state.res.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment()),
    onDecrementCounter: () => dispatch(actionCreators.decrement()),
    onAddFiveCounter: (val) => dispatch(actionCreators.addfive(val)),
    onSubFiveCounter: () => dispatch(actionCreators.subfive(5)),
    onStoreResult: (result) => dispatch(actionCreators.storeresult(result)),
    onDeleteResult: (id) => dispatch(actionCreators.deleteresult(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Counter);
// if you dont want to get reducer 
// export default connect(null, mapDispatchToProps) (Counter);
