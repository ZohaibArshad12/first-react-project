import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NewUser from "./Containers/users/newUser/newUser";
import AppNavbar from "./Containers/navbar/appNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import userList from "./Containers/users/userList/userList";
import Login from "./Containers/login/login";
import SignUp from "./Containers/signup/signup";
import EditProfile from "./Containers/users/editProfile/editProfile";
import ProductsList from "./Containers/products/productsList/products";
import AddProducts from "./Containers/products/addProduct/addproduct";

class App extends Component {
  componentDidMount() {
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/sign-up" exact component={SignUp}></Route>
        <Route path="/" exact component={Login}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );

    // console.log("App.js isAuthenticated", this.props.isAuthenticated);

    if (this.props.isAuthenticated) {
      // console.log("App.js Authenticated");

      routes = (
        <div>
          <AppNavbar>
          </AppNavbar>
          <Switch>
            <Route path="/new-user" component={NewUser}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/edit-profile" component={EditProfile}></Route>
            <Route path="/products-list" component={ProductsList}></Route>
            <Route path="/add-product" component={AddProducts}></Route>
            <Route path="/*" exact component={userList}></Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </div>
      );
    }

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};


export default withRouter(
  connect(
    mapStateToProps  )(App)
);
