import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import thunk from 'redux-thunk'

axios.defaults.baseURL = "https://user-products.herokuapp.com/api/";
axios.defaults.headers.common["x-auth-token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3ZTkxYjdmNDdkMTAwMTdmNTZiNGYiLCJuYW1lIjoiTWFqaWQgSGFzaG1pIiwiaWF0IjoxNTcwMjM2Njk5fQ.zTmB5rODixYNfpoHHZn9Io4XMBC_KAisp09dAsf802M";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  request => {
    console.log("Axios req interceptor : ", request);
    // Edit request config
    return request;
  },
  error => {
    console.log("req error = ", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log("Axios response interceptor : ", response);
    // Edit request config
    return response;
  },
  error => {
    console.log("Res error = ", error);
    return Promise.reject(error);
  }
);

const store = createStore(reducer, applyMiddleware(thunk));
// const store = createStore(reducer);

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
