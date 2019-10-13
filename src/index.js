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
    console.log('token = ', store.getState().token);
    
    // axios.defaults.headers.common["x-auth-token"] = store.getState().token ;
    // axios.defaults.headers.common["x-auth-token"] = store.getState().token ? store.getState().token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3ZTkxYjdmNDdkMTAwMTdmNTZiNGYiLCJuYW1lIjoiTWFqaWQgSGFzaG1pIiwiaWF0IjoxNTcwMjM2Njk5fQ.zTmB5rODixYNfpoHHZn9Io4XMBC_KAisp09dAsf802M";
    axios.defaults.headers["x-auth-token"] ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3ZTkxYjdmNDdkMTAwMTdmNTZiNGYiLCJuYW1lIjoiTWFqaWQgSGFzaG1pIiwiaWF0IjoxNTcwMjM2Njk5fQ.zTmB5rODixYNfpoHHZn9Io4XMBC_KAisp09dAsf802M';

    return request;
  },
  error => {
    console.log("Axios request error = ", error);
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
