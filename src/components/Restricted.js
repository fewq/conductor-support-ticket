import React, { Component } from "react";
//import { timingSafeEqual } from "crypto";
import ClientDashboard from "./client/Dashboard.js";
import AdminDashboard from "./admin/Dashboard.js";
import Kanban from "./Kanban.js";
import "bootstrap/dist/css/bootstrap.min.css";

class Restricted extends Component {
  render() {
    let restrictedComponent = "";
    switch (localStorage.role) {
      case "admin":
        console.log("logged in as admin");
        restrictedComponent = <AdminDashboard />;
        break;

      case "tester":
        console.log("logged in as tester");
        restrictedComponent = <Kanban />;
        break;

      case "dev":
        console.log("logged in as dev");
        restrictedComponent = <Kanban />;
        break;

      case "ba":
        console.log("logged in as ba");
        restrictedComponent = <Kanban />;
        break;

      case "client":
        console.log("logged in as client");
        restrictedComponent = <ClientDashboard />;
        break;
      default:
        console.log("not admin or client");
        break;
    }

    return (
      <div className="container">
        {restrictedComponent}
        <p className="mt-5">
          Click <a href="/"> here</a> to go back home
        </p>
        <button className="btn btn-secondary" onClick={this.props.auth.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Restricted;
