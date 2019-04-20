import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { convertDateToString } from "../helper";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = { ticket: this.props.obj };
  }

  alert = () => {
    let ticketId = this.state.ticket._id;
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      axios
        .delete("http://localhost:4000/ticket/delete/" + ticketId)
        .then(res => {
          console.log("deleted" + ticketId);
        });

      let status = "Closed";
      const client = this.state.ticket.createdBy;

      var update = {
        statusToClient: status,
        statusToAdmin: status,
        ticketId: ticketId,
        attendedBy: client,
        dateOfUpdate: new Date()
      };

      axios
        .post("http://localhost:4000/status/add", update)
        .then(res => {
          console.log("posting status update");
          console.log(res);
        })
        .catch(err => console.log(err));

      // set email content
      const title =
        "Closed Ticket: " + this.state.ticket.title + " (" + ticketId + ")";
      const description = "Closed.";
      const email = "admin@conductor.com";
      const target = "admin";
      const subject = "Ticket deleted by client";

      axios.post("/api/notify", {
        email,
        subject,
        title,
        description,
        client,
        target
      });

      // for refreshing the table
      this.props.delete(this.props.indice);
    }
  };

  render() {
    let displayDate = convertDateToString(this.props.obj.dateOfCreation);
    return (
      <tr>
        <td>{displayDate}</td>
        <td>{this.props.obj.formType}</td>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.statusToClient}</td>
        <td>
          <span className="badge badge-secondary">{this.props.obj._id}</span>
        </td>
        <td>
          <Link
            to={{
              pathname: `/view/${this.props.obj._id}`,
              state: {
                ticket: this.props.obj
              }
            }}
            className="btn btn-primary"
          >
            View
          </Link>
        </td>
        <td>
          <button onClick={this.alert} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
