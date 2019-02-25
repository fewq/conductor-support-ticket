import React, { Component } from "react";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null // to get username from Auth0
    };
  }

  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated() && (<div>
          <p>Hey, {this.props.name}, how can we assist you today?</p>
          <p>Click <a href="/restricted"> here</a> to access restricted area</p>
          </div>)}
        

        {/* only display login option if user is not already logged in */}
        {!this.props.auth.isAuthenticated() && (
            <button class="btn btn-primary" onClick={this.props.auth.login}>Login</button>
        )}
      </div>
    );
  }
}
