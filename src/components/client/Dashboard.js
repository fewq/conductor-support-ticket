import React, { Component } from "react";
import NavBar from "./NavBar.js";

export default class ClientDashboard extends Component {
  render() {
    return (
      <div>
        <NavBar props={this.props} />
      </div>
    );
  }
}
