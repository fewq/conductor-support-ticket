import React, { Component } from "react";
import { timingSafeEqual } from "crypto";
import Dashboard from "./form/Dashboard.js";
import "bootstrap/dist/css/bootstrap.min.css";

class Restricted extends Component {
  state = {};
  render() {
    let restrictedComponent = "";
    switch (localStorage.role) {
      case "admin":
        console.log("logged in as admin");
        //Yuanjia put your html here
        // restrictedComponent = <Kanban />
        break;

      case "user":
        console.log("logged in as user");
        restrictedComponent = <Dashboard />;
        break;
      default:
        console.log("not admin or user");
        break;
    }

    return (
      <div class="container">
        <h2>RESTRICTED AREA</h2>
        {restrictedComponent}
        <p>
          Click <a href="/"> here</a> to go back home
        </p>
        <button class="btn btn-primary" onClick={this.props.auth.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Restricted;
