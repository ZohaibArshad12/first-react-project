import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import { UserItem } from "./user-item";
import "./user.css";
import UserList from "./userList/userList";
import NewUser from "./newUser/newUser";
import { Navbar, Nav } from "react-bootstrap"
import Login from "../login/login";

export class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [

      ],
      isLoading: false
    };
  }

  addUser(user) {
    const users = [...this.state.users];
    // users.push({ 'firstName': this.state.firstName, 'middleName': this.state.middlename, 'lastName': this.state.lastname, 'postalCode': this.state.postalCode, 'address': this.state.address });
    users.push(user);
    this.setState({
      users: users
    });
  }
  // addUser() {
  //   const users = [...this.state.users];
  //   users.push({ 'firstName': this.state.firstName, 'middleName': this.state.middlename, 'lastName': this.state.lastname, 'postalCode': this.state.postalCode, 'address': this.state.address });
  //   this.setState({
  //     users: users
  //   });
  // }

  render() {
    return (
      <div >
        {/* <div classsName='nav'>
          <header className="header">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to={{
                  pathname: '/new-user',
                  hash: '#submit',
                  search: '?quick-submit=true'
                }}>New User</Link></li>
              </ul>
            </nav>
          </header>
        </div> */}

        <Navbar bg="dark" variant='dark' >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="users-list">Users List</Nav.Link>
              <Nav.Link href="new-user">New User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Route path="/" exact component={UserList} />
        <Route path="/users-list" exact component={UserList} />
        <Route path="/new-user" component={NewUser} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}
export default Users;
