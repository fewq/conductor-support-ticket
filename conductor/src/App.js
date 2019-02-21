import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Sign in to Conductor ticket support</h2>
          {/* <input type="email" placeholder="Email" id="email_field" />
          <input type="password" placeholder="Password" id="password_field" /> */}
          <form className="Form">
            <input
              type="email"
              placeholder="Email"
              id="email_field"
              autoComplete="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password_field"
              autoComplete="current-password"
              required
            />
            <button onClick={this.login}>Login</button>
          </form>
        </header>
      </div>
    );
  }

  login() {
    var raw_email = document.getElementById("email_field").value;
    var raw_password = document.getElementById("password_field").value;
    console.log("Login button pressed");
    console.log("Email: " + raw_email);
    console.log("Password: " + raw_password);
  }
}

export default App;
