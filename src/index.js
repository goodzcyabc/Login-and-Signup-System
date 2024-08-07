import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./router"
import { Provider } from "react-redux"
import store from './store';
import { SET_USER, REACT_REDUX_LOCAL } from './constants';

/**
 * judge local login state
 */
if (localStorage.getItem(REACT_REDUX_LOCAL)) {
  store.dispatch({
    type: SET_USER,
    user: JSON.parse(localStorage.getItem(REACT_REDUX_LOCAL))
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);

