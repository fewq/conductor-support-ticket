import React, { Component } from "react";
import { timingSafeEqual } from "crypto";
import Dashboard from './form/Dashboard.js';
import "bootstrap/dist/css/bootstrap.min.css";

class Restricted extends Component {
  state = {};
  render() {
    return (
      <div class="container">
        <h2>RESTRICTED AREA</h2>
        <Dashboard />
        <p>
          Click <a href="/"> here</a> to go back home
        </p>
        <button class="btn btn-primary" onClick={this.props.auth.logout}>Logout</button>
      </div>
    );
  }
}

export default Restricted;
