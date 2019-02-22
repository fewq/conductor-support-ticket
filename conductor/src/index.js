import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

let state = {};
Window.setState = changes => {
  state = Object.assign({}, state, changes); //updates the state via changes

  ReactDOM.render(<App {...state} />, document.getElementById("root"));
};

/* eslint no-restricted-globals: 0*/
let initialState = {
  name: "Ted",
  location: location.pathname.replace(/^\/?|\/$/g, "")
  //if it still doesn't work change location to window.location
};

Window.setState(initialState);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
