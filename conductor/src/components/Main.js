import React, { Component } from "react";

export default class Main extends Component {
  render() {
    return (
      <div>
        <h1>Main component, {this.props.name}</h1>
        <h1>
          Click <a href="/restricted"> here</a> to access restricted area
        </h1>
      </div>
    );
  }
}
