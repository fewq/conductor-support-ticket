import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../../img/acnapi.png";

import TicketList from "./TicketList.js";
import EditTicket from "./EditTicket.js";
import ViewTicket from "./ViewTicket.js";
import { kanban } from "./helper";


class NavBar extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a
              className="navbar-brand"
              href="https://beta.acnapi.io/#!/"
              target="_blank"
            >
              <img src={logo} width="100" height="30" alt="ACNAPI" />
            </a>
            <Link to="/dashboard" className="navbar-brand">
              Ticket Dashboard
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/dashboard" className="nav-link">
                    Table View
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/kanban" className="nav-link">
                    Kanban
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/dashboard" exact component={TicketList} />
          <Route path="/kanban" component={kanban} />
          <Route path="/update/:id" component={EditTicket} />
          <Route path="/view/:id" component={ViewTicket} />
        </div>
      </Router>
    );
  }
}

export default NavBar;
