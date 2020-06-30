import React, { Component } from "react";
import "../../App.css";
import "../../jobsearch_wrapper.css";
import "./Easyapply.css";
import "../NavBar/NavBar.css";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import URI from "../../constants/URI";
import { userConstants } from "../../constants";
import { getapplicantprofile } from "../../Actions/applicant_login_profile_actions";
import { applyjob, logapplyapplicationtypes } from "../../Actions/actions_jobs";
import validator from "validator";

class JobApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      jobdetails: [],
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      address: "",
      city: "",
      profilephoto: "",
      resume: "",
      coverletter: "",
      ethnicity: "",
      question: "",
      uploadedresume: "",
      uploadcoverletter: "",
      sponsorship: false,
      disability: false,
      touchedprofile: {
        firstname: false,
        lastname: false,
        phonenumber: false,
        email: false,
      },
      touchedfields: {
        firstname: false,
        lastname: false,
        phonenumber: false,
        email: false,
        ethnicity: false,
        address: false,
        city: false,
        question: false,
        resume: false,
        coverletter: false,
        sponsorship: false,
        disability: false,
      },
    };

    this.submitApply = this.submitApply.bind(this);
    this.cancelApply = this.cancelApply.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.uploadresume = this.uploadresume.bind(this);
    this.uploadcoverletter = this.uploadcoverletter.bind(this);
    this.openResumeDialog = this.openResumeDialog.bind(this);
    this.openCoverletterDialog = this.openCoverletterDialog.bind(this);
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
          profilephoto: response.payload.data.profile.profilePicture,
          isLoading: false,
        });
      }
    });
  }

  componentWillMount() {
    var job = JSON.parse(localStorage.getItem("job"));
    this.setState({
      jobdetails: job,
    });
    console.log(job);
    localStorage.removeItem("job");
  }

  openResumeDialog = (e) => {
    document.getElementById("resume").click();
  };

  openCoverletterDialog = (e) => {
    document.getElementById("coverletter").click();
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

  uploadcoverletter = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);

    this.setState({
      coverletter: file.name,
      uploadedcoverletter: file,
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
      touchedfields: { ...this.state.touchedfields, [field]: true },
    });
  };

  halffilled = (field) => (evt) => {
    this.setState({
      touchedfields: { ...this.state.touchedfields, [field]: true },
    });
  };

  cancelApply = (e) => {
    var touchedfields = this.state.touchedfields;
    if (
      touchedfields.firstname ||
      touchedfields.lastname ||
      touchedfields.phonenumber ||
      touchedfields.email ||
      touchedfields.ethnicity ||
      touchedfields.address ||
      touchedfields.city ||
      touchedfields.question ||
      touchedfields.resume ||
      touchedfields.coverletter ||
      touchedfields.sponsorship ||
      touchedfields.disability
    ) {
      var halffilled = true;
    }
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    var data;
    if (halffilled) {
      data = {
        jobID: this.state.jobdetails._id,
        eventName: "HALF_FILL_FORM",
        applicantEmail: this.state.profile.email,
        recruiterEmail: this.state.jobdetails.posted_by,
        city: this.state.profile.city,
      };
      console.log("Application logged as half-filled");
    } else {
      data = {
        jobID: this.state.jobdetails._id,
        eventName: "JUST_READ_APPLICATION",
        applicantEmail: this.state.profile.email,
        recruiterEmail: this.state.jobdetails.posted_by,
        city: this.state.profile.city,
      };
      console.log("Application logged as just-read");
    }
    this.props.logapplyapplicationtypes(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        window.close();
      }
    });
  };

  handleValidation() {
    let formIsValid = false;
    const errors = validateprofile(
      this.state.firstname,
      this.state.lastname,
      this.state.phonenumber,
      this.state.email,
      this.state.address,
      this.state.city,
      this.state.resume
    );
    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.lastname &&
      !errors.phonenumber &&
      !errors.email &&
      !errors.address &&
      !errors.city &&
      !errors.resume
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  submitApply = () => {
    if (this.handleValidation()) {
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      const data = {
        jobID: this.state.jobdetails._id,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        applicantEmail: this.state.email,
        phoneNumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        diversity_question: this.state.ethnicity,
        disability_que: this.state.disability,
        sponsorship_que: this.state.sponsorship,
        howDidTheyHearAboutUs: this.state.question,
      };

      var formData = new FormData();
      formData.append("uploadedResume", this.state.uploadedresume);
      if (this.state.coverletter) {
        formData.append("uploadedcoverletter", this.state.uploadedcoverletter);
      }

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
          const data = {
            jobID: this.state.jobdetails._id,
            eventName: "COMPLETELY_FILL_FORM",
            applicantEmail: this.state.profile.email,
            recruiterEmail: this.state.jobdetails.posted_by,
            city: this.state.profile.city,
          };
          console.log("Application logged as just-read");
          this.props.logapplyapplicationtypes(data, token).then((response) => {
            console.log("Application logged as completely filled");
            if (response.payload.status === 200) {
              window.close();
            }
          });
        }
      });
    }
  };

  render() {
    const { profile, jobdetails } = this.state;
    const { isLoading } = this.state;
    if (!isLoading) {
      const errors = validateprofile(
        this.state.firstname,
        this.state.lastname,
        this.state.phonenumber,
        this.state.email,
        this.state.address,
        this.state.city,
        this.state.resume
      );
      var shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touchedprofile[field];
        return hasError ? shouldShow : false;
      };
    }
    return (
      <div className="jobsearch-wrapper">
        <div
          className="navbar fixed-top navbar-dark bg-dark"
          style={{ height: "52px" }}
        >
          <div className="home_wrapper">
            <div
              className="nav-main__content full-height display-flex align-items-center"
              role="navigation"
            >
              <h1 className="easy-apply-h1">
                <a className="navbar-brand" href="/">
                  <img src={"/images/linkedin-logo2.png"} alt="" />
                  &nbsp;Job Apply
                </a>
              </h1>
            </div>
          </div>
        </div>
        <div id="container-easyapply">
          <div className="wrapping-header">
            <div className="easyapply-header">
              <div className="company-logo">
                <img
                  src={jobdetails.company_logo}
                  alt=""
                  style={{ width: "70px", height: "70px" }}
                />
              </div>
              <div className="company-info-wrapper">
                <div className="company-info">
                  <div className="job-title">{jobdetails.title}</div>
                  <div className="company-name">{jobdetails.company}</div>
                  <div className="location-description">
                    {jobdetails.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="artdeco-scrolling-container">
          <div className="artdeco-tabpanel">
            <section className="section-profile ember-view">
              <div className="profile-title">LinkedIn profile</div>
              <div className="profile-entity">
                <figure>
                  {this.state.profilephoto === undefined ||
                  this.state.profilephoto === "" ||
                  this.state.profilephoto === null ? (
                    <img src="/images/avatar.png" alt="" />
                  ) : (
                    <img
                      src={
                        URI.ROOT_URL +
                        "/profilepictures/" +
                        this.state.profilephoto
                      }
                      alt=""
                    />
                  )}
                </figure>
                <dl>
                  <dt className="profile-name">
                    {profile.firstName}&nbsp;{profile.lastName}{" "}
                  </dt>
                  <dd className="profile-headline">{profile.profileSummary}</dd>
                </dl>
              </div>
            </section>
            <section
              className="section-profile ember-view"
              style={{ marginTop: "30px" }}
            >
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
                      htmlFor="position-address-typeahead"
                      className="mb1 required"
                    >
                      Address*
                    </label>
                    <input
                      className="form-control"
                      name="address"
                      onChange={this.changeHandler}
                      onBlur={this.handleBlur("address")}
                      id="position-address-typeahead"
                      maxLength="100"
                      type="text"
                    />
                  </div>
                  <div className="col-xs-6 col-md-6">
                    <label
                      htmlFor="position-city-typeahead"
                      className="mb1 required"
                    >
                      City*
                    </label>
                    <input
                      className="form-control"
                      name="city"
                      onChange={this.changeHandler}
                      onBlur={this.handleBlur("city")}
                      id="position-city-typeahead"
                      maxLength="100"
                      type="text"
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
                      {shouldMarkError("city") ? (
                        <div className="" style={{ color: "red" }}>
                          City is a required field
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="row form-group">
                  <div className="col-xs-6 col-md-6">
                    <label
                      htmlFor="phone-number-question"
                      className="question-apply"
                    >
                      Phone Number*
                    </label>
                    <input
                      className="form-control"
                      name="phonenumber"
                      id="phone-number-question"
                      onChange={this.changeHandler}
                      type="text"
                      pattern="[0-9]{10}"
                      onBlur={this.handleBlur("phonenumber")}
                      placeholder="1234567890"
                    />
                  </div>
                  <div className="col-xs-6 col-md-6">
                    <label htmlFor="email-question" className="question-apply">
                      Email Address*
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      id="email-question"
                      onChange={this.changeHandler}
                      maxLength="100"
                      type="email"
                      onBlur={this.handleBlur("email")}
                    />
                  </div>

                  {!isLoading ? (
                    <div className="col-xs-6 col-md-6">
                      {shouldMarkError("phonenumber") ? (
                        <div className="" style={{ color: "red" }}>
                          Phone Number is a required field
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {!isLoading ? (
                    <div className="col-xs-6 col-md-6">
                      {shouldMarkError("email") ? (
                        <div className="" style={{ color: "red" }}>
                          Email is a required field
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="row form-group">
                  <div className="col-xs-6 col-md-6">
                    <label
                      htmlFor="ethnicity-question"
                      className="question-apply"
                    >
                      Ethnicity
                    </label>
                    <input
                      className="form-control"
                      name="ethnicity"
                      id="ethnicity-question"
                      onBlur={this.halffilled("ethnicity")}
                      onChange={this.changeHandler}
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="col-xs-6 col-md-6">
                    <label
                      htmlFor="question-question"
                      className="question-apply"
                    >
                      How did you hear about us?
                    </label>
                    <input
                      className="form-control"
                      name="question"
                      id="question-question"
                      onBlur={this.halffilled("question")}
                      onChange={this.changeHandler}
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
              </li>
            </section>
            <section className="section-profile ember-view">
              <div className="question-apply">
                Will you now, or in the future, require sponsorship for
                employment visa status (e.g. H-1B visa status)? *
              </div>
              <div className="radio">
                <h4>
                  <label>
                    <input
                      type="radio"
                      value="True"
                      name="sponsorship"
                      onBlur={this.halffilled("sponsorship")}
                      onChange={this.changeHandler}
                    />
                    &nbsp;&nbsp;Yes
                  </label>{" "}
                </h4>
                <h4>
                  <label>
                    <input
                      type="radio"
                      value="False"
                      checked={this.state.sponsorship === "False"}
                      onBlur={this.halffilled("sponsorship")}
                      name="sponsorship"
                      onChange={this.changeHandler}
                    />
                    &nbsp;&nbsp;No
                  </label>{" "}
                </h4>
                <br />
              </div>

              <div className="question-apply">
                Do you have a physical, sensory, or mental condition that
                substantially limits any of your major life functions?*
              </div>
              <div className="radio">
                <h4>
                  <label>
                    <input
                      type="radio"
                      value="True"
                      name="disability"
                      onBlur={this.halffilled("disability")}
                      onChange={this.changeHandler}
                    />
                    &nbsp;&nbsp;Yes
                  </label>{" "}
                </h4>
                <h4>
                  <label>
                    <input
                      type="radio"
                      value="False"
                      checked={this.state.disability === "False"}
                      onBlur={this.halffilled("disability")}
                      name="disability"
                      onChange={this.changeHandler}
                    />
                    &nbsp;&nbsp;No
                  </label>{" "}
                </h4>
                <br />
              </div>
            </section>
            <section className="section-profile ember-view">
              <div className="profile-title" style={{ fontSize: "19px" }}>
                Resume
              </div>
              <div className="form-group">
                <input
                  type="file"
                  id="resume"
                  onChange={this.uploadresume}
                  onBlur={this.halffilled("resume")}
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
              <div className="profile-title" style={{ fontSize: "19px" }}>
                Coverletter
              </div>
              <div className="form-group">
                <input
                  type="file"
                  id="coverletter"
                  onBlur={this.halffilled("coverletter")}
                  onChange={this.uploadcoverletter}
                  style={{ display: "none" }}
                />
                <button
                  type="file"
                  className="btn arteco-btn-save"
                  id="position-coverletter-typeahead"
                  onClick={this.openCoverletterDialog}
                  style={{ width: "180px" }}
                >
                  Upload Coverletter
                </button>
                &nbsp;&nbsp;{this.state.coverletter}
              </div>
              <div className="job-application-consents ember-view">
                We include a copy of your full profile with your application
                <br></br>
                We’ll save your answers to questions that tend to be common
                across applications so you can use them later.
              </div>
            </section>
            {!this.handleValidation() ? (
              <div className="" style={{ color: "red" }}>
                &nbsp;Please enter all the mandatory fields
              </div>
            ) : null}
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
                style={{ marginBottom: "100px" }}
                onClick={this.submitApply}
              >
                Submit
              </button>
            )}
            <button
              className="btn arteco-btn"
              type="submit"
              style={{ marginBottom: "100px", marginLeft: "20px" }}
              onClick={this.cancelApply}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function validateprofile(
  firstname,
  lastname,
  phonenumber,
  email,
  address,
  city,
  resume
) {
  // true means invalid, so our conditions got reversed
  return {
    firstname: firstname.length === 0,
    lastname: lastname.length === 0,
    phonenumber: phonenumber.length < 10 || phonenumber.length > 10,
    email: validator.isEmail(email) ? false : true,
    address: address.length === 0,
    city: city.length === 0,
    resume: resume.length === 0,
  };
}

function mapStateToProps(state) {
  return {
    getapplicantprofile: state.getapplicantprofile,
    applyjob: state.applyjob,
    logapplyapplicationtypes: state.logapplyapplicationtypes,
  };
}

export default withRouter(
  reduxForm({
    form: "Job_Apply",
  })(
    connect(mapStateToProps, {
      getapplicantprofile,
      applyjob,
      logapplyapplicationtypes,
    })(JobApply)
  )
);
