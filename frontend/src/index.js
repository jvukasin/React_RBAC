import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import history from './util/history';

axios.interceptors.response.use( (response) => {
  // Return a successful response back to the calling service
  return response;
  }, (error) => {
    if(error.response.status === 401) {
      localStorage.removeItem('currentUser');
      alert("Please log in.");
      history.push('/');
    } else {
      return Promise.reject(error);
    }
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
