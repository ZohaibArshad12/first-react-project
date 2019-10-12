import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Badge, Spinner } from "react-bootstrap";
import "./login.css";
import { Link } from 'react-router-dom';
import axios from '../axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../store/actions/actionTypes'
import { Alert } from "react-bootstrap";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    this.setState({ isLoading: true });
    axios.post('auth', { email: this.state.email, password: this.state.password }).then(response => {

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);
        this.setState({ isLoading: false });
        this.props.onUserLoggedIn(token);
      } else {
        alert(`Getting Users Error, Status Code: ${response.status} , Status Text : ${response.statusText}`)
        this.setState({ isLoading: false, error: true });
        setTimeout(() => {this.setState({  error: false })}, 2000)
      }
    }).catch(err => {
      this.setState({ isLoading: false, error: true });
        setTimeout(() => {this.setState({  error: false })}, 2000)
      console.log('Error Getting Users : ', err);
    })
    event.preventDefault();
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div>
        <Alert variant='primary'>
          Logging in
        </Alert>
        <Spinner animation="grow" variant="info" />
        </div>
      )
    }
    if (!this.state.isLoading && this.state.error) {
      return (
        <Alert variant='danger'>
          Error Logging in Please Try Again
        </Alert>
        
      )
    }
    else {

      if (!this.props.token) {

        return (
          <div className="Login">
            
            <h1><Badge variant='primary' className='mb-5' >Login</Badge></h1>

            <form >
              <FormGroup controlId="email" >
                <FormLabel> Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  autoComplete='true'
                />
              </FormGroup>
              <FormGroup controlId="password" >
                <FormLabel> Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  autoComplete='true'
                />
              </FormGroup>
              <Button
                block
                disabled={!this.validateForm()}
                onClick={this.handleSubmit}
              >
                Login
          </Button>
            </form>

          <div className='mt-4'>
            OR
            <Link className='link sign-up-link m-2' to="/sign-up">Sign up</Link>
            to create your account
          </div>
          </div>
        );
      } else {
        return (
          <div>
            <Redirect to="/"></Redirect>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  console.log('Login mapDispatchToProps called');

  return {
    onUserLoggedIn: (token) => dispatch({ type: actionTypes.AUTH_LOGIN_SUCCESSFULL, token: token }),
    // onUserLoadingFromApi: (loading) => dispatch({ type: actionTypes.LOADING_USERS_FROM_API, loading: loading }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);