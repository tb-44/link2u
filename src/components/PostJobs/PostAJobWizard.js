import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
  renderFieldLarge,
  renderEmploymentType,
  renderJobDescription,
  renderDatePicker,
  renderApplicationType,
} from "./renderField";
import { connect } from "react-redux";

const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

class PostAJobWizard extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card shadow-lg">
        <div className="container">
          <br />
          <div style={{ fontSize: "150%" }}>What job do you want to post?</div>

          <br />
          <div className="row">
            <div className="col-4">
              <Field
                name="company"
                type="text"
                component={renderFieldLarge}
                label="Company"
                validate={[required]}
              />
            </div>
            <div className="col-4">
              <Field
                name="title"
                type="text"
                component={renderFieldLarge}
                label="Job Title"
                validate={[required]}
              />
            </div>
            <div className="col-4">
              <Field
                name="location"
                type="text"
                component={renderFieldLarge}
                label="Location"
                validate={[required]}
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-8">
              <Field
                name="jobFunction"
                type="text"
                component={renderFieldLarge}
                label="Job Function"
                validate={[required]}
              />
            </div>

            <div className="col-4">
              <Field
                name="employmentType"
                type="text"
                component={renderEmploymentType}
                label="Employment Field"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <Field
                name="industry"
                type="text"
                component={renderFieldLarge}
                label="Company Industry"
                validate={[required]}
              />
            </div>

            <div className="col-4">
              <Field
                name="expiryDate"
                component={renderDatePicker}
                type="text"
                label="Expiry Date"
                validate={[required]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Field
                name="companyLogo"
                type="text"
                component={renderFieldLarge}
                label="Image URL"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Field
                name="jobDescription"
                component={renderJobDescription}
                label="Description"
                maxLength="1000"
                rows="6"
                validate={[required]}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-4">
              <Field
                name="applicationMethod"
                type="text"
                component={renderApplicationType}
                label="Application Type"
                validate={[required]}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-4">
              <span style={{ color: "#0073b1" }}>*</span>&nbsp;Required
            </div>
            <div className=" col-4">
              <button
                type="button"
                className="btn blueBackground btn-lg  btn-block text-white"
                onClick={handleSubmit}
              >
                Add Job
              </button>
            </div>
          </div>

          <br />
        </div>
      </div>
    );
  }
}

PostAJobWizard = reduxForm({
  form: "postAJobWizard",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(PostAJobWizard);

export default connect((state) => ({
  initialValues: state.AddJobReducer.addjob,
}))(PostAJobWizard);
