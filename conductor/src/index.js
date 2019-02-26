import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Auth from "./Auth";

//calls the constructor in Auth.js but doesn't check authentication yet
// will be passed to state later
const auth = new Auth();

//original state is blank
let state = {};

// updates the changes and re-renders the changed components
Window.setState = changes => {
  //updates the state via changes
  state = Object.assign({}, state, changes);
  console.log("Current state: ");
  console.log(state);
  //passes the state object to the App via the spread syntax
  ReactDOM.render(<App {...state} />, document.getElementById("root"));
};

//do not remove the next line, it prevents errors
/* eslint no-restricted-globals: 0*/
let initialState = {
  name: "Ted",
  location: location.pathname.replace(/^\/?|\/$/g, ""),
  //if it still doesn't work change location to window.location
  auth
};

Window.setState(initialState);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
