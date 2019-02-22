import React, { Component } from "react";

export default class Main extends Component {
  render() {
    return (
      <div>
        <h1>Main component, {this.props.name}</h1>
        <h1>
          Click <a href="/restricted"> here</a> to access restricted area
        </h1>

        {/* only display login option if user is not already logged in */}
        {!this.props.auth.isAuthenticated() && (
          <h1>
            Please login first{" "}
            <button onClick={this.props.auth.login}>Login</button>
          </h1>
        )}
      </div>
    );
  }
}
