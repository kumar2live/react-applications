const redux = require('redux');
const createStore = redux.createStore;

const initialStateRef = {
  counter: 0,
}

// Reducers
const rootReducerRef = (currentState = initialStateRef, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...currentState,
        counter: currentState.counter + 1,
      };
    case 'ADD_COUNTER':
      return {
        ...currentState,
        counter: currentState.counter + action.value,
      }
  }
  return currentState;
};

// Store
const storeRef = createStore(rootReducerRef);

// Subscription
storeRef.subscribe(() => {
  console.log('[Subscription] -- ', storeRef.getState() );
});

// Actions
storeRef.dispatch({type: 'INCREMENT'});
storeRef.dispatch({type: 'ADD_COUNTER', value: 10});
storeRef.dispatch({type: 'INCREMENT'});

