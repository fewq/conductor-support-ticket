import React, { Component } from "react";
import NavBar from './NavBar.js';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
            <NavBar props={this.props} />
            </div>
        );
    } 

}