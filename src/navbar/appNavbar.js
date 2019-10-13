import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './appNavbar.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes'

class AppNavbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }
  
  logoutClicked = () => {
    localStorage.clear();
    
    this.props.onUserLoggedOut();
  }

  render() {
    
    return (
      <div className='navBar'>
        <Navbar bg="dark" variant='dark'sticky="top" >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className='link ' to="/users-list">Users List</Link>
              <Link className='link ml-4' to="/new-user">New User</Link>
              
              {/* <Nav.Link href="users-list">Users List</Nav.Link>
              <Nav.Link href="new-user">New User</Nav.Link> */}
            </Nav>
            <Nav >
              <Nav.Link className='logout' onClick={this.logoutClicked} >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLoggedOut: () => dispatch({ type: actionTypes.AUTH_LOGOUT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);