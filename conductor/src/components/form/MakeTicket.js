import React from "react";
import { withFormik } from "formik";
import categories from "./categories.js";
import * as Yup from "yup";
import Select from "react-select";

import { PropState, disableEnterButton } from "./helper";
import makeAnimated from "react-select/lib/animated";
import "../../css/form.css";

/////////////////////////////////////////////////////
const formType = ["bug", "feature"];

// Validation Scheme with Yup //
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is required!"),
    topics: Yup.array()
      .min(1, "Pick at 1 category")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      ),
    description: Yup.string().required("Description Required!"),
    formType: Yup.string().required("What is this feedback primarily for?")
  }),
  mapPropsToValues: props => ({
    email: "",
    topics: [],
    description: "",
    formType: "bug"
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      topics: values.topics.map(t => t.value)
    };

    // Test code for POST
    /*
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log(data));*/

    // TODO: change static submit to database or else
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "Ticket Form"
});

// Form //
const MyForm = (props, selectedFormType) => {
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
      {/*     
    <label htmlFor="email" style={{ display: "block" }}>
        Email
    </label>
    <input
      id="email"
      class="ticket-form"
      placeholder="Enter your email"
      type="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.email && touched.email && (
      <div style={{ color: "red", marginTop: ".5rem" }}>{errors.email}</div>
    )} */}

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
                    class="ticket-form"
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
      <label htmlFor="description" style={{ display: "block" }}>
        Your Message
      </label>
      <textarea
        id="description"
        placeholder="Tell us more about the issue."
        type="textarea"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.description && touched.description && (
        <div style={{ color: "red", marginTop: ".5rem" }}>
          {errors.descriptionl}
        </div>
      )}

      <div>
        <button
          type="button"
          id="outline"
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

      {/* <PropState {...props} /> */}
    </form>
  );
};

// React-select component modified to fit Formik
class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("topics", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("topics", true);
  };

  render() {
    return (
      <div>
        <label htmlFor="topic">Category of issue</label>
        <Select
          id="category-select"
          options={categories}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          closeMenuOnSelect={false}
          components={makeAnimated()}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

const TicketForm = formikEnhancer(MyForm);

export default TicketForm;
