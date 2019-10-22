import React, { useState, useEffect } from "react";
import "./userList.css";
import { Alert, Spinner, Table } from "react-bootstrap";
import { UserItem } from "../../../Components/user-list-item/user-item";
import axios from "../../../axios";


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


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [formState, setformState] = useState("");

  useEffect(() => {
    setformState("loading");
    axios
      .get("users")
      .then(response => {
        if (response.status === 200) {
          const users = [...response.data];
          setUsers(users);
          setformState("");
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
  }, []);

  switch (formState) {
    case "loading":
      return (
        <div>
          <Alert variant="info">Loading Users</Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      );
    case "error":
      return (
        <div>
          <Alert variant="danger">Error While Loading Users</Alert>
        </div>
      );
    default:
      return (
        <div>
          <RenderList users={users} />
        </div>
      );
  }
};

const RenderList = ({ users }) => {
  return (
    <div>
      <Table striped bordered hover variant="dark" size="sm">
        <TableHeader />

        {users.map((user, index) => {
          return (
            <UserItem
            key={user._id}
            index = {index}
            user={user}
            // deleteUser={() => this.removeUser(index)}
            // editUser={() => this.editUser(user)}
          />
          );
        })}
      </Table>
    </div>
  );
};


const TableHeader = () =>{
  return (
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
    </tr>
  </thead>
  );
}

export default UserList;