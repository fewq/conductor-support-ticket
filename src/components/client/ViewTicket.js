/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";
import { 
  convertDateToString,
  renderLoading,
  renderTopics,
  renderStatusHistory,
  renderScreenshots, } from "../helper";
import { Link } from "react-router-dom";

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    const { ticket } = this.props.location.state;
    const displayDate = convertDateToString(ticket.dateOfCreation);
    this.state = {
      ticket: ticket,
      displayDate: displayDate,
      statusUpdates: [],
      imgSources: [],
      screenshotsLoaded: false
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:4000/status/ticketid/" + this.state.ticket._id)
      .then(response => {
        if (response.data != null) {
          this.setState({
            statusUpdates: response.data
          });
        }
      })
      .catch((error, response) => {
        console.log("No status updates retrieved.");
      });

    if (this.state.ticket.fileUpload.length !== 0) {
      console.log("retrieving file attachments.");
      axios
        .get(
          "http://localhost:4000/ticket/view/" +
            this.state.ticket._id +
            "/fileupload"
        )
        .then(res => {
          this.setState({
            imgSources: res.data.map((obj, i) =>
              new Buffer(obj, "base64").toString("binary")
            ),
            screenshotsLoaded: true
          });
        })
        .catch((error, res) => {
          console.log(error);
        });
    } else {
      this.setState({
        screenshotsLoaded: true
      });
    }
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

      // redirect to dashboard
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
            Submitted on: {this.state.displayDate}
            <span className="badge badge-secondary mr-2">
              {this.state.ticket.statusToClient}
            </span>
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

        <div className="my-4">
          <Link
            to={"/update/" + this.state.ticket._id}
            className="btn btn-light"
          >
            Edit Description
          </Link>
          <button onClick={this.alert} className="btn btn-danger">
            Delete Ticket
          </button>
        </div>
      </div>
    );
  }
}
