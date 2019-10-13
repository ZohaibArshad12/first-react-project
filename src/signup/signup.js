import React, { Component } from 'react';
import axios from '../axios';
import {Form, Button, FormGroup, FormControl, FormLabel, Alert, Badge, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import './signup.css';
import { Link } from "react-router-dom";


class SignUp extends Component {
  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    postalCode: 0,
    isLoading: false,
    newUserAdded: 0,
    redirect: false
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 &&
      this.state.firstName.length > 0 && this.state.lastName.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addUser = () => {
    this.setState({ isLoading: true });
    axios.post('users', { email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName }).then(response => {

      if (response.status === 200) {
        this.setState({ isLoading: false, newUserAdded: 1 });
        setTimeout(() => {this.setState({ redirect: true })}, 3000)

      } else {
        console.log((`Adding User Error, Status Code: ${response.status} , Status Text : ${response.statusText}`));
        this.setState({ isLoading: false, newUserAdded: 2 });
        setTimeout(() => {this.setState({  newUserAdded: 0 })}, 3000)
      }
    }).catch(err => {
      console.log('Error Getting Users : ', err);
      this.setState({ isLoading: false, newUserAdded: 2 });
      setTimeout(() => {this.setState({  newUserAdded: 0 })}, 3000)
      
    })
  }

  render() {
// Loading for adding user
if(this.state.redirect) {
  return( <div> <Redirect to="/"></Redirect></div>)
}
    if (this.state.isLoading) {
      return (

        <div>
          <Alert variant='info'>
          Adding User
          </Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      )
    }
    // User added now redirecting to list
    if (!this.state.isLoading && this.state.newUserAdded === 1) {
      return (
        <div>
          <Alert variant='success'>
            User Added Successfully
          </Alert>
        </div>
      )
    }
    if (!this.state.isLoading && this.state.newUserAdded === 2 ) {
      return (
        <div>
          <Alert variant='danger'>
            Error While Adding User
          </Alert>
        </div>
      )
    }

// displaying form to add user
    return (


      <div>

        {/* <h1 className='heading'> Sign Up </h1> */}

        <h1><Badge variant="secondary">Sign Up</Badge></h1>

           <Form className='add-new-user'>
          <FormGroup controlId="firstName" >
            <FormLabel> First Name</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              autoComplete='true'
              onChange={this.handleChange}

            />
          </FormGroup>
          <FormGroup controlId="lastName" >
            <FormLabel> Last Name</FormLabel>
            <FormControl
              value={this.state.lastName}
              type="text"
              autoComplete='true'
              onChange={this.handleChange}

            />
          </FormGroup>
          <FormGroup controlId="email" >
            <FormLabel> Email</FormLabel>
            <FormControl
              type="email"
              value={this.state.email}
              autoComplete='false'
              onChange={this.handleChange}

            />
          </FormGroup>
          <FormGroup controlId="password" >
            <FormLabel> Password</FormLabel>
            <FormControl
              value={this.state.password}
              type="password"
              onChange={this.handleChange}

            />
          </FormGroup>
          <Button
            block
            disabled={!this.validateForm()}
            onClick={this.addUser}
          >
            Sign Up
          </Button>
        </Form>

        <div className='mt-4'>
            Already Have an Account
            <Link className='link login-link m-2' to="/">Login</Link>
          </div>

      </div>
    );
  }
}

export default SignUp;