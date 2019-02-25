import React, { Component } from "react";
import { timingSafeEqual } from "crypto";

class Restricted extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>RESTRICTED AREA</h1>
        <h1>
          Click <a href="/"> here</a> to go back home
        </h1>
        <button onClick={this.props.auth.logout}>Logout</button>
      </div>
    );
  }
}

export default Restricted;
