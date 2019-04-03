import React, { Component } from "react";
import NavBar from './NavBar.js';

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
            <NavBar />
            </div>
        );
    } 

}