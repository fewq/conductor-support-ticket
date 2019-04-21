import React, { Component } from "react";
import Auth from "../Auth";
import {renderLoading} from "./helper";

class Callback extends Component {
  state = {};

  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication();
  }

  render() {
    return (
      <div>
        {renderLoading()}
      </div>
    );
  }
}

export default Callback;
