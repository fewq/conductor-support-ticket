import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ProgressBar } from "react-bootstrap";

import TableRow from "./TicketListTableRow";

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    let idToken = jwtDecode(localStorage.getItem("id_token"));
    var email = idToken.email;
    this.state = { ticket: [], email: email, loaded: false };
  }
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    axios
      .get("http://localhost:4000/ticket/getall")
      .then(response => {
        console.log("refreshing");
        console.log(response);
        this.setState({ ticket: response.data, loaded: true });
      })
      .catch((error, response) => {
        console.log(error);
      });
  };

  tabRow(object, i) {
    return this.state.ticket.map((object, i) => {
      return (
        <TableRow
          obj={object}
          key={i}
          indice={i}
          delete={ind => this.deleteItem(ind)}
        />
      );
    });
  }

  deleteItem(index) {
    this.setState({ ticket: this.state.ticket.filter((_, i) => i !== index) });
  }

  render() {
    return (
      <div align="center">
        <h3>Ticket List</h3>
        <table className="table table-striped text-white">
          <thead>
            <tr>
              <th>Date Submitted</th>
              <th>Submitted By</th>
              <th>Ticket type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Ticket ID</th>
              <th colSpan="2">Action</th>
              <th />
            </tr>
          </thead>

          {this.state.loaded && (
            <tbody>
              {this.tabRow(this.state.ticket, this.state.ticket._id)}
            </tbody>
          )}
        </table>

        {!this.state.loaded && (
          <div className="loading">
            <ProgressBar animated now={45} />
          </div>
        )}
      </div>
    );
  }
}
