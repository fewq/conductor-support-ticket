import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import Restricted from "./components/Restricted";
import NotFound from "./components/NotFound";
import Callback from "./components/Callback";

class App extends Component {
  render() {
    let mainComponent = "";
    switch (this.props.location) {
      case "":
        mainComponent = <Main {...this.props} />;
        break;
      case "callback":
        mainComponent = <Callback />;
        break;
      case "restricted":
        mainComponent = <Restricted />;
        break;
      default:
        mainComponent = <NotFound />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Welcome to react, {this.props.name}
          {mainComponent}
        </header>
      </div>
    );
  }
}

export default App;
