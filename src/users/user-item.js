import React, { Component } from "react";
import "./user.css";


export class UserItem extends Component {

  itemClickHandler() {
    // console.log('item clicked', event.target.value);
    console.log('propsss = ', this.props);

  }

  render() {
    
    return (

      <tbody>
      <tr>
        {/* <td>{this.props.user._id}</td> */}

        <td></td>
        <td>{this.props.user.firstName}</td>
        <td>{this.props.user.lastName}</td>
        <td>{this.props.user.email}</td>
      </tr>
    </tbody>

    );
  }
}
