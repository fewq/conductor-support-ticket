import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import Restricted from "./components/Restricted";
import NotFound from "./components/NotFound";
import Callback from "./components/Callback";
require("dotenv").config();

class App extends Component {
    render() {
        // mainComponent's default value is an empty string
        let mainComponent = "";
        // This switch statement decides what to load in the body of the app
        switch (this.props.location) {
            case "":
                // this case is the homepage
                console.log("case '': Loading <Main /> or homepage ");
                mainComponent = <Main {...this.props} />;
                break;
            case "callback":
                //this case is when the app is in the process of authenication
                console.log("case callback: Loading the loading page");
                mainComponent = <Callback />;
                break;
            case "restricted":
                // this case can only be accessed if the user is authenticated
                // to prevent misuse, it uses the isAuthenticated method in Auth.js
                // if not authenticated, it loads the <NotFound /> page instead
                console.log(
                    "case restricted: loading <Restricted /> or <NotFound />"
                );
                mainComponent = this.props.auth.isAuthenticated() ? (
                    <Restricted {...this.props} />
                ) : (
                    <NotFound />
                );
                break;
            default:
                console.log("case default: redirecting to login");
                mainComponent = <Main {...this.props} />;
        }

        return (
            <main className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <b>ACNAPI Ticket Support System</b>
                    <p className="subtitle">Powered by the Conductor project</p>
                </header>
                <div className="App-body">
                    {/* This is where the actual components are loaded */}
                    {mainComponent}
                </div>
            </main>
        );
    }
}

export default App;
