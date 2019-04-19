/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";
import { convertDateToString } from "../helper";
import { Link } from "react-router-dom";
import ImagePreview from "./ImagePreview.js"

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
        console.log("No status updates retrieved.")
      });

    if (this.state.ticket.fileUpload.length != 0) {
      console.log("retrieving file attachments.")
      axios.get("http://localhost:4000/ticket/view/" + this.state.ticket._id + "/fileupload")
        .then(res => {
          this.setState({imgSources: res.data})
        })
        .catch((error, res) => {
          console.log(error)
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
      let sender = this.state.ticket.createdBy;

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
        })
        .catch(err => console.log(err));

      // set email content

      let receiver = "admin@conductor.com";
      let title = "Close Ticket " + ticketId;
      let message = "Closed by" + sender;

      axios.post("/api/notify", {
        title,
        status,
        receiver,
        message
      });

      // redirect to dashboard
      let path = "/dashboard";
      this.props.history.push(path);
    }
  };

  renderTopics() {
    if (this.state.statusUpdates.length !== 0) {
      return this.state.ticket.topics.map((obj, i) => {
        return <span className="badge badge-pill badge-warning mr-2"> {obj} </span>;
      });
    }
  }

  renderScreenshots() {
    if (this.state.imgSources.length != 0) {
      return this.state.imgSources.map((obj, i) => {
        var imgURL = new Buffer(obj, 'base64').toString('binary');
        return (
        <div key={i} className="col-md-4">
          <div className="thumbnail">
            <ImagePreview src={imgURL} alt={i} />
          </div>
        </div>
      )
      })
    }
  }

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
            {this.renderTopics()}
          </div>
          <div className="my-5 mb-2">
            <h4> Description </h4>
            <p> {this.state.ticket.description} </p>
          </div>

          <h4> Screenshots </h4>
          <div className="row">        
            {this.renderScreenshots()}
          </div>
        </div>
        {this.state.statusUpdates.map((obj, i) => (
          <div>
            <p>Update History</p>
            <table className="table table-striped text-white">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attended By</th>
                  <th>Comments</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{obj.dateOfUpdate}</td>
                  <td>{obj.attendedBy}</td>
                  <td>{obj.comments}</td>
                  <td>Some status field to be implemented later.</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        <div className="my-2">
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
