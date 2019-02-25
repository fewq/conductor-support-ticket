/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";

const LOGIN_SUCCESS_PAGE = "/restricted";
const LOGIN_FAILURE_PAGE = "/"; //homepage

//regular class that contains auth0 property
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "conductor.au.auth0.com",
    clientID: "m28JIY4vvRBiX09GZY4YHpDTI7Bxp7zL",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://conductor.au.auth0.com/userinfo", //specifies what kind of user
    responseType: "token id_token",
    scope: "openid"
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err);
      }
    });
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGIN_FAILURE_PAGE;
  }
}
