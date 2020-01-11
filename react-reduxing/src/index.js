import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import reducer from './Store/reducer';
import counterReducer from './Store/reducers/counterReducer';
import resultsReducer from './Store/reducers/resultsReducer';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
})

const storeRef = createStore(rootReducer);

ReactDOM.render(<Provider store={storeRef}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
