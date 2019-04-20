/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";
import { convertDateToString } from "../helper";
import { Link } from "react-router-dom";
import ImagePreview from "./ImagePreview.js";
import { Button, ProgressBar } from "react-bootstrap";
import { saveAs } from "file-saver";
import JSZip from "jszip";

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
      screenshotsLoaded: false,
      screenshotsLoading: true
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
            screenshotsLoaded: true,
            screenshotsLoading: false
          });
        })
        .catch((error, res) => {
          console.log(error);
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

  renderTopics() {
    if (this.state.statusUpdates.length !== 0) {
      return this.state.ticket.topics.map((obj, i) => {
        return (
          <span className="badge badge-pill badge-warning mr-2"> {obj} </span>
        );
      });
    }
  }

  renderScreenshots() {
    if (this.state.imgSources.length !== 0) {
      return this.state.imgSources.map((obj, i) => {
        return (
          <div key={i} className="col-md-4">
            <div className="thumbnail mb-2">
              <ImagePreview index={i} imgSources={this.state.imgSources} />
            </div>
          </div>
        );
      });
    }
  }

  handleDownload() {
    var zip = new JSZip();
    var img = zip.folder("images");
    console.log("handling download");
    this.state.imgSources.map((obj, i) => {
      let filename = "screenshot" + i;
      let imgData = obj.replace(/^data:image\/\w+;base64,/, "");
      img.file(filename, imgData, { base64: true });
    });
    zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, "example.zip");
    });
  }

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
            {this.renderTopics()}
          </div>
          <div className="my-5 mb-2">
            <h4> Description </h4>
            <p> {this.state.ticket.description} </p>
          </div>

          {!this.state.screenshotsLoaded && (
            <div>
              <ProgressBar animated now={45} />
            </div>
          )}

          {this.state.screenshotsLoaded && (
            <div>
              <h4>
                {" "}
                Screenshots{" "}
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    this.handleDownload();
                  }}
                >
                  {" "}
                  Download all{" "}
                </Button>{" "}
              </h4>
              <div className="row">{this.renderScreenshots()}</div>
            </div>
          )}
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
