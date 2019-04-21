import React, { Component } from "react";
import axios from "axios";
import * as Yup from "yup";
import { withFormik } from "formik";
import { disableEnterButton } from "../helper";
import FileUpload from "./FileUpload";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    files: Yup.array(),
    title: Yup.string()
  }),

  mapPropsToValues: props => ({
    title: props.title,
    ticketId: props.ticketId,
    history: props.history,
    files: [],
    email: props.email
  }),

  handleSubmit: (values, {setSubmitting}) => {
    const history = values.history;
    const payload = {
      files: values.files.map(f => {
        return {buffer: f.buffer}
      })
    }

    // pending patch route fix
    axios.patch(
      "http://localhost:4000/ticket/update/" + values.ticketId,
      payload)
    .then(res => console.log(res.data))
    .catch(function(error) {
      console.log(error);
    });

    // email content
    const title = "Updated Ticket: " + values.title;
    const description = "New Files uploaded";
    const client = values.email;
    const email = "admin@conductor.com";
    const target = "admin";
    const subject = "Ticket updated by client";

    axios.post("/api/notify", {
      email,
      subject,
      title,
      description,
      client,
      target
    });
    
    setTimeout(() => {
      setSubmitting(false);
      history.push("/dashboard");
    }, 1000);
  },

  }
)

const MyForm = props => {
  const {
    values,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    isSubmitting
  } = props;

  return (
    <form
      id="file-upload-form"
      onSubmit={handleSubmit}
      onKeyPress={disableEnterButton}
    >
      <h2>{values.title}</h2>
      <h4 className="subtitle">Attach more files to the ticket</h4>
      <div>
        <label>File Upload</label>
        <FileUpload
          setFieldValue={setFieldValue}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.files}
        />
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
  )
}

const FileUploadForm = formikEnhancer(MyForm);

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketId: props.match.params.id,
      title: "",
      createdBy: ""
    };

  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/ticket/view/" + this.props.match.params.id)
      .then(response => {
        console.log("retrieved json response for editing");
        console.log(response);
        this.setState({
          title: response.data.title,
          createdBy: response.data.createdBy
        });
        console.log("retrieved ticket for editing");
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <FileUploadForm
          history={this.props.history}
          title={this.state.title}
          ticketId={this.state.ticketId}
          email={this.state.createdBy} />
      </div>
    );
  }
}
