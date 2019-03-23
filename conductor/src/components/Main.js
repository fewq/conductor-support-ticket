import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null // to get username from Auth0
    };

    this.handle = this.handle.bind(this);
  }

  async handle(e) {
    e.preventDefault();

    const { username } = this.state;

    const email = await axios.post("/api/notify", {
      username
    });
  }

  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated() && (
          <div>
            <p>Hey, {this.props.name}, how can we assist you today?</p>
            <p>
              Click <a href="/restricted"> here</a> to access restricted area
            </p>
          </div>
        )}

        {/* only display login option if user is not already logged in */}
        {!this.props.auth.isAuthenticated() && (
          <button className="btn btn-primary" onClick={this.props.auth.login}>
            Login
          </button>
        )}

        <h3>Test Email</h3>

        <form onSubmit={this.handle}>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
