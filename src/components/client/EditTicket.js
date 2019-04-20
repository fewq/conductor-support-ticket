import React, { Component } from "react";
import axios from "axios";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      formType: "",
      topics: [],
      title: "",
      description: "",
      client: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/ticket/view/" + this.props.match.params.id)
      .then(response => {
        console.log("retrieved json response for editing");
        console.log(response);
        this.setState({
          formType: response.data.formType,
          topics: response.data.topics,
          title: response.data.title,
          description: response.data.description,
          client: response.data.createdBy
        });
        console.log("retrieved state for editing");
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      description: this.state.description,
      read: false
    };
    axios
      .patch(
        "http://localhost:4000/ticket/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data))
      .catch(function(error) {
        console.log(error);
      });

    // email content
    const title = "Updated Ticket: " + this.state.title;
    const description = this.state.description;
    const client = this.state.client;
    const email = "admin@conductor.com";
    const target = "admin";
    const subject = "Ticket updated by client";

    axios.post("/api/notify", {
      email,
      subject,
      title,
      description,
      client,
      target
    });

    this.props.history.push("/restricted");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Edit Ticket</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="description" style={{ display: "block" }}>
              Your Message
            </label>
            <textarea
              className="form-control"
              id="description"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Ticket"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
