import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderFieldLarge } from "../PostJobs/renderField";
import { connect } from "react-redux";

const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

class RecruiterProfileInformationForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card shadow-lg">
        <div className="container">
          <br />
          <div style={{ fontSize: "150%" }}>
            Here is your Profile Information
          </div>
          <br />
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <Field
                    name="firstName"
                    type="text"
                    component={renderFieldLarge}
                    label="First Name"
                    validate={[required]}
                  />
                </div>
                <div className="col-6">
                  <Field
                    name="lastName"
                    type="text"
                    component={renderFieldLarge}
                    label="Last Name"
                    validate={[required]}
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <Field
                name="address"
                type="text"
                component={renderFieldLarge}
                label="Address"
                validate={[required]}
              />
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-4">
                  <Field
                    name="city"
                    type="text"
                    component={renderFieldLarge}
                    label="City"
                    validate={[required]}
                  />
                </div>

                <div className="col-4">
                  <Field
                    name="state"
                    type="text"
                    component={renderFieldLarge}
                    label="State"
                    validate={[required]}
                  />
                </div>
                <div className="col-4">
                  <Field
                    name="zipcode"
                    type="text"
                    component={renderFieldLarge}
                    label="Zipcode"
                    validate={[required]}
                  />
                </div>
                <div className="col-4">
                  <Field
                    name="phoneNumber"
                    type="text"
                    component={renderFieldLarge}
                    label="Phone Number"
                    validate={[required]}
                  />
                </div>
              </div>
            </div>

            <div className="col-4">
              <Field
                name="companyName"
                type="text"
                component={renderFieldLarge}
                label="Company Name"
                validate={[required]}
              />
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="row">
            <div className=" col-4 offset-4">
              <button
                type="button"
                className="btn blueBackground btn-lg  btn-block text-white"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

RecruiterProfileInformationForm = reduxForm({
  form: "recruiterProfileInformationForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(RecruiterProfileInformationForm);

export default connect((state) => ({
  initialValues: state.RecruiterProfileReducer.profile,
}))(RecruiterProfileInformationForm);
