import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import TableRow from "./TicketListTableRow";

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    let idToken = jwtDecode(localStorage.getItem("id_token"));
    var email = idToken.email;
    this.state = { ticket: [], email: email };
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
        this.setState({ ticket: response.data });
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
      <div>
        <h3 align="center">Ticket List</h3>
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
          <tbody>{this.tabRow(this.state.ticket, this.state.ticket._id)}</tbody>
        </table>
      </div>
    );
  }
}
