import React, { Component } from 'react';
import './editProfile.css';
import axios from '../../../axios';
import { Button, FormGroup, FormControl, FormLabel, Alert, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    _id: '',
    isLoading: false,
    userEdited: 0,
    redirect: false,
    error: false
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditingUser: false,
      userToEdit: null,
      isLoading: true
    };
  }

  validateForm() {
    return this.state.firstName.length > 0 && this.state.lastName.length > 0;
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get('users/me').then(response => {
      if (response.status === 200) {
        const user = { ...response.data };
        this.setState({ firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id, isLoading: false });

      } else {
        alert(`Getting Users Error, Status Code: ${response.status} , Status Text : ${response.statusText}`)
        this.setState({ isLoading: false, error: true });
        setTimeout(() => {
          this.setState({ error: false });
        }, 2000);
      }
    }).catch(err => {
      this.setState({ isLoading: false, error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
      console.log('Error Getting Users Me : ', err);
    })


  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  editUser = () => {
    this.setState({ isLoading: true });
    axios.put(`users/${this.state._id}`, { email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName }).then(response => {

      if (response.status === 200) {
        this.setState({ isLoading: false, userEdited: 1 });
        setTimeout(() => {
          this.setState({ userEdited: 0 });
        }, 2000)

      } else {
        console.log((`Adding User Error, Status Code: ${response.status} , Status Text : ${response.statusText}`));
        this.setState({ isLoading: false, userEdited: 2 });
        setTimeout(() => { this.setState({ userEdited: 0 }) }, 2000)
      }
    }).catch(err => {
      console.log('Error Getting Users : ', err);
      this.setState({ isLoading: false, userEdited: 2 });
      setTimeout(() => { this.setState({ userEdited: 0 }) }, 2000)

    })
  }

  render() {
    // Loading for adding user
    if (this.state.redirect) {
      return (<div> <Redirect to="/"></Redirect></div>)
    }
    if (this.state.isLoading) {
      return (

        <div>
          <Alert variant='info'>
            Editing User
          </Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      )
    }
    if (!this.state.isLoading && this.state.error) {
      return <Alert variant="danger">Error Getting User Please Try Later</Alert>;
    }
    // User added now redirecting to list
    if (!this.state.isLoading && this.state.userEdited === 1) {
      return (
        <div>
          <Alert variant='success'>
            User Edited Successfully
          </Alert>
        </div>
      )
    }
    if (!this.state.isLoading && this.state.userEdited === 2) {
      return (
        <div>
          <Alert variant='danger'>
            Error While Editing User
          </Alert>
        </div>
      )
    }

    // displaying form to add user
    return (

      <div>

        <h1 className='heading'> Edit User </h1>

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
          <FormGroup controlId="lastName" >
            <FormLabel> Email</FormLabel>
            <FormControl
              disabled
              value={this.state.email}
              type="text"
              autoComplete='true'
              onChange={this.handleChange}
            />
          </FormGroup>
          <div className = 'mt-4 btn-section'>
          <Button
            disabled={!this.validateForm()}
            onClick = { () => this.setState({redirect: true}) }
          >
            Cancel
          </Button>
          <Button
            disabled={!this.validateForm()}
            onClick={this.editUser}
          >
            Edit User
          </Button>
          </div>
        </form>

      </div>
    );
  }
}

export default (EditProfile);