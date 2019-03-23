import React, { Component } from "react";
import { timingSafeEqual } from "crypto";
import { Provider } from "react-redux";
import store from "../store";
import Dashboard from "./form/Dashboard.js";
import Kanban from "./Kanban.js";
import "bootstrap/dist/css/bootstrap.min.css";

class Restricted extends Component {
  render() {
    let restrictedComponent = "";
    switch (localStorage.role) {
      case "admin":
        console.log("logged in as admin");
        restrictedComponent = (
          <Provider store={store}>
            <Kanban />
          </Provider>
        );
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
      <div className="container">
        {restrictedComponent}
        <p>
          Click <a href="/"> here</a> to go back home
        </p>
        <button className="btn btn-primary" onClick={this.props.auth.logout}>
          Logout
        </button>
        
      </div>

    );
  }
}

export default Restricted;
