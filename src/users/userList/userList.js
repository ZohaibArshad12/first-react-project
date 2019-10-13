import React, { Component } from "react";
import { UserItem } from "../user-item";
import "./userList.css";
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes'
import { Alert, Spinner, Table } from "react-bootstrap";
import { onFetchUsers } from '../../store/actions/authActions';

// class UserModel{
// firstName;
// middleName;
// lastName;
// address;
// postalCode;

// constructor(data){
//   this.firstName = data.firstName;
//   this.middleName = data.middleName;
//   this.lastName = data.lastName;
//   this.address =data.address;
//   this.postalCode = data.postalCode;
// }
// }


class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {

      isLoading: true
    };
  }

  componentDidMount() {
    this.props.onUserLoadingFromApi(true);
    this.fetchData();
  }


  fetchData = () => {
    this.props.onUserLoadingFromApi();
  };

  removeUser(index) {
    const users = [...this.state.users];
    users.splice(index, 1);
    this.setState({
      users: users
    });
  }

  tableHeader = (
    <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
    </tr>
  </thead>
    // <div className='table-row'>
    //   <span className='table-header-item'>First Name</span>
    //   <span className='table-header-item'>Last Name</span>
    //   <span className='table-header-item'>Email</span>
    // </div>
  );


  render() {

    if (this.props.loading) {
      return (
        <div>
          <Alert variant='info'>
            Loading Data
          </Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      )
    }
    else {
      return (
        <div>

        <Table striped bordered hover variant="dark" size='sm'>
          {this.tableHeader}

            {this.props.users.map((user, index) => {
              return (
                <UserItem
                  key={index}
                  user={user}
                  deleteUser={() => this.removeUser(index)}
                />
              );
            })}

          </Table>
        </div>
        
      );
    }
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLoadedFromApi: (users) => dispatch({ type: actionTypes.LOADED_USERS_FROM_API, users: users }),
    onUserLoadingFromApi: () => dispatch(onFetchUsers()),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
