import React, { Component } from "react";
import axios from "axios";
import { 
  convertDateToString,
  renderLoading,
  renderTopics,
  renderStatusHistory,
  renderScreenshots, } from "../helper";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    const { ticket } = this.props.location.state;
    const displayDate = convertDateToString(ticket.dateOfCreation);
    const idToken = jwtDecode(localStorage.getItem("id_token"));
    const email = idToken.email;
    this.state = {
      ticket: ticket,
      displayDate: displayDate,
      statusUpdates: [],
      attendedBy: email,
      imgSources: [],
      screenshotsLoaded: false
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:4000/status/ticketid/" + this.state.ticket._id)
      .then(response => {
        console.log("querying for relevant updates");
        console.log("View response:", response);
        if (response.data != null) {
          this.setState({
            statusUpdates: response.data
          });
          console.log("updated state");
          console.log(this.state);
        }
      })
      .catch((error, res) => {
        console.log("no status update history for this ticket.");
        // console.log(error);
      });

    if (this.state.ticket.fileUpload.length != 0) {
      axios
        .get(
          "http://localhost:4000/ticket/view/" +
            this.state.ticket._id +
            "/fileupload"
        )
        // console.log(imgSources);
        .then(res => {
          console.log(res);
          this.setState({
            imgSources: res.data.map((obj, i) =>
              new Buffer(obj, "base64").toString("binary")
            ),
            screenshotsLoaded: true
          });
        })
        .catch((error, res) => {
          console.log("no status update history for this ticket.");
          // console.log(error);
        });
    }
  }

  // Upon confirmation to delete, the ticket will be deleted,
  // a status update will be created, and an email will be sent.

  // form modal pop up to be implemented later for inputting comments.
  alert = () => {
    let ticketId = this.state.ticket._id;
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      axios
        .delete("http://localhost:4000/ticket/delete/" + ticketId)
        .then(res => {
          console.log("deleted" + ticketId);
        });

      const status = "Closed";
      var update = {
        statusToClient: status,
        statusToAdmin: status,
        ticketId: this.state.ticket._id,
        attendedBy: this.state.attendedBy,
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
      const message = "closed by " + this.state.attendedBy;
      const email = this.state.ticket.createdBy;
      const target = "client";
      const subject = "Your ticket has been closed";
      const link = ticketId;

      axios.post("/api/notify", {
        email,
        subject,
        title,
        status,
        message,
        target,
        link
      });

      // change route
      let path = "/dashboard";
      this.props.history.push(path);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div>
          <h3> {this.state.ticket.title} </h3>
          <p>
            {" "}
            Submitted on: {this.state.displayDate}{" "}
            <span className="badge badge-secondary mr-2">
              {" "}
              {this.state.ticket.statusToClient}{" "}
            </span>{" "}
          </p>
          <div className="d-flex justify-content-center my-2">
            {renderTopics(this.state.ticket.topics)}
          </div>
          <div className="my-5 mb-2">
            <h4> Description </h4>
            <p> {this.state.ticket.description} </p>
          </div>
        
        {this.state.imgSources.length !== 0 && 
            (this.state.screenshotsLoaded ? (
              renderScreenshots(this.state.imgSources)
            ) : (
              renderLoading()
            ) 
          )}
        </div>
        
        {this.state.statusUpdates.length !== 0 && 
        renderStatusHistory(this.state.statusUpdates)}
        
        <div className="my-2">
          <Link
            to={"/update/" + this.state.ticket._id}
            className="btn btn-light"
          >
            Update Ticket Status
          </Link>
          <button onClick={this.alert} className="btn btn-danger">
            Delete Ticket
          </button>
        </div>
      </div>
    );
  }
}
