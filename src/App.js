import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Login from "./login/login";
import { connect } from "react-redux";
import NewUser from "./users/newUser/newUser";
import AppNavbar from "./navbar/appNavbar";
import UserList from "./users/userList/userList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./signup/signup";

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
            <Route path="/users-list" exact component={UserList}></Route>
            <Route path="/" exact component={UserList}></Route>
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
