import React, { Component } from "react";
import axios from "axios";

import statusTypes from "./statusTypes";
import { withFormik } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import { disableEnterButton } from "../helper";
import "../../css/form.css";

// Validation Scheme with Yup //
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    statusToClient: Yup.string().required("Select status to inform client."),
    statusToAdmin: Yup.string(),
    comments: Yup.string()
  }),
  mapPropsToValues: props => ({
    attendedBy: props.ticket.attendedBy,
    ticketId: props.ticket.ticketId,
    prevStatusToClient: props.ticket.prevStatusToClient,
    statusToClient: "",
    // status to admin not implemented yet, as the appropriate types of status are not confirmed yet.
    statusToAdmin: props.ticket.statusToAdmin,
    comments: "",
    history: props.history
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log("Submitting edit ticket form on admin's side.");
    var newTicketStatusToClient = { statusToClient: values.statusToClient };
    console.log("values:", values);
    const history = values.history;

    var payload = {
      ...values,
      dateOfUpdate: new Date()
    };

    delete payload.history;
    var ticketId = values.ticketId;
    //console.log("payload:", payload);
    axios
      .post("http://localhost:4000/status/add", payload)
      .then(res => {
        console.log("Adding new ticket status update with the following info:");
        console.log(res.data);
      })
      .catch(res => console.log(res));

    axios
      .patch(
        "http://localhost:4000/ticket/update/" + ticketId,
        newTicketStatusToClient
      )
      .then(res => {
        console.log("Changed status of ticket to client");
        console.log(res.data);
      })
      .catch(res => console.log(res));

    console.log("Redirecting back to dashboard.");
    history.push("/dashboard");

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  },
  displayName: "Update Ticket By Admin"
});

// Form //
const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting
  } = props;
  return (
    <form
      id="update-ticket-form"
      onSubmit={handleSubmit}
      onKeyPress={disableEnterButton}
    >
      <h1 class="subtitle">Update Ticket</h1>
      <div className="radio-group">
        <label for="statusToClient">Status To Client</label>
        <div className="radio-container">
          {statusTypes.map(clientStatusOption => (
            <React.Fragment key={clientStatusOption}>
              <div className="radio-item">
                <label for={clientStatusOption}>
                  {clientStatusOption}
                  <input
                    type="radio"
                    name="statusToClient"
                    id={clientStatusOption}
                    value={clientStatusOption}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.statusToClient === clientStatusOption}
                  />
                </label>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <label htmlFor="comments" style={{ display: "block" }}>
        Comments about the update of status
      </label>
      <div className="form-group">
        <textarea
          id="comments"
          placeholder="Tell us more about the issue"
          className="form-control"
          rows="3"
          value={values.comments}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <button
          type="button"
          className="form-button"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button type="submit" className="form-button" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

const UpdateTicketForm = formikEnhancer(MyForm);

export default class Edit extends Component {
  constructor(props) {
    super(props);
    let email = "";
    let idToken = jwtDecode(localStorage.getItem("id_token"));
    email = idToken.email;

    this.state = {
      prevStatusToClient: null,
      statusToAdmin: "",
      attendedBy: email,
      ticketId: this.props.match.params.id,
      acknowledgedByClient: null,
      canRender: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/ticket/view/" + this.props.match.params.id)
      .then(response => {
        console.log("retrieved json response for editing");
        console.log(response);
        this.setState({
          prevStatusToClient: response.data.statusToClient,
          statusToAdmin: response.data.statusToAdmin,
          acknowledgedByClient: false,
          canRender: true
        });

        console.log("Updated state:");
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // pending discussion for what to be edited by the admin.
  render() {
    return (
      <div>
        {this.state.canRender ? (
          <UpdateTicketForm ticket={this.state} history={this.props.history} />
        ) : null}
      </div>
    );
  }
}
