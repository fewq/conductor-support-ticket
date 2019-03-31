import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import categories from "./categories.js";


// React-select component modified to fit Formik
export default class MySelect extends React.Component {
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