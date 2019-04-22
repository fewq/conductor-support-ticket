/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

const LOGIN_SUCCESS_PAGE = "/restricted"; //restricted area
const LOGIN_FAILURE_PAGE = "/"; //homepage

var env = require("./env");

//regular class that contains auth0 property
export default class Auth {
  // local variable hold the auth0 object
  auth0 = new auth0.WebAuth({
    domain: "conductor.au.auth0.com",
    clientID: env.AUTH_TOKEN,
    redirectUri: "http://localhost:5000/callback",
    audience: "https://conductor.au.auth0.com/userinfo", //specifies what kind of user
    responseType: "token id_token",
    scope: "openid profile email app_metadata"
  });

  // constructor
  constructor() {
    this.login = this.login.bind(this);
  }

  // login method, called when login button is pressed
  login() {
    console.log("Auth.login() method called");
    this.auth0.authorize();
  }

  // called from the callback component
  // adds login variables to localStorage
  handleAuthentication() {
    console.log(
      "Auth.handleAuthentication() method called; adding access_token, id_token, expires_at to localStorage"
    );
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        localStorage.setItem(
          "role",
          this.getProfile()["https://conductor.com/app_metadata"]["role"]
        );
        location.hash = "";
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err);
      }
    });
  }

  // method to check if user is currently authenticated
  // called by App.js, Main.js
  isAuthenticated() {
    console.log("checking for authentication via Auth.isAuthenticated()");
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    console.log(
      "Logout pressed, deleting access_token, id_token, expires_at from localStorage"
    );
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("role");
    location.pathname = LOGIN_FAILURE_PAGE;
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      return {};
    }
  }
}
