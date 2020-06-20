import React, { Component } from "react";
import "../../App.css";
import "../../profile_wrapper.css";
import Navbar from "../NavBar/Navbar";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userConstants } from "../../constants";
import URI from "../../constants/URI";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  getapplicantprofile,
  applicantprofilephoto,
  applicantprofilesummary,
  applicantprofileexperience,
  applicantprofileeducation,
  applicantprofileskills,
  applicantprofiledelete,
} from "../../Actions/applicant_login_profile_actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      state: "",
      zipcode: "",
      skills: "",
      updatedskills: "",
      profilesummary: "",
      phonenumber: "",
      address: "",
      profilePicture: "",
      experience: [{}],
      education: [{}],
      resume: "",
      uploadedresume: "",
      touchedprofile: {
        firstname: false,
        lastname: false,
        state: false,
        zipcode: false,
      },
      profiledata: [],
      isLoading: true,
      alert: null,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.profilephotochangeHandler = this.profilephotochangeHandler.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.deleteProfileConfirm = this.deleteProfileConfirm.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.uploadresume = this.uploadresume.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    this.setState(data);
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
      .email;
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.getapplicantprofile(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        this.setState({
          profiledata: response.payload.data.profile,
          firstname: response.payload.data.profile.firstName,
          lastname: response.payload.data.profile.lastName,
          profilesummary:
            response.payload.data.profile.profileSummary === undefined || ""
              ? ""
              : response.payload.data.profile.profileSummary,
          state: response.payload.data.profile.state,
          zipcode: response.payload.data.profile.zipcode,
          phonenumber:
            response.payload.data.profile.phoneNumber === undefined ||
            null ||
            "" ||
            0
              ? ""
              : response.payload.data.profile.phoneNumber,
          address:
            response.payload.data.profile.address === undefined || ""
              ? ""
              : response.payload.data.profile.address,
          experience: response.payload.data.profile.experience,
          education: response.payload.data.profile.education,
          skills:
            response.payload.data.profile.skills === undefined || ""
              ? ""
              : response.payload.data.profile.skills,
          updatedskills:
            response.payload.data.profile.skills === undefined || ""
              ? ""
              : response.payload.data.profile.skills,
          profilePicture: response.payload.data.profile.profilePicture,
          isLoading: false,
        });
      }
      this.refs.myfirstname.value = this.state.profiledata.firstName;
      this.refs.mylastname.value = this.state.profiledata.lastName;
      this.refs.myprofilesummary.value = this.state.profiledata.profileSummary;
      this.refs.mystate.value = this.state.profiledata.state;
      this.refs.myzipcode.value = this.state.profiledata.zipcode;
      this.refs.myphonenumber.value =
        this.state.profiledata.phonenumber === undefined || null || "" || 0
          ? ""
          : response.payload.data.profile.phoneNumber;
      this.refs.myaddress.value = this.state.profiledata.address;
      this.refs.myskills.value = this.state.profiledata.skills;
    });
  }

  updateSkills() {
    const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
      .email;
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    var data = {
      email: email,
      skills: this.state.skills,
    };
    this.props.applicantprofileskills(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        console.log("Profile Skills Updated Successfully");
        this.setState({ updatedskills: this.state.skills });
      }
    });
  }

  openFileDialog = (e) => {
    document.getElementById("fileid").click();
  };

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

  profilephotochangeHandler = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);

    const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
      .email;
    var formData = new FormData();
    formData.append("email", email);
    formData.append("uploadedPhoto", file);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.applicantprofilephoto(formData, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        console.log(
          "Profile Image Updated Successfully",
          response.payload.data.profile
        );
        this.setState({
          profiledata: {
            ...this.state.profiledata,
            profilePicture: response.payload.data.profile.profilePicture,
          },
          profilePicture: response.payload.data.profile.profilePicture,
        });
      }
    });
  };

  changeHandler = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: e.target.value,
    };

    this.setState(state);
  };

  submitProfile = () => {
    if (this.handleValidationProfile()) {
      const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
        .email;
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      const data = {
        email: email,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        state: this.state.state,
        zipcode: this.state.zipcode,
        address: this.state.address,
        profileSummary: this.state.profilesummary,
        phoneNumber: this.state.phonenumber === "" ? 0 : this.state.phonenumber,
        resume: this.state.resume,
      };

      var formData = new FormData();
      formData.append("uploadedFile", this.state.uploadedresume);

      Object.keys(data).forEach(function (key) {
        formData.append(key, data[key]);
      });

      // Display the formdata key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const state = {
        ...this.state,
        profiledata: {
          ...this.state.profiledata,
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          state: this.state.state,
          zipcode: this.state.zipcode,
          address: this.state.address,
          profileSummary: this.state.profilesummary,
          phoneNumber: this.state.phonenumber,
          resume: this.state.resume,
        },
      };
      this.setState(state);
      this.props.applicantprofilesummary(formData, token).then((response) => {
        console.log("response:", response);
        if (response.payload.status === 200) {
          console.log("Profile Summary Updated Successfully");
          this.setState({
            profiledata: { ...this.state.profiledata },
          });
        }
      });
    }
  };

  deleteProfileConfirm = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={this.deleteProfile}
        onCancel={this.cancelDelete}
      >
        You will not be able to recover your profile!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  };

  cancelDelete = () => {
    this.setState({
      alert: null,
    });
  };

  deleteProfile = () => {
    const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
      .email;
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

    this.props.applicantprofiledelete(email, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        console.log("Profile Deleted Successfully");
        localStorage.clear();
        window.location = "/";
      }
    });
  };

  shouldComponentUpdate(nextState) {
    if (nextState.profiledata !== this.state.profiledata) {
      return true;
    } else {
      return false;
    }
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touchedprofile: { ...this.state.touchedprofile, [field]: true },
    });
  };

  handleValidationProfile() {
    let formIsValid = false;
    const errors = validateprofile(
      this.state.firstname,
      this.state.lastname,
      this.state.state,
      this.state.zipcode
    );
    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.lastname &&
      !errors.state &&
      !errors.zipcode
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  getExperienceContents() {
    var self = this;
    const { experience, isLoading } = this.state;
    if (!isLoading) {
      return Object.keys(experience).map(function (i) {
        return (
          <li
            className="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view"
            key={i}
          >
            <EditExperience
              experience={experience[i]}
              experiencelist={self.state.experience}
              id={i}
              handleChange={self.handleChange}
              applicantprofileexperience={self.props.applicantprofileexperience}
            />
            <div className="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
              <h3 className="t-16 t-black t-bold">{experience[i].title}</h3>
              <h4 className="t-16 t-black-light t-normal">
                {experience[i].company}
              </h4>
              <h4 className="t-14 t-black-light t-normal">
                {experience[i].location}
              </h4>
            </div>
            <div className="ember-view">
              <p className="pv-entity__description t-14 t-black t-normal ember-view">
                {experience[i].description}
              </p>
            </div>
          </li>
        );
      });
    }
  }

  getEducationContents() {
    var self = this;
    const { education, isLoading } = this.state;
    if (!isLoading) {
      return Object.keys(education).map(function (i) {
        return (
          <li
            className="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view"
            key={i}
          >
            <EditEducation
              education={education[i]}
              id={i}
              educationlist={self.state.education}
              handleChange={self.handleChange}
              applicantprofileeducation={self.props.applicantprofileeducation}
            />
            <div className="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
              <h3 className="t-16 t-black t-bold">{education[i].school}</h3>
              <h4 className="t-16 t-black-light t-normal">
                {education[i].degree}
              </h4>
              <h4 className="t-14 t-black-light t-normal">
                {education[i].schoolfromYear}&nbsp;-&nbsp;
                {education[i].schooltoYear}
              </h4>
            </div>
            <div className="ember-view">
              <p className="pv-entity__description t-14 t-black t-normal ember-view">
                {education[i].description}
              </p>
            </div>
          </li>
        );
      });
    }
  }

  render() {
    const { isLoading } = this.state;
    if (!isLoading) {
      const errors = validateprofile(
        this.state.firstname,
        this.state.lastname,
        this.state.state,
        this.state.zipcode
      );
      var shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touchedprofile[field];
        return hasError ? shouldShow : false;
      };
    }

    return (
      <div className="profile-wrapper">
        <Navbar></Navbar>
        <div className="pv-content profile-view-grid neptune-grid2 two-column">
          <div className="core-rail">
            <div className="Elevation-2dp profile-background-image profile-background-image--loading ember-view"></div>
            <div className="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
              <div className="mt4 display-flex ember-view">
                <div
                  className="modal fade  bd-example-modal-lg"
                  id="profilemodal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="profilemodallabel"
                  aria-hidden="true"
                  style={{ marginTop: "40px" }}
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="profilemodallabel">
                          Edit Intro
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
                        <div className="row form-group">
                          <div className="col-xs-6 col-md-6">
                            <label
                              htmlFor="position-firstname-typeahead"
                              className="mb1 required"
                            >
                              First Name
                            </label>
                            <input
                              className="form-control"
                              name="firstname"
                              ref="myfirstname"
                              onChange={this.changeHandler}
                              id="position-firstname-typeahead"
                              onBlur={this.handleBlur("firstname")}
                              maxLength="100"
                              type="text"
                            />
                          </div>
                          <div className="col-xs-6 col-md-6">
                            <label
                              htmlFor="position-lastname-typeahead"
                              className="mb1 required"
                            >
                              Last Name
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
                                  &nbsp;First Name is a required field
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                          {!isLoading ? (
                            <div className="col-xs-6 col-md-6">
                              {shouldMarkError("lastname") ? (
                                <div className="" style={{ color: "red" }}>
                                  &nbsp;Last Name is a required field
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>

                        <label
                          htmlFor="position-profilesummary-typeahead"
                          className="mb1 required"
                        >
                          Profile Summary
                        </label>
                        <textarea
                          className="form-control"
                          name="profilesummary"
                          ref="myprofilesummary"
                          onChange={this.changeHandler}
                          id="position-profilesummary-typeahead"
                        />
                        <div className="row form-group">
                          <div className="col-xs-6 col-md-6">
                            <label
                              htmlFor="position-state-typeahead"
                              className="mb1 required"
                            >
                              State
                            </label>
                            <select
                              className="form-control"
                              name="state"
                              ref="mystate"
                              onChange={this.changeHandler}
                              onBlur={this.handleBlur("state")}
                              id="position-state-typeahead"
                              maxLength="100"
                              type="text"
                            >
                              <option value="">United States</option>
                              <option value="Alabama">Alabama</option>
                              <option value="Alaska">Alaska</option>
                              <option value="Arizona">Arizona</option>
                              <option value="Arkansas">Arkansas</option>
                              <option value="California">California</option>
                              <option value="Colorado">Colorado</option>
                              <option value="Connecticut">Connecticut</option>
                              <option value="Delaware">Delaware</option>
                              <option value="District Of Columbia">
                                District Of Columbia
                              </option>
                              <option value="Florida">Florida</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Hawaii">Hawaii</option>
                              <option value="Idaho">Idaho</option>
                              <option value="Illinois">Illinois</option>
                              <option value="Indiana">Indiana</option>
                              <option value="Iowa">Iowa</option>
                              <option value="Kansas">Kansas</option>
                              <option value="Kentucky">Kentucky</option>
                              <option value="Louisiana">Louisiana</option>
                              <option value="Maine">Maine</option>
                              <option value="Maryland">Maryland</option>
                              <option value="Massachusetts">
                                Massachusetts
                              </option>
                              <option value="Michigan">Michigan</option>
                              <option value="Minnesota">Minnesota</option>
                              <option value="Mississippi">Mississippi</option>
                              <option value="Missouri">Missouri</option>
                              <option value="Montana">Montana</option>
                              <option value="Nebraska">Nebraska</option>
                              <option value="Nevada">Nevada</option>
                              <option value="New Hampshire">
                                New Hampshire
                              </option>
                              <option value="New Jersey">New Jersey</option>
                              <option value="New Mexico">New Mexico</option>
                              <option value="New York">New York</option>
                              <option value="North Carolina">
                                North Carolina
                              </option>
                              <option value="North Dakota">North Dakota</option>
                              <option value="Ohio">Ohio</option>
                              <option value="Oklahoma">Oklahoma</option>
                              <option value="Oregon">Oregon</option>
                              <option value="Pennsylvania">Pennsylvania</option>
                              <option value="Rhode Island">Rhode Island</option>
                              <option value="South Carolina">
                                South Carolina
                              </option>
                              <option value="South Dakota">South Dakota</option>
                              <option value="Tennessee">Tennessee</option>
                              <option value="Texas">Texas</option>
                              <option value="Utah">Utah</option>
                              <option value="Vermont">Vermont</option>
                              <option value="Virginia">Virginia</option>
                              <option value="Washington">Washington</option>
                              <option value="West Virginia">
                                West Virginia
                              </option>
                              <option value="Wisconsin">Wisconsin</option>
                              <option value="Wyoming">Wyoming</option>
                            </select>
                          </div>

                          <div className="col-xs-6 col-md-6">
                            <label
                              htmlFor="position-zip-typeahead"
                              className="mb1 required"
                            >
                              Zip Code
                            </label>
                            <input
                              className="form-control"
                              name="zipcode"
                              ref="myzipcode"
                              onChange={this.changeHandler}
                              onBlur={this.handleBlur("zipcode")}
                              id="position-lastname-typeahead"
                              pattern="[0-9]{5}"
                              placeholder="Five digit zip code"
                              type="text"
                            />
                          </div>
                          {!isLoading ? (
                            <div className="col-xs-6 col-md-6">
                              {shouldMarkError("state") ? (
                                <div className="" style={{ color: "red" }}>
                                  &nbsp;State is a required field
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                          {!isLoading ? (
                            <div className="col-xs-6 col-md-6">
                              {shouldMarkError("zipcode") ? (
                                <div className="" style={{ color: "red" }}>
                                  &nbsp;Zipcode is a required field
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>

                        <label
                          htmlFor="position-phone-typeahead"
                          className="mb1 required"
                        >
                          Phone Number
                        </label>
                        <input
                          className="form-control"
                          name="phonenumber"
                          ref="myphonenumber"
                          onChange={this.changeHandler}
                          id="position-phone-typeahead"
                          pattern="[0-9]{10}"
                          placeholder="1234567890"
                          type="number"
                        />

                        <label
                          htmlFor="position-address-typeahead"
                          className="mb1 required"
                        >
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          name="address"
                          ref="myaddress"
                          onChange={this.changeHandler}
                          id="position-address-typeahead"
                        />

                        <label
                          htmlFor="position-resume-typeahead"
                          className="mb1 required"
                        >
                          Add your Resume
                        </label>
                        <div className="form-group">
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
                          >
                            Upload
                          </button>
                          &nbsp;&nbsp;{this.state.resume}
                        </div>

                        <div className="modal-footer">
                          {!this.handleValidationProfile() ? (
                            <div className="" style={{ color: "red" }}>
                              &nbsp;Please enter all fields
                            </div>
                          ) : null}
                          <button
                            type="button"
                            className="btn arteco-btn-save"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          {!this.handleValidationProfile() ? (
                            <button
                              type="submit"
                              className="btn arteco-btn"
                              style={{ width: "150px" }}
                            >
                              Save changes
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn arteco-btn"
                              data-dismiss="modal"
                              onClick={this.submitProfile}
                              style={{ width: "150px" }}
                            >
                              Save changes
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="pv-entity__actions"
                  data-toggle="modal"
                  data-target="#profilemodal"
                >
                  <FontAwesomeIcon
                    icon="pencil-alt"
                    color="#0073b1"
                    size="lg"
                  />
                </div>
                <div className="row">
                  <div className="col-md-12" style={{ width: "800px" }}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-4 text-center">
                        {this.state.profiledata.profilePicture === undefined ||
                        this.state.profiledata.profilePicture === "" ||
                        this.state.profiledata.profilePicture === null ? (
                          <img
                            src="/images/avatar.png"
                            alt=""
                            className="center-block img-circle rounded-circle img-thumbnail img-responsive"
                          />
                        ) : (
                          <img
                            src={
                              URI.ROOT_URL +
                              "/profilepictures/" +
                              this.state.profiledata.profilePicture
                            }
                            alt=""
                            className="center-block img-circle rounded-circle img-thumbnail img-responsive"
                            style={{ width: "160px", height: "160px" }}
                          />
                        )}
                        <div className="rank-label-container">
                          <input
                            id="fileid"
                            type="file"
                            onChange={this.profilephotochangeHandler}
                            hidden
                          />
                          <button
                            type="file"
                            className="btn btn-default btn-icon-circle"
                            onClick={this.openFileDialog}
                          >
                            <FontAwesomeIcon
                              icon="pencil-alt"
                              color="black"
                              size="lg"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <h3>
                          {this.state.profiledata.firstName}&nbsp;
                          {this.state.profiledata.lastName}
                        </h3>
                        <p>{this.state.profiledata.state}</p>
                        {this.state.profiledata.address ? (
                          <p>
                            <strong>Address: </strong>{" "}
                            {this.state.profiledata.address}{" "}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <hr />
                    {this.state.profiledata.profileSummary ? (
                      <p>
                        <strong>Profile Summary: </strong>
                        {this.state.profiledata.profileSummary}
                      </p>
                    ) : null}
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            <div className="pv-profile-section artdeco-container-card ember-view gap">
              <header className="pv-profile-section__card-header">
                <Experience
                  experiencelist={this.state.experience}
                  handleChange={this.handleChange}
                  applicantprofileexperience={
                    this.props.applicantprofileexperience
                  }
                ></Experience>
                <h2 className="pv-profile-section__card-heading t-20 t-black t-normal">
                  Experience
                </h2>
              </header>
              <div className="pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                {this.getExperienceContents()}
              </div>
            </div>

            <div className="pv-profile-section artdeco-container-card ember-view gap">
              <header className="pv-profile-section__card-header">
                <Education
                  educationlist={this.state.education}
                  handleChange={this.handleChange}
                  applicantprofileeducation={
                    this.props.applicantprofileeducation
                  }
                ></Education>
                <h2 className="pv-profile-section__card-heading t-20 t-black t-normal">
                  Education
                </h2>
              </header>
              <div className="pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                {this.getEducationContents()}
              </div>
            </div>

            <div className="pv-profile-section artdeco-container-card ember-view gap">
              <header className="pv-profile-section__card-header">
                <div
                  className="modal fade  bd-example-modal-lg"
                  id="skillsmodal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="skillsmodallabel"
                  aria-hidden="true"
                  style={{ marginTop: "40px" }}
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="skillsmodallabel">
                          Add Skills
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
                        <textarea
                          className="form-control"
                          ref="myskills"
                          name="skills"
                          onChange={this.changeHandler}
                          id="position-description-typeahead"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn arteco-btn-save"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn arteco-btn"
                          data-dismiss="modal"
                          onClick={this.updateSkills}
                          style={{ width: "150px" }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="pv-entity__actions"
                  data-toggle="modal"
                  data-target="#skillsmodal"
                >
                  <FontAwesomeIcon
                    icon="pencil-alt"
                    color="#0073b1"
                    size="lg"
                  />
                </div>

                <h2 className="pv-profile-section__card-heading t-20 t-black t-normal">
                  Skills
                </h2>
              </header>
              <div className="pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                <li className="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view">
                  <div className="ember-view">
                    <p className="pv-entity__description t-14 t-black t-normal ember-view">
                      {this.state.updatedskills}
                    </p>
                  </div>
                </li>
              </div>
            </div>
            <button
              type="submit"
              className="btn arteco-btn"
              onClick={this.deleteProfileConfirm}
              style={{ width: "150px" }}
            >
              Delete Profile
            </button>
            {this.state.alert}
          </div>
        </div>
      </div>
    );
  }
}

class EditExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.experience.title,
      company: this.props.experience.company,
      location: this.props.experience.location,
      fromMonth: this.props.experience.fromMonth,
      fromYear: this.props.experience.fromYear,
      description: this.props.experience.description,
      id: this.props.id,
      touchedexperience: {
        title: false,
        company: false,
        location: false,
        fromMonth: false,
        fromYear: false,
      },
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitExperience = this.submitExperience.bind(this);
  }

  submitExperience = () => {
    if (this.handleValidationExperience()) {
      const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
        .email;
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      var editedExperience = {
        title: this.state.title,
        company: this.state.company,
        location: this.state.location,
        fromMonth: this.state.fromMonth,
        fromYear: this.state.fromYear,
        description: this.state.description,
      };
      var experiencelist = this.props.experiencelist;
      console.log(experiencelist);
      experiencelist[this.state.id] = editedExperience;
      var data = {
        email: email,
        experiencelist: experiencelist,
      };

      this.props.applicantprofileexperience(data, token).then((response) => {
        console.log("response:", response);
        if (response.payload.status === 200) {
          console.log("Profile Experience Updated Successfully");
          this.props.handleChange({ experience: experiencelist });
        }
      });
    }
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
      touchedexperience: { ...this.state.touchedexperience, [field]: true },
    });
  };

  handleValidationExperience() {
    let formIsValid = false;
    const errors = validateExperience(
      this.state.title,
      this.state.company,
      this.state.location,
      this.state.fromMonth,
      this.state.fromYear
    );
    if (
      !errors.title &&
      !errors.company &&
      !errors.location &&
      !errors.fromMonth &&
      !errors.fromYear
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  render() {
    const {
      title,
      company,
      location,
      fromMonth,
      fromYear,
      description,
      id,
    } = this.state;

    const errors = validateExperience(
      this.state.title,
      this.state.company,
      this.state.location,
      this.state.fromMonth,
      this.state.fromYear
    );
    var shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touchedexperience[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <div
          className="pv-entity__actions"
          data-toggle="modal"
          data-target={"#experienceeditmodal" + id}
        >
          <FontAwesomeIcon icon="pencil-alt" color="#0073b1" size="lg" />
        </div>
        <div
          className="modal fade  bd-example-modal-lg"
          id={"experienceeditmodal" + id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={"experiencemodallabel" + id}
          aria-hidden="true"
          style={{ marginTop: "40px" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"experiencemodallabel" + id}>
                  Edit Experience
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
                <label
                  htmlFor="position-title-typeahead"
                  className="mb1 required"
                >
                  Title
                </label>
                <input
                  className="form-control"
                  id="position-title-typeahead"
                  value={title}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("title")}
                  name="title"
                  placeholder="Ex: Manager"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("title") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Title is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-company-typeahead"
                  className="mb1 required"
                >
                  Company
                </label>
                <input
                  className="form-control"
                  id="position-company-typeahead"
                  value={company}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("company")}
                  name="company"
                  placeholder="Ex: Microsoft"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("company") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Company is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-location-typeahead"
                  className="mb1 required"
                >
                  Location
                </label>
                <input
                  className="form-control"
                  id="position-location-typeahead"
                  value={location}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("location")}
                  name="location"
                  placeholder="Ex: London, United Kingdom"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("location") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Location is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-date-typeahead"
                  className="mb1 required"
                >
                  From
                </label>
                <select
                  className="form-control edit-date"
                  id="position-date-typeahead"
                  value={fromMonth}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("fromMonth")}
                  name="fromMonth"
                >
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                {shouldMarkError("fromMonth") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Month is a required field
                  </div>
                ) : null}

                <select
                  id="position-start-typeahead"
                  name="fromYear"
                  onBlur={this.handleBlur("fromYear")}
                  value={fromYear}
                  onChange={this.changeHandler}
                  className="form-control edit-year"
                >
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                </select>
                {shouldMarkError("fromYear") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Year is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-description-typeahead"
                  className="mb1 required"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={this.changeHandler}
                  id="position-description-typeahead"
                />
              </div>
              <div className="modal-footer">
                {!this.handleValidationExperience() ? (
                  <div className="" style={{ color: "red" }}>
                    &nbsp;Please enter all fields
                  </div>
                ) : null}
                <button
                  type="button"
                  className="btn arteco-btn-save"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {!this.handleValidationExperience() ? (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    data-dismiss="modal"
                    onClick={this.submitExperience}
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: this.props.education.school,
      degree: this.props.education.degree,
      schoolfromYear: this.props.education.schoolfromYear,
      schooltoYear: this.props.education.schooltoYear,
      description: this.props.education.description,
      id: this.props.id,
      touchededucation: {
        school: false,
        degree: false,
        schoolfromYear: false,
        schooltoYear: false,
      },
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitEducation = this.submitEducation.bind(this);
  }

  submitEducation = () => {
    if (this.handleValidationEducation()) {
      const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
        .email;
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      var editedEducation = {
        school: this.state.school,
        degree: this.state.degree,
        schoolfromYear: this.state.schoolfromYear,
        schooltoYear: this.state.schooltoYear,
        description: this.state.description,
      };
      var educationlist = this.props.educationlist;
      educationlist[this.state.id] = editedEducation;
      var data = {
        email: email,
        educationlist: educationlist,
      };
      this.props.applicantprofileeducation(data, token).then((response) => {
        console.log("response:", response);
        if (response.payload.status === 200) {
          console.log("Profile Education Updated Successfully");
          this.props.handleChange({ education: educationlist });
        }
      });
    }
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
      touchededucation: { ...this.state.touchededucation, [field]: true },
    });
  };

  handleValidationEducation() {
    let formIsValid = false;
    const errors = validateEducation(
      this.state.school,
      this.state.degree,
      this.state.schoolfromYear,
      this.state.schooltoYear
    );
    if (
      !errors.school &&
      !errors.degree &&
      !errors.schoolfromYear &&
      !errors.schooltoYear
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  render() {
    const { id } = this.state;

    const errors = validateEducation(
      this.state.school,
      this.state.degree,
      this.state.schoolfromYear,
      this.state.schooltoYear
    );
    var shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touchededucation[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <div
          className="pv-entity__actions"
          data-toggle="modal"
          data-target={"#educationeditmodal" + id}
        >
          <FontAwesomeIcon icon="pencil-alt" color="#0073b1" size="lg" />
        </div>
        <div
          className="modal fade  bd-example-modal-lg"
          id={"educationeditmodal" + id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={"educationmodallabel" + id}
          aria-hidden="true"
          style={{ marginTop: "40px" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"educationmodallabel" + id}>
                  Edit Education
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
                <label
                  htmlFor="position-school-typeahead"
                  className="mb1 required"
                >
                  School
                </label>
                <input
                  className="form-control"
                  id="position-school-typeahead"
                  name="school"
                  value={this.state.school}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("school")}
                  placeholder="Ex: Boston University"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("school") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;School is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-degree-typeahead"
                  className="mb1 required"
                >
                  Degree
                </label>
                <input
                  className="form-control"
                  id="position-degree-typeahead"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("degree")}
                  placeholder="Ex: Bachelor's"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("degree") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Degree is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-date-typeahead"
                  className="mb1 required"
                >
                  From - To
                </label>
                <select
                  id="position-start-typeahead"
                  name="schoolfromYear"
                  value={this.state.schoolfromYear}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("schoolfromYear")}
                  className="form-control edit-year"
                >
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                </select>
                {shouldMarkError("schoolfromYear") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Start Year is a required field
                  </div>
                ) : null}

                <select
                  id="position-end-typeahead"
                  name="schooltoYear"
                  value={this.state.schooltoYear}
                  onBlur={this.handleBlur("schooltoYear")}
                  onChange={this.changeHandler}
                  className="form-control edit-year"
                >
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                </select>
                {shouldMarkError("schooltoYear") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;End Year is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-description-typeahead"
                  className="mb1 required"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.changeHandler}
                  id="position-description-typeahead"
                />
              </div>
              <div className="modal-footer">
                {!this.handleValidationEducation() ? (
                  <div className="" style={{ color: "red" }}>
                    &nbsp;Please enter all fields
                  </div>
                ) : null}
                <button
                  type="button"
                  className="btn arteco-btn-save"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {!this.handleValidationEducation() ? (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    data-dismiss="modal"
                    onClick={this.submitEducation}
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      fromMonth: "",
      fromYear: "",
      description: "",
      touchedexperience: {
        title: false,
        company: false,
        location: false,
        fromMonth: false,
        fromYear: false,
      },
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitExperience = this.submitExperience.bind(this);
  }

  submitExperience = () => {
    if (this.handleValidationExperience()) {
      const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
        .email;
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      var newExperience = {
        title: this.state.title,
        company: this.state.company,
        location: this.state.location,
        fromMonth: this.state.fromMonth,
        fromYear: this.state.fromYear,
        description: this.state.description,
      };
      var experiencelist = this.props.experiencelist;
      experiencelist.push(newExperience);
      var userData = {
        email: email,
        experiencelist: experiencelist,
      };
      this.props
        .applicantprofileexperience(userData, token)
        .then((response) => {
          console.log("response:", response);
          if (response.payload.status === 200) {
            console.log("Profile Experience Updated Successfully");
            this.props.handleChange({ experience: experiencelist });
          }
        });
    }
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
      touchedexperience: { ...this.state.touchedexperience, [field]: true },
    });
  };

  handleValidationExperience() {
    let formIsValid = false;
    const errors = validateExperience(
      this.state.title,
      this.state.company,
      this.state.location,
      this.state.fromMonth,
      this.state.fromYear
    );
    if (
      !errors.title &&
      !errors.company &&
      !errors.location &&
      !errors.fromMonth &&
      !errors.fromYear
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  render() {
    const errors = validateExperience(
      this.state.title,
      this.state.company,
      this.state.location,
      this.state.fromMonth,
      this.state.fromYear
    );
    var shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touchedexperience[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <div
          className="pv-entity__actions"
          data-toggle="modal"
          data-target="#experiencemodal"
        >
          <FontAwesomeIcon icon="plus" color="#0073b1" size="lg" />
        </div>
        <div
          className="modal fade  bd-example-modal-lg"
          id="experiencemodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="experiencemodallabel"
          aria-hidden="true"
          style={{ marginTop: "40px" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="experiencemodallabel">
                  Add Experience
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
                <label
                  htmlFor="position-title-typeahead"
                  className="mb1 required"
                >
                  Title
                </label>
                <input
                  className="form-control"
                  id="position-title-typeahead"
                  value={this.state.title}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("title")}
                  name="title"
                  placeholder="Ex: Manager"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("title") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Title is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-company-typeahead"
                  className="mb1 required"
                >
                  Company
                </label>
                <input
                  className="form-control"
                  id="position-company-typeahead"
                  value={this.state.company}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("company")}
                  name="company"
                  placeholder="Ex: Microsoft"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("company") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Company is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-location-typeahead"
                  className="mb1 required"
                >
                  Location
                </label>
                <input
                  className="form-control"
                  id="position-location-typeahead"
                  value={this.state.location}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("location")}
                  name="location"
                  placeholder="Ex: London, United Kingdom"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("location") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Location is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-date-typeahead"
                  className="mb1 required"
                >
                  From
                </label>
                <select
                  className="form-control edit-date"
                  id="position-date-typeahead"
                  value={this.state.fromMonth}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("fromMonth")}
                  name="fromMonth"
                >
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                {shouldMarkError("fromMonth") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Month is a required field
                  </div>
                ) : null}

                <select
                  id="position-start-typeahead"
                  name="fromYear"
                  value={this.state.fromYear}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("fromYear")}
                  className="form-control edit-year"
                >
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                </select>
                {shouldMarkError("fromYear") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Year is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-description-typeahead"
                  className="mb1 required"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.changeHandler}
                  id="position-description-typeahead"
                />
              </div>
              <div className="modal-footer">
                {!this.handleValidationExperience() ? (
                  <div className="" style={{ color: "red" }}>
                    &nbsp;Please enter all fields
                  </div>
                ) : null}
                <button
                  type="button"
                  className="btn arteco-btn-save"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {!this.handleValidationExperience() ? (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    data-dismiss="modal"
                    onClick={this.submitExperience}
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      schoolfromYear: "",
      schooltoYear: "",
      description: "",
      touchededucation: {
        school: false,
        degree: false,
        schoolfromYear: false,
        schooltoYear: false,
      },
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitEducation = this.submitEducation.bind(this);
  }

  submitEducation = () => {
    if (this.handleValidationEducation()) {
      const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS))
        .email;
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      var newEducation = {
        school: this.state.school,
        degree: this.state.degree,
        schoolfromYear: this.state.schoolfromYear,
        schooltoYear: this.state.schooltoYear,
        description: this.state.description,
      };
      var educationlist = this.props.educationlist;
      educationlist.push(newEducation);
      var data = {
        email: email,
        educationlist: educationlist,
      };
      this.props.applicantprofileeducation(data, token).then((response) => {
        console.log("response:", response);
        if (response.payload.status === 200) {
          console.log("Profile Education Updated Successfully");
          this.props.handleChange({ education: educationlist });
        }
      });
    }
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
      touchededucation: { ...this.state.touchededucation, [field]: true },
    });
  };

  handleValidationEducation() {
    let formIsValid = false;
    const errors = validateEducation(
      this.state.school,
      this.state.degree,
      this.state.schoolfromYear,
      this.state.schooltoYear
    );
    if (
      !errors.school &&
      !errors.degree &&
      !errors.schoolfromYear &&
      !errors.schooltoYear
    ) {
      formIsValid = true;
    }
    return formIsValid;
  }

  render() {
    const errors = validateEducation(
      this.state.school,
      this.state.degree,
      this.state.schoolfromYear,
      this.state.schooltoYear
    );
    var shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touchededucation[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <div
          className="modal fade  bd-example-modal-lg"
          id="educationmodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="educationmodallabel"
          aria-hidden="true"
          style={{ marginTop: "40px" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="educationmodallabel">
                  Add Education
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
                <label
                  htmlFor="position-school-typeahead"
                  className="mb1 required"
                >
                  School
                </label>
                <input
                  className="form-control"
                  id="position-school-typeahead"
                  name="school"
                  value={this.state.school}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("school")}
                  placeholder="Ex: Boston University"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("school") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;School is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-degree-typeahead"
                  className="mb1 required"
                >
                  Degree
                </label>
                <input
                  className="form-control"
                  id="position-degree-typeahead"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("degree")}
                  placeholder="Ex: Bachelor's"
                  maxLength="100"
                  type="text"
                />
                {shouldMarkError("degree") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Degree is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-date-typeahead"
                  className="mb1 required"
                >
                  From - To
                </label>
                <select
                  id="position-start-typeahead"
                  name="schoolfromYear"
                  value={this.state.schoolfromYear}
                  onChange={this.changeHandler}
                  onBlur={this.handleBlur("schoolfromYear")}
                  className="form-control edit-year"
                >
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                </select>
                {shouldMarkError("schoolfromYear") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;Start Year is a required field
                  </div>
                ) : null}

                <select
                  id="position-end-typeahead"
                  name="schooltoYear"
                  value={this.state.schooltoYear}
                  onBlur={this.handleBlur("schooltoYear")}
                  onChange={this.changeHandler}
                  className="form-control edit-year"
                >
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                </select>
                {shouldMarkError("schooltoYear") ? (
                  <div className="col-xs-6 col-md-6" style={{ color: "red" }}>
                    &nbsp;End Year is a required field
                  </div>
                ) : null}

                <label
                  htmlFor="position-description-typeahead"
                  className="mb1 required"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.changeHandler}
                  id="position-description-typeahead"
                />
              </div>
              <div className="modal-footer">
                {!this.handleValidationEducation() ? (
                  <div className="" style={{ color: "red" }}>
                    &nbsp;Please enter all fields
                  </div>
                ) : null}
                <button
                  type="button"
                  className="btn arteco-btn-save"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {!this.handleValidationEducation() ? (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    data-dismiss="modal"
                    onClick={this.submitEducation}
                    style={{ width: "150px" }}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="pv-entity__actions"
          data-toggle="modal"
          data-target="#educationmodal"
        >
          <FontAwesomeIcon icon="plus" color="#0073b1" size="lg" />
        </div>
      </div>
    );
  }
}

function validateprofile(firstname, lastname, state, zipcode) {
  // true means invalid, so our conditions got reversed
  return {
    firstname: firstname.length === 0,
    lastname: lastname.length === 0,
    state: state.length === 0,
    zipcode: zipcode.length === 0,
  };
}

function validateExperience(title, company, location, fromMonth, fromYear) {
  // true means invalid, so our conditions got reversed
  return {
    title: title.length === 0,
    company: company.length === 0,
    location: location.length === 0,
    fromMonth: fromMonth.length === 0,
    fromYear: fromYear.length === 0,
  };
}

function validateEducation(school, degree, schoolfromYear, schooltoYear) {
  // true means invalid, so our conditions got reversed
  return {
    school: school.length === 0,
    degree: degree.length === 0,
    schoolfromYear: schoolfromYear.length === 0,
    schooltoYear: schooltoYear.length === 0,
  };
}

function mapStateToProps(state) {
  return {
    getapplicantprofile: state.getapplicantprofile,
    applicantprofilephoto: state.applicantprofilephoto,
    applicantprofilesummary: state.applicantprofilesummary,
    applicantprofileexperience: state.applicantprofileexperience,
    applicantprofileeducation: state.applicantprofileeducation,
    applicantprofileskills: state.applicantprofileskills,
    applicantprofiledelete: state.applicantprofiledelete,
  };
}

export default withRouter(
  reduxForm({
    form: "Applicant_profile",
  })(
    connect(mapStateToProps, {
      getapplicantprofile,
      applicantprofilephoto,
      applicantprofilesummary,
      applicantprofileexperience,
      applicantprofileeducation,
      applicantprofileskills,
      applicantprofiledelete,
    })(Profile)
  )
);
