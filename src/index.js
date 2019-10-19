import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk'
import axios from './axios';


const store = createStore(reducer, applyMiddleware(thunk));

axios.interceptors.request.use(
  request => {

    request.headers["x-auth-token"] = store.getState().token ? store.getState().token : "";

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    
    return response;
  },
  error => {
    console.log("Res error = ", error);
    return Promise.reject(error);
  }
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
