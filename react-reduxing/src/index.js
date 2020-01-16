import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
// import reducer from './Store/reducer';
import counterReducer from './Store/reducers/counterReducer';
import resultsReducer from './Store/reducers/resultsReducer';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
})

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware] next state', store.getState())
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeRef = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, ReduxThunk)));

ReactDOM.render(<Provider store={storeRef}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
