import React, { Component } from "react";
import axios from "axios";

// form state management & validation library 
import { withFormik } from "formik";
import * as Yup from "yup";

// individual form components
import formType from "./formType.js";
import MySelect from "./MySelect.js"
import { disableEnterButton, getFilePreview } from "./helper";
import Dropzone from "react-dropzone";
import {baseStyle, activeStyle, acceptStyle, rejectStyle} from "./Dropzone";

// for retrieving user's email
import jwtDecode from "jwt-decode";

import "../../css/form.css";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

// Validation Scheme with Yup //
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is required!"),
    topics: Yup.array()
      .min(1, "Pick at least 1 category")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      ),
    title: Yup.string().required("Title Required!"),
    description: Yup.string().required("Description Required!"),
    formType: Yup.string().required("What is this feedback primarily for?"),
    attachments: Yup.array(),
  }),
  mapPropsToValues: (props) => ({
    createdBy: props.userEmail,
    topics: [],
    title: "",
    description: "",
    formType: "bug",
    attachments: []
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      topics: values.topics.map(t => t.value),
      attachments: values.attachments.map(a => a.value),
      statusToClient: "Pending Admin",
      dateOfCreation: new Date(),
    };

    axios.post("http://localhost:4000/ticket/add", payload).then(res => {
      console.log("form received the following payload:");
      console.log(payload);
      console.log(res.data);
      console.log(res.body);
    });

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  },
  displayName: "Ticket Form"
});

// Form //
const MyForm = (props) => {

  // formik basic props & state management
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
      id="ticket-form"
      onSubmit={handleSubmit}
      onKeyPress={disableEnterButton}
    >
      <h1 class="subtitle">Ticket Form</h1>
      <div class="radio-group">
        <label>Ticket Type</label>
        <div class="radio-container">
          {formType.map(option => (
            <React.Fragment key={option}>
              <div class="radio-item">
                <label htmlFor={option}>
                  {option}
                  <input
                    type="radio"
                    name="formType"
                    id={option}
                    value={option}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.formType === option}
                  />
                </label>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <MySelect
        value={values.topics}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.topics}
        touched={touched.topics}
      />
      <label htmlFor="name" style={{ display: "block" }}>
        Title
      </label>
      <input
        id="title"
        placeholder="Summary of the issue"
        type="text"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <label htmlFor="description" style={{ display: "block" }}>
        Your Message
      </label>
      <textarea
        id="description"
        placeholder="Tell us more about the issue"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div>
        <label>File Upload</label>
        <Dropzone multiple id="files" accept="image/*"
        style={baseStyle} acceptStyle={acceptStyle} rejectStyle={rejectStyle} activeStyle={activeStyle}
        onDrop={(acceptedFiles) => {
          setFieldValue("attachments", values.attachments.concat(acceptedFiles));
        }}>
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive && 'Click here or drop a file to upload!'}
            {isDragActive && !isDragReject && "File type ok!"}
            {isDragReject && "File type not accepted, sorry!"}
            {values.attachments.map((file, i) => (
              <div>
                <img src={getFilePreview(file)}
                  alt={file.name}
                  className="img-thumbnail mt-2"
                  height={200}
                  width={200} />
                <p className="text-white">
                  {i}. {file.name}
                </p>
              </div>
            ))}
          </div>
        )}
        </Dropzone>
      </div>
      <div>
        <button
          type="button"
          id="reset"
          className="form-button"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button
          type="submit"
          className="form-button"
          id="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>

    </form>
  );
};



const CreateTicketForm = formikEnhancer(MyForm);

export default class TicketForm extends Component {
  constructor(props) {
    super(props);
    //start of TODO
    let idToken = jwtDecode(localStorage.getItem("id_token"));
    var email = idToken.email;
    //end of TODO

    // still working on retrieving user info
    this.state = {
      userEmail: email
    };
  }

  render() {
    return (
      <div>
        <CreateTicketForm userEmail={this.state.userEmail} />
      </div>
    );
  }
}
