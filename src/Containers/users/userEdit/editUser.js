import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes'
import './editUser.css';
import axios from '../../../axios';
import { Button, FormGroup, FormControl, FormLabel, Alert, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class EditUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    isLoading: false,
    userEdited: 0,
    redirect: false
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditingUser: false,
      userToEdit:null,
      isLoading: true
    };
  }

  validateForm() {
    return  this.state.firstName.length > 0 && this.state.lastName.length > 0;
  }

  componentDidMount() {




    
    const user = {...this.props.user};
    this.setState({firstName: user.firstName, lastName: user.lastName, email: user.email});
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  editUser = () => {
    this.setState({ isLoading: true });
    axios.put(`users/${this.props.user._id}`, { email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName }).then(response => {

      if (response.status === 200) {
        this.setState({ isLoading: false, userEdited: 1 });
        setTimeout(() => {
          this.props.editingDone();
        }, 3000)

      } else {
        console.log((`Adding User Error, Status Code: ${response.status} , Status Text : ${response.statusText}`));
        this.setState({ isLoading: false, userEdited: 2 });
        setTimeout(() => {this.setState({  userEdited: 0 })}, 3000)
      }
    }).catch(err => {
      console.log('Error Getting Users : ', err);
      this.setState({ isLoading: false, userEdited: 2 });
      setTimeout(() => {this.setState({  userEdited: 0 })}, 3000)
      
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
          Editing User
          </Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      )
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
    if (!this.state.isLoading && this.state.userEdited === 2 ) {
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
          <Button
            block
            disabled={!this.validateForm()}
            onClick = {  this.props.editingDone }
          >
            Cancel
          </Button>
          <Button
            block
            disabled={!this.validateForm()}
            onClick={this.editUser}
          >
            Edit User
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

  return {
    onuserEdited: (newUsers) => dispatch({ type: actionTypes.NEW_USER_ADDED, newUsers }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);