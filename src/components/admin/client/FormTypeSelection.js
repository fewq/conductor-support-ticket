import React, { Component } from "react";
import TicketForm from "./MakeTicket.js";

import "bootstrap/dist/css/bootstrap.min.css";
import BugIcon from "../../img/bug_icon.png";
import FeatureIcon from "../../img/feature_icon.png";

export default class FormTypeSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      formTypeSelected: false
    };
  }

  toggleShow = formType => {
    this.setState(state => ({
      isShow: !state.isShow,
      formTypeSelected: true
    }));
  };

  render() {
    return (
      <div className="container">
        <div>
          <div className="form-type-container">
            <div className="form-type-item">
              <a href="#ticket-form" onClick={this.toggleShow}>
                <img src={BugIcon} />
              </a>
              <h3>Bug report</h3>
            </div>
            <div className="form-type-item">
              <a href="#ticket-form" onClick={this.toggleShow}>
                <img src={FeatureIcon} />
              </a>
              <h3>Feature Enquiry</h3>
            </div>
          </div>
        </div>
        <div>
          <div>
            {this.state.isShow || this.state.formTypeSelected ? (
              <TicketForm createdBy={this.props.name} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
