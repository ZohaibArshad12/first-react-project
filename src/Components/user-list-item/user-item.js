import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./user.css";


export class UserItem extends Component {


  itemClickHandler() {
    // console.log('item clicked', event.target.value);
    console.log('propsss = ', this.props);
    console.log('key = ', this.props.getKey);
  
  }


  render() {

    return (

      <tbody>
      <tr 
      // className='table-row-pointer'  onClick = {  this.props.editUser } 
      >
      
        <td>{this.props.index}</td>
        <td>{this.props.user.firstName}</td>
        <td>{this.props.user.lastName}</td>
        <td>{this.props.user.email}</td>
      </tr>
    </tbody>

    );
  }
}
