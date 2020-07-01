import React, { Component } from "react";
import "../../App.css";
import "../../jobsearch_wrapper.css";
import Navbar from "../NavBar/NavBar";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import { getsavedjobs } from "../../Actions/actions_jobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getapplicantprofile } from "../../Actions/applicant_login_profile_actions";
import { applyjob } from "../../Actions/actions_jobs";

class ViewSavedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      jobs: [],
    };
  }

  componentDidMount() {
    const applicantEmail = JSON.parse(
      localStorage.getItem(userConstants.USER_DETAILS)
    ).email;
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.getsavedjobs(applicantEmail, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var savedjobs = response.payload.data.allSavedJobs;
        this.setState({
          jobs: savedjobs,
          count: savedjobs.length,
        });
      }
    });
  }

  normalapplyjob = (event, job) => {
    var applyjob = JSON.stringify(job);
    var id = JSON.parse(applyjob)._id;
    window.open("/applyjob/" + id, "_blank");
    localStorage.setItem("job", applyjob);
  };

  viewjob = (event, job) => {
    console.log(job);
    this.props.history.push({
      pathname: `/job/view/${job._id}`,
      state: {
        viewjob: job,
      },
    });
  };

  getContents() {
    var rows = this.state.jobs;
    var self = this;
    if (rows.length > 0 && rows[0].hasOwnProperty("_id")) {
      return Object.keys(rows).map(function (i) {
        return (
          <li
            className="jobs-activity__list-item jobs-saved-jobs__list-item jobs-job-card-actions-container card-list__item job-card job-card--column ember-view"
            key={i}
          >
            <div className="media1">
              <a href={`/job/view/${rows[i]._id}`} className="pull-left">
                <img
                  alt=""
                  src={rows[i].company_logo}
                  style={{ height: "50px", width: "50px" }}
                />
              </a>
              <div className="artdeco-entity-lockup--size-4 gap1">
                <a
                  href={`/job/view/${rows[i]._id}`}
                  onClick={(event) => self.viewjob(event, rows[i])}
                >
                  <div className="job-details__subject1">{rows[i].title}</div>
                </a>
                <div className="job-details__name">{rows[i].posted_by}</div>
                <div className="job-details__location">
                  <FontAwesomeIcon
                    className="fa-map-marker-alt"
                    icon="map-marker-alt"
                  ></FontAwesomeIcon>
                  &nbsp;&nbsp;{rows[i].location}
                </div>
                <div className="job-details__posted">
                  Expires on{" "}
                  {rows[i].expiry_date
                    .slice(0, new Date().toISOString().indexOf("T"))
                    .replace(/-/g, "/")}
                </div>
              </div>
            </div>
            {rows[i].application_method === "Easy Apply" ? (
              <Easyapply
                applyjob={self.props.applyjob}
                getapplicantprofile={self.props.getapplicantprofile}
                id={rows[i]._id}
                jobdetails={rows[i]}
              />
            ) : (
              <button
                type="submit"
                className="btn arteco-btn"
                onClick={(event) => self.normalapplyjob(event, rows[i])}
              >
                Apply
              </button>
            )}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div className="jobsearch-wrapper">
        <Navbar></Navbar>
        <div
          className="neptune-grid2 two-column full-height"
          style={{ marginTop: "70px" }}
        >
          <div className="core-rail jobs-box jobs-box--full-width">
            <h2 className="jobs-activity__header jobs-box__title jobs-box__content-wrap">
              <span className="list-title">
                Saved jobs &nbsp;({this.state.count})
              </span>
            </h2>
            <ul className="jobs-saved-jobs__list card-list card-list--column jobs-activity__list">
              <div>{this.getContents()}</div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
class Easyapply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      profilephoto: "",
      address: "",
      resume: "",
      touchedprofile: {
        firstname: false,
        lastname: false,
        phonenumber: false,
        address: false,
      },
    };

    this.submitApply = this.submitApply.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.openResumeDialog = this.openResumeDialog.bind(this);
    this.uploadresume = this.uploadresume.bind(this);
  }

  componentDidMount() {
    //call to action
    const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
      .email;
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.getapplicantprofile(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        this.setState({
          profile: response.payload.data.profile,
          firstname: response.payload.data.profile.firstName,
          lastname: response.payload.data.profile.lastName,
          phonenumber:
            response.payload.data.profile.phoneNumber === 0
              ? ""
              : response.payload.data.profile.phoneNumber,
          email: response.payload.data.profile.email,
          resume:
            response.payload.data.profile.resume === null
              ? ""
              : response.payload.data.profile.resume,
          address: response.payload.data.profile.address,
          profilephoto:
            response.payload.data.profile.profilePicture === ""
              ? "images/avatar.png"
              : response.payload.data.profile.profilePicture,
          isLoading: false,
        });
        this.refs.myfirstname.value = response.payload.data.profile.firstName;
        this.refs.mylastname.value = response.payload.data.profile.lastName;
        this.refs.myphonenumber.value =
          response.payload.data.profile.phoneNumber === 0
            ? ""
            : response.payload.data.profile.phoneNumber;
        this.refs.myemail.value = response.payload.data.profile.email;
        this.refs.myaddress.value = response.payload.data.profile.address;
      }
    });
  }

  openResumeDialog = (e) => {
    document.getElementById("resume").click();
  };

  uploadresume = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);

    this.setState({
      resume: file.name,
      uploadedresume: file,
    });
  };

  changeHandler = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: e.target.value,
    };

    this.setState(state);
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touchedprofile: { ...this.state.touchedprofile, [field]: true },
    });
  };

  handleValidation() {
    let formIsValid = false;
    const errors = validateprofile(
      this.state.firstname,
      this.state.lastname,
      this.state.phonenumber,
      this.state.resume,
      this.state.address
    );
    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.phonenumber &&
      !errors.resume &&
      !errors.address
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  submitApply = () => {
    if (this.handleValidation()) {
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      const data = {
        jobID: this.props.id,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        address: this.state.address,
        phoneNumber: this.state.phonenumber,
        applicantEmail: this.state.email,
        resume: this.state.resume,
      };

      if (this.state.uploadedresume) {
        var formData = new FormData();
        formData.append("uploadedResume", this.state.uploadedresume);
        Object.keys(data).forEach(function (key) {
          formData.append(key, data[key]);
        });

        // Display the formdata key/value pairs
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        this.props.applyjob(formData, token).then((response) => {
          console.log("response:", response);
          if (response.payload.status === 200) {
            console.log("Applied job Successfully");
          }
        });
      } else {
        console.log("else", data);
        this.props.applyjob(data, token).then((response) => {
          console.log("response:", response);
          if (response.payload.status === 200) {
            console.log("Applied job Successfully");
          }
        });
      }
    }
  };

  render() {
    var id = this.props.id;
    var { profile } = this.state;
    const { isLoading } = this.state;
    if (!isLoading) {
      const errors = validateprofile(
        this.state.firstname,
        this.state.lastname,
        this.state.phonenumber,
        this.state.resume,
        this.state.address
      );
      var shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touchedprofile[field];
        return hasError ? shouldShow : false;
      };
    }
    return (
      <div>
        <button
          type="button"
          className="btn arteco-btn"
          data-toggle="modal"
          data-target={"#easyapplymodal" + id}
          style={{ marginLeft: "10px", width: "150px" }}
        >
          Easy Apply
        </button>
        <div
          className="modal fade  bd-example-modal-lg"
          id={"easyapplymodal" + id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={"easyapplymodallabel" + id}
          aria-hidden="true"
          style={{ marginTop: "70px" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            style={{ maxWidth: "1000px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"easyapplymodallabel" + id}>
                  Easy Apply
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="profile-entity">
                  <figure>
                    <img
                      alt=""
                      src="/images/avatar.png"
                      style={{ width: "40px", height: "40px" }}
                    />
                    &nbsp;&nbsp;{profile.firstName}&nbsp;{profile.lastName}
                  </figure>
                </div>
                <div className="profile-title" style={{ fontSize: "19px" }}>
                  Contact Info
                </div>
                <li className="job-question">
                  <div className="row form-group">
                    <div className="col-xs-6 col-md-6">
                      <label
                        htmlFor="position-firstname-typeahead"
                        className="mb1 required"
                      >
                        First Name*
                      </label>
                      <input
                        className="form-control"
                        name="firstname"
                        ref="myfirstname"
                        onChange={this.changeHandler}
                        onBlur={this.handleBlur("firstname")}
                        id="position-firstname-typeahead"
                        maxLength="100"
                        type="text"
                      />
                    </div>
                    <div className="col-xs-6 col-md-6">
                      <label
                        htmlFor="position-lastname-typeahead"
                        className="mb1 required"
                      >
                        Last Name*
                      </label>
                      <input
                        className="form-control"
                        name="lastname"
                        ref="mylastname"
                        onChange={this.changeHandler}
                        onBlur={this.handleBlur("lastname")}
                        id="position-lastname-typeahead"
                        maxLength="100"
                        type="text"
                      />
                    </div>
                    {!isLoading ? (
                      <div className="col-xs-6 col-md-6">
                        {shouldMarkError("firstname") ? (
                          <div className="" style={{ color: "red" }}>
                            First Name is a required field
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {!isLoading ? (
                      <div className="col-xs-6 col-md-6">
                        {shouldMarkError("lastname") ? (
                          <div className="" style={{ color: "red" }}>
                            Last Name is a required field
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="row form-group">
                    <div className="col-xs-6 col-md-6">
                      <label
                        htmlFor="address-question"
                        className="mb1 required"
                      >
                        Address*
                      </label>
                      <input
                        className="form-control"
                        name="address"
                        id="address-question"
                        ref="myaddress"
                        onChange={this.changeHandler}
                        type="text"
                        onBlur={this.handleBlur("address")}
                        placeholder="Address"
                      />
                    </div>
                    <div className="col-xs-6 col-md-6">
                      <label
                        htmlFor="phone-number-question"
                        className="mb1 required"
                      >
                        Phone Number*
                      </label>
                      <input
                        className="form-control"
                        name="phonenumber"
                        id="phone-number-question"
                        ref="myphonenumber"
                        onChange={this.changeHandler}
                        type="text"
                        pattern="[0-9]{10}"
                        onBlur={this.handleBlur("phonenumber")}
                        placeholder="1234567890"
                      />
                    </div>
                    {!isLoading ? (
                      <div className="col-xs-6 col-md-6">
                        {shouldMarkError("address") ? (
                          <div className="" style={{ color: "red" }}>
                            Address is a required field
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {!isLoading ? (
                      <div className="col-xs-6 col-md-6">
                        {shouldMarkError("phonenumber") ? (
                          <div className="" style={{ color: "red" }}>
                            Phone Number is a required field
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xs-6 col-md-6">
                    <label htmlFor="email-question" className="mb1 required">
                      Email Address*
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      id="email-question"
                      ref="myemail"
                      maxLength="100"
                      type="email"
                      disabled
                    />
                  </div>
                </li>
                <div className="profile-title" style={{ fontSize: "19px" }}>
                  Resume*
                </div>
                <div className="form-group">
                  <div className="col-xs-12 col-md-12">
                    <input
                      type="file"
                      id="resume"
                      onChange={this.uploadresume}
                      style={{ display: "none" }}
                    />
                    <button
                      type="file"
                      className="btn arteco-btn-save"
                      id="position-resume-typeahead"
                      onClick={this.openResumeDialog}
                      style={{ width: "150px" }}
                    >
                      Upload Resume
                    </button>
                    &nbsp;&nbsp;{this.state.resume}
                  </div>
                  {!this.handleValidation() ? (
                    <div className="" style={{ color: "red" }}>
                      &nbsp;Please enter all the mandatory fields
                    </div>
                  ) : null}
                </div>
                <div className="job-application-consents ember-view">
                  We include a copy of your full profile with your application
                  <br></br>
                  We’ll save your answers to questions that tend to be common
                  across applications so you can use them later.
                </div>
                <div
                  className="modal-footer"
                  style={{ height: "60px", border: "none" }}
                >
                  {!this.handleValidation() ? (
                    <button
                      className="btn arteco-btn"
                      type="submit"
                      style={{ marginBottom: "100px" }}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="btn arteco-btn"
                      type="submit"
                      data-dismiss="modal"
                      style={{ marginBottom: "100px" }}
                      onClick={this.submitApply}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validateprofile(firstname, lastname, phonenumber, resume, address) {
  // true means invalid, so our conditions got reversed
  return {
    firstname: firstname.length === 0,
    lastname: lastname.length === 0,
    phonenumber: phonenumber.length < 10 || phonenumber.length > 10,
    resume: resume.length === 0,
    address: address.length === 0,
  };
}

function mapStateToProps(state) {
  return {
    getsavedjobs: state.getsavedjobs,
    applyjob: state.applyjob,
    getapplicantprofile: state.getapplicantprofile,
  };
}

export default withRouter(
  reduxForm({
    form: "View_Savedjobs",
  })(
    connect(mapStateToProps, { getsavedjobs, applyjob, getapplicantprofile })(
      ViewSavedJobs
    )
  )
);
