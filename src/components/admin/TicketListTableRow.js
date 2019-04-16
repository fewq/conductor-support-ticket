import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { convertDateToString } from "../helper";
import jwtDecode from "jwt-decode";

class TableRow extends Component {
  constructor(props) {
    super(props);
    const idToken = jwtDecode(localStorage.getItem("id_token"));
    const email = idToken.email;
    this.state = { ticket: this.props.obj, attendedBy: email };
  }

  // Upon confirmation to delete, the ticket will be deleted,
  // a status update will be created, and an email will be sent.

  // form modal pop up to be implemented later for inputting comments.
  alert = () => {
    let ticketId = this.props.obj._id;
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      axios
        .delete("http://localhost:4000/ticket/delete/" + ticketId)
        .then(res => {
          console.log("deleted" + ticketId);
        });

      let status = "Closed";
      let sender = this.state.attendedBy;
      var update = {
        statusToClient: status,
        statusToAdmin: status,
        ticketId: ticketId,
        attendedBy: sender,
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
      let receiver = this.state.ticket.createdBy;
      let title = "Close Ticket " + ticketId;
      let message = "Closed by" + sender;

      axios.post("/api/notify", {
        title,
        status,
        receiver,
        message
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
        <td>{this.props.obj.createdBy}</td>
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
