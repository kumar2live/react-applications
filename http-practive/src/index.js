import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization']= 'AUTH TOKEN';
axios.defaults.headers.common['Content-Type']= 'application/json';

axios.interceptors.request.use((config) => {
  return config;
}, (err) => {
  return Promise.reject(err);
});

const errorInterceptor = axios.interceptors.response.use((config) => config, (err) => {
  return Promise.reject(err);
});
axios.interceptors.response.eject(errorInterceptor);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
