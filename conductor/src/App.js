import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import Secret from "./components/Secret";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    let mainComponent = "";
    switch (this.props.location) {
      case "":
        mainComponent = <Main />;
        break;
      case "secret":
        mainComponent = <Secret />;
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
