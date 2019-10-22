/*
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes'
import './newUser.css';
import axios from '../../../axios';
import { Button, FormGroup, FormControl, FormLabel, Alert, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class NewUser extends Component {
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

  componentDidMount() {
    console.log(this.props);    
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

        <h1 className='heading'> Add User </h1>

        <form className='add-new-user'>
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
            Add User
          </Button>
        </form>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  console.log('Login mapDispatchToProps called');

  return {
    onNewUserAdded: (newUsers) => dispatch({ type: actionTypes.NEW_USER_ADDED, newUsers }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);

*/

import React, { useState } from "react";
import axios from "../../../axios";
import { Button, Badge, Spinner, Alert } from "react-bootstrap";
import "./newUser.css";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const NewUser = () => {
  const [formState, setformState] = useState("");

  const handleSubmit = values => {
    setformState("loading");
    axios.post('users', { email: values.email, password: values.password, firstName: values.firstName, lastName: values.lastName })
      .then(response => {
        if (response.status === 200) {
          setformState("successfull");
          setTimeout(() => {
            setformState("redirect");
          }, 2000);
        } else {
          setformState("error");
          setTimeout(() => {
            setformState("");
          }, 2000);
        }
      })
      .catch(err => {
        setformState("error");
        setTimeout(() => {
          setformState("");
        }, 2000);
      });
  };

  switch (formState) {
    case "loading":
      return (
        <div>
          <Alert variant="info">Adding User</Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      );
    case "redirect":
      return (
        <div>
          <Redirect to="/"></Redirect>
        </div>
      );
    case "successfull":
      return (
        <div>
          <Alert variant="success">User Added Successfully</Alert>
        </div>
      );
    case "error":
      return (
        <div>
          <Alert variant="danger">Error While Adding User</Alert>
        </div>
      );
    default:
      return <AddUserForm handleSubmit={handleSubmit}/>;
  }
};

const AddUserForm = ({ handleSubmit }) => {
  return (
    <div className="product-form">
      <h1>
        <Badge variant="primary" className="mb-5">
          New User
        </Badge>
      </h1>

      <Formik
        initialValues={{ firstName: "",lastName: "", email: "", password:"" }}
        validate={values => {
          let errors = {};
          if (!values.firstName) {
            errors.name = "First Name Required";
          } else if (!values.lastName) {
            errors.price = "Last Name Required";
          }
            if (!values.email) {
              errors.email = "Email Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (!values.password) {
              errors.password = "Password Required";
            }
          
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
              className={
                errors.firstName && touched.firstName ? "text-input error" : "text-input"
              }
            />
            <ErrorMessage
              name="lastName"
              render={msg => <div className="error-message">{msg}</div>}
            />
            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={
                errors.lastName && touched.lastName ? "text-input error" : "text-input"
              }
            />
            <ErrorMessage
              name="lastName"
              render={msg => <div className="error-message">{msg}</div>}
            />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={
                errors.email && touched.email
                  ? "text-input error"
                  : "text-input"
              }
            />
            <ErrorMessage  name="email" render={msg => <div className='error-message'>{msg}</div>} />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={
                errors.password && touched.password
                  ? "text-input error"
                  : "text-input"
              }
            />
            <ErrorMessage name="password" component="div" className='error-message' />
            <Button
              block
              disabled={isSubmitting || Object.keys(errors).length}
              type="submit"
              className="submit-button"
            >
              Add User
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewUser;
