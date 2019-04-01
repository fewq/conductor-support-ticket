import React, { Component } from 'react';
import axios from 'axios';

import statusTypes from "./statusTypes"
import { withFormik } from "formik";
import * as Yup from "yup";
// import jwtDecode from "jwt.decode";
import { disableEnterButton } from "./helper";

// Validation Scheme with Yup //
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    statusToClient: Yup.string().required("Select status to inform client."),
    statusToAdmin: Yup.string(),
    comments: Yup.string()
  }),
  mapPropsToValues: (props) => (
    {
      attendedBy: props.ticket.attendedBy,
      ticketId: props.ticket.ticketId,
      statusToClient: props.ticket.statusToClient,
      statusToAdmin: props.ticket.statusToAdmin,
      comments: "",
    }
  
  ),
  handleSubmit: (values, { setSubmitting }) => {
    console.log("Submitting edit ticket form on admin's side.")
    var payload = {
      ...values,
      dateOfUpdate: new Date()
    };
    console.log(payload);
    var ticketId = values.ticketId;
    delete payload["ticketId"];
    console.log("remove unnecessary ticket id.");
    console.log(payload)
    console.log("Ticket Id is:")
    console.log(ticketId);

    axios.patch("http://localhost:4000/ticket/update" + ticketId, payload).then(res => {
      console.log("Updating ticket with the following info:");
      console.log(payload);
      console.log(res.data);
    });

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  },
  displayName: "Update Ticket By Admin"
});

// Form //
const MyForm = (props) => {
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
      onKeyPress={disableEnterButton}>

      <h1 class="subtitle">Update Ticket</h1>
    
      <div className="form-row">
        <label for="statusToClient">Status To Client</label>
        <div className="form-group">
          {statusTypes.map(clientStatusOption => (
            <React.Fragment key={clientStatusOption}>
              <div className="custom-control custom-radio custom-control-inline">
                <label className="custom-control-label" for={clientStatusOption}>
                  {clientStatusOption}
                  <input
                    type="radio"
                    name="statusToClient"
                    className="custom-control-input"
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
        <button
          type="submit"
          className="form-button"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>

      {/* <PropState {...props} /> */}
    </form>
  );
};


const UpdateTicketForm = formikEnhancer(MyForm);


export default class Edit extends Component {
  constructor(props) {
    super(props);
    let email = "";
    // let idToken = jwtDecode(localStorage.getItem("id_token"));
    // email = idToken.email;
    this.state = {
      statusToClient: "",
      updates: [],
      statusToAdmin: "",
      attendedBy: email,
      ticketId: this.props.match.params.id,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/ticket/view/'+this.props.match.params.id)
        .then(response => {
          console.log("retrieved json response for editing" );
          console.log(response);
            this.setState({ 
              statusToClient: response.data.statusToClient, 
              statusToAdmin: response.data.statusToAdmin,
              updates: response.data.updates,
            });
            console.log("retrieved state for editing" );
            console.log(this.state);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
 
  // pending discussion for what to be edited by the admin.
  render() {
    return (
      <UpdateTicketForm ticket={this.state} />
    );
  }
}

