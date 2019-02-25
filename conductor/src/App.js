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
        mainComponent = this.props.auth.isAuthenticated() ? (
          <Restricted {...this.props} />
        ) : (
          <NotFound />
        );
        break;
      default:
        mainComponent = <NotFound />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Welcome to the <b>ACNAPI Modern Ticket Support System</b>
          <p class="subtitle">Powered by the Conductor</p>
        </header>
        <body>
          {mainComponent}
        </body>
      </div>
    );
  }
}

export default App;
