import React, { Component } from "react";
import "../../App.css";
import "../../profile_wrapper.css";
import { reduxForm } from "redux-form";
import { Redirect } from "react-router";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getapplicantprofile } from "../../Actions/applicant_login_profile_actions";
import {
  saveajob,
  applyjob,
  logapplyapplicationtypes,
} from "../../Actions/actions_jobs";

class Viewjob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      saved: false,
      loggedin: true,
      isloading: true,
    };
    this.signout = this.signout.bind(this);
    this.saveajob = this.saveajob.bind(this);
  }

  signout = () => {
    localStorage.clear();
    this.setState({
      loggedin: false,
    });
  };

  componentDidMount() {
    var viewjob = this.props.location.state.viewjob;
    this.setState({
      jobs: viewjob,
    });
    const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
      .email;
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.getapplicantprofile(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var savedJobs = response.payload.data.profile.savedJobs;
        this.setState({
          saved: savedJobs.includes(viewjob._id),
          isloading: false,
        });
      }
    });
  }

  saveajob = () => {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    var data = {
      applicantEmail: JSON.parse(
        localStorage.getItem(userConstants.USER_DETAILS)
      ).email,
      jobID: this.state.jobs._id,
    };
    this.props.saveajob(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        this.setState({
          saved: true,
        });
      }
    });
  };

  normalapplyjob = (event, job) => {
    var applyjob = JSON.stringify(job);
    var id = JSON.parse(applyjob)._id;
    window.open("/applyjob/" + id, "_blank");
    localStorage.setItem("job", applyjob);
  };

  render() {
    console.log(typeof this.state.jobs.applications);
    var jobs = this.state.jobs;
    let redirectVar = null;
    if (!this.state.loggedin) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div className="jobsearch-wrapper">
        <div
          className="navbar fixed-top navbar-dark bg-dark"
          style={{ height: "52px" }}
        >
          {redirectVar}
          <div className="home_wrapper">
            <h1>
              <a
                className="navbar-brand"
                style={{ paddingBottom: "0px" }}
                href="/"
              >
                <img src={"/images/linkedin-logo2.png"} alt="LinkedIn" />
              </a>
            </h1>
            <div
              className="nav-main__content full-height display-flex"
              style={{ margin: "10px" }}
            >
              <div
                className="nav-main nav-container display-flex full-height"
                role="navigation"
                aria-label="primary"
              >
                <span className="nav-item nav-item__icon">
                  <li className="nav-item--jobs">
                    <a
                      href="/mynetwork"
                      className="nav-item__link nav-item__link--underline js-nav-item-link"
                    >
                      <FontAwesomeIcon
                        color="#dee2e6"
                        size="lg"
                        icon="users"
                      ></FontAwesomeIcon>
                      <small
                        className="nocolor small"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        My Network
                      </small>
                    </a>
                  </li>
                </span>
                <span className="nav-item nav-item__icon">
                  <li className="nav-item--jobs">
                    <a
                      href="/searchjobs"
                      className="nav-item__link nav-item__link--underline js-nav-item-link"
                    >
                      <FontAwesomeIcon
                        color="#dee2e6"
                        size="lg"
                        icon="suitcase"
                      ></FontAwesomeIcon>
                      <small className="nocolor small">Jobs</small>
                    </a>
                  </li>
                </span>
                <span className="nav-item nav-item__icon">
                  <li className="nav-item--messaging">
                    <Link
                      to="/messages"
                      className="nav-item__link nav-item__link--underline js-nav-item-link"
                    >
                      <FontAwesomeIcon
                        color="#dee2e6"
                        size="lg"
                        icon="comments"
                      ></FontAwesomeIcon>
                      <small className="nocolor small">Messaging</small>
                    </Link>
                  </li>
                </span>
                <span className="nav-item nav-item__icon">
                  <li className="nav-item--profile">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="nav-item__link nav-item__link--underline js-nav-item-link dropdown-toggle"
                        id="dropdownMenuProfile"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon
                          color="#dee2e6"
                          size="lg"
                          icon="user-circle"
                        ></FontAwesomeIcon>
                        <small className="nocolor small">Me</small>
                      </button>
                      <div
                        className="dropdown-menu selection-nav"
                        aria-labelledby="dropdownMenuProfile"
                      >
                        <a className="dropdown-item" href="/profile">
                          Profile
                        </a>
                        <a className="dropdown-item" href="/applicantdashboard">
                          Dashboard
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/searchjobs">
                          Job Postings
                        </a>
                        <a className="dropdown-item" href="/job/saved">
                          Saved Jobs
                        </a>
                        <div className="dropdown-divider"></div>
                        <a
                          className="dropdown-item"
                          onClick={this.signout}
                          href=" "
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </li>
                </span>
              </div>
              <div
                className="nav-side nav-container display-flex full-height"
                role="navigation"
                aria-label="primary"
              >
                <span className="nav-item nav-item__icon">
                  <li className="nav-item--postjobs">
                    <a
                      href="/jobs"
                      className="nav-item__link nav-item__link--underline js-nav-item-link"
                    >
                      <FontAwesomeIcon
                        color="#dee2e6"
                        size="lg"
                        icon="calendar-alt"
                      ></FontAwesomeIcon>
                      <small
                        className="nocolor small"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Post a Job
                      </small>
                    </a>
                  </li>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="Elevation-2dp profile-background-image profile-background-image--loading ember-view"></div>
        <div className="pv-content1 profile-view-grid neptune-grid2 two-column">
          <div className="core-rail">
            <div className="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
              <div className="mt4 display-flex ember-view">
                <div className="pv-entity__actions"></div>
                <div className="media">
                  <a href=" " className="pull-left">
                    <img
                      src={jobs.company_logo}
                      alt=""
                      style={{ height: "150px", width: "150px" }}
                    />
                  </a>
                  <div className="artdeco-entity-lockup--size-4 gap1">
                    <div className="job-details__subject">{jobs.title}</div>
                    <div className="job-details__name">{jobs.company}</div>
                    <div className="job-details__location">
                      <FontAwesomeIcon
                        className="fa-map-marker-alt"
                        icon="map-marker-alt"
                      ></FontAwesomeIcon>
                      &nbsp;&nbsp;{jobs.location}
                    </div>
                    {!this.state.isloading ? (
                      <div className="job-details__posted">
                        Posted on{" "}
                        {jobs.posted_date
                          .slice(0, new Date().toISOString().indexOf("T"))
                          .replace(/-/g, "/")}
                      </div>
                    ) : null}
                    {!this.state.isloading ? (
                      <div className="row form-group">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="job-details__posted">
                          {jobs.no_of_views === undefined
                            ? 0
                            : jobs.no_of_views}
                          &nbsp;view(s)
                        </div>
                        <div className="job-details__posted">
                          &nbsp;&nbsp;{jobs.applications.length}
                          &nbsp;applicant(s) applied
                        </div>
                      </div>
                    ) : null}
                    <div className="row form-group" style={{ width: "400px" }}>
                      {!this.state.saved ? (
                        <button
                          type="submit"
                          className="btn arteco-btn-save"
                          onClick={this.saveajob}
                        >
                          Save
                        </button>
                      ) : null}
                      {jobs.application_method === "Easy Apply" ? (
                        <Easyapply
                          applyjob={this.props.applyjob}
                          logapplyapplicationtypes={
                            this.props.logapplyapplicationtypes
                          }
                          getapplicantprofile={this.props.getapplicantprofile}
                          id={jobs._id}
                          jobdetails={jobs}
                        />
                      ) : (
                        <button
                          type="submit"
                          className="btn arteco-btn"
                          onClick={(event) => this.normalapplyjob(event, jobs)}
                          style={{ marginLeft: "10px" }}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-profile-section artdeco-container-card ember-view gap">
              <header className="pv-profile-section__card-header">
                <h2 className=" t-20 t-black t-bold ">Job Description</h2>
              </header>
              <div className="pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                <li className="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view">
                  <div className="pv-entity__actions"></div>
                  <div className="ember-view">
                    <p className="pv-entity__description t-14 t-black t-normal ember-view">
                      {jobs.job_description}
                    </p>
                  </div>
                  <div className="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                    <h5 className="t-20 t-black t-bold">Job Functions</h5>
                    <h5
                      className="t-black t-normal"
                      style={{ fontSize: "1rem" }}
                    >
                      {jobs.job_function}
                    </h5>
                  </div>
                  <div className="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                    <h5 className="t-20 t-black t-bold">Job Type</h5>
                    <h5
                      className="t-black t-normal"
                      style={{ fontSize: "1rem" }}
                    >
                      {jobs.employment_type}
                    </h5>
                  </div>
                  <div className="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                    <h5 className="t-20 t-black t-bold">Industry</h5>
                    <h5
                      className="t-black t-normal"
                      style={{ fontSize: "1rem" }}
                    >
                      {jobs.industry}
                    </h5>
                  </div>
                </li>
              </div>
            </div>
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
      city: "",
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
          city: response.payload.data.profile.city,
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
        city: this.state.city,
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
            if (response.payload.status === 200) {
              console.log("Applied job Successfully");
              const data = {
                jobID: this.props.id,
                eventName: "COMPLETELY_FILL_FORM",
                applicantEmail: this.state.email,
                recruiterEmail: this.props.jobdetails.posted_by,
                city: this.state.profile.city,
              };
              this.props
                .logapplyapplicationtypes(data, token)
                .then((response) => {
                  console.log("Application logged as completely filled");
                  if (response.payload.status === 200) {
                    window.close();
                  }
                });
            }
          }
        });
      } else {
        console.log("else", data);
        this.props.applyjob(data, token).then((response) => {
          console.log("response:", response);
          if (response.payload.status === 200) {
            console.log("Applied job Successfully");
            if (response.payload.status === 200) {
              console.log("Applied job Successfully");
              const data = {
                jobID: this.props.id,
                eventName: "COMPLETELY_FILL_FORM",
                applicantEmail: this.state.email,
                recruiterEmail: this.props.jobdetails.posted_by,
                city: this.state.profile.city,
              };
              this.props
                .logapplyapplicationtypes(data, token)
                .then((response) => {
                  console.log("Application logged as completely filled");
                  if (response.payload.status === 200) {
                    window.close();
                  }
                });
            }
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
      <div style={{ width: "200px" }}>
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
    saveajob: state.saveajob,
    getapplicantprofile: state.getapplicantprofile,
    applyjob: state.applyjob,
    logapplyapplicationtypes: state.logapplyapplicationtypes,
  };
}

export default withRouter(
  reduxForm({
    form: "View_Job",
  })(
    connect(mapStateToProps, {
      saveajob,
      getapplicantprofile,
      applyjob,
      logapplyapplicationtypes,
    })(Viewjob)
  )
);
