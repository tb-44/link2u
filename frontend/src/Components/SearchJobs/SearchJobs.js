import React, { Component } from "react";
import "../../App.css";
import "../../jobsearch_wrapper.css";
import Navbar from "../NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import { searchjob, logjobclicks } from "../../Actions/actions_jobs";
import { applyjob, logapplyapplicationtypes } from "../../Actions/actions_jobs";
import { getapplicantprofile } from "../../Actions/applicant_login_profile_actions";

class SearchJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentjoblistid: 1,
      search: "",
      location: "",
      company: "",
      date_posted: "",
      employment_type: "",
      jobdata: [],
      results: true,
    };
    this.openJob = this.openJob.bind(this);
    this.normalapplyjob = this.normalapplyjob.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: e.target.value,
    };

    this.setState(state);
  };

  openJob(id) {
    this.setState({
      currentjoblistid: id,
    });
  }

  normalapplyjob = (event, job) => {
    var applyjob = JSON.stringify(job);
    var id = JSON.parse(applyjob)._id;
    window.open("/applyjob/" + id, "_blank");
    localStorage.setItem("job", applyjob);
  };

  viewjob = (event, job) => {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    const data = {
      jobID: job._id,
    };
    this.props.logjobclicks(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        console.log("Job Clicks updated successfully");
      }
    });
    this.props.history.push({
      pathname: `/job/view/${job._id}`,
      state: {
        viewjob: job,
      },
    });
  };

  componentDidMount() {
    //call to action

    var data = {
      start: 0,
      length: 100,
      search:
        this.props.location.state === undefined ||
        this.props.location.state.jobname === undefined
          ? ""
          : this.props.location.state.jobname,
      company: "",
      employment_type: "",
      location:
        this.props.location.state === undefined ||
        this.props.location.state.location === undefined
          ? ""
          : this.props.location.state.location,
      date_posted: "",
    };

    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

    this.props.searchjob(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        if (response.payload.data.jobs.length > 0) {
          this.setState({
            jobdata: response.payload.data.jobs,
            currentjoblistid: response.payload.data.jobs[0]._id,
            search:
              this.props.location.state === undefined ||
              this.props.location.state.jobname === undefined
                ? ""
                : this.props.location.state.jobname,
            location:
              this.props.location.state === undefined ||
              this.props.location.state.location === undefined
                ? ""
                : this.props.location.state.location,
            results: true,
          });
        } else {
          this.setState({
            results: false,
          });
        }
      }
    });
  }

  onSearch = () => {
    var data = {
      start: 0,
      length: 100,
      search: this.state.search,
      company: this.state.company,
      employment_type: this.state.employment_type,
      location: this.state.location,
      date_posted: this.state.date_posted,
    };

    console.log(data);

    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

    this.props.searchjob(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var results = response.payload.data.jobs.length > 0;
        console.log(results);
        if (results) {
          this.setState({
            jobdata: response.payload.data.jobs,
            currentjoblistid: response.payload.data.jobs[0]._id,
            results: results,
          });
        } else {
          this.setState({
            results: results,
          });
        }
      }
    });
  };

  render() {
    if (this.state.results) {
      var currentjobliststate = this.state.jobdata.find(
        (x) => x._id === this.state.currentjoblistid
      );
    }
    return (
      <div className="jobsearch-wrapper">
        <Navbar></Navbar>
        {this.state.results ? (
          <div>
            <header className="container-with-shadow p3 search-filters-bar--jobs-search relative">
              <div className="neptune-grid1">
                <div
                  className="search-filters-bar display-flex align-items-center"
                  style={{ height: "42px" }}
                >
                  <ul className="search-filters-bar__filter-grouping display-flex align-items-center list-style-none jobs-search-facets-list--initial-facets pl4">
                    <li className="search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle border-btn"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Date Posted
                          <span className="caret"></span>
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <div className="checkbox-wrapper">
                            <div className="radio" data-search="Order DateTime">
                              <label className="align-boxes-center">
                                <input
                                  name="date_posted"
                                  value="day"
                                  onChange={this.changeHandler}
                                  type="radio"
                                />
                                &nbsp;&nbsp;Past 24 hrs
                              </label>
                            </div>
                            <div
                              className="checkbox"
                              data-search="Order DateTime"
                            >
                              <label className="align-boxes-center">
                                <input
                                  name="date_posted"
                                  value="week"
                                  onChange={this.changeHandler}
                                  type="radio"
                                />
                                &nbsp;&nbsp;Past Week
                              </label>
                            </div>
                            <div
                              className="checkbox"
                              data-search="Order DateTime"
                            >
                              <label className="align-boxes-center">
                                <input
                                  name="date_posted"
                                  value="month"
                                  onChange={this.changeHandler}
                                  type="radio"
                                />
                                &nbsp;&nbsp;Past Month
                              </label>
                            </div>
                          </div>
                          <div className="button-panel text-right">
                            <button
                              type="submit"
                              className="btn arteco-btn"
                              onClick={this.onSearch}
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              className="btn arteco-btn-save"
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle border-btn"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Company
                          <span className="caret"></span>
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <div className="jobs-search-box1">
                            <input
                              type="text"
                              onChange={this.changeHandler}
                              name="company"
                              id="jobsearch3"
                              className="jobs-search-box__input1"
                              placeholder="Search by Company Name"
                            />
                          </div>
                          <div className="button-panel text-right">
                            <button
                              type="submit"
                              className="btn arteco-btn"
                              onClick={this.onSearch}
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              className="btn arteco-btn-save"
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle border-btn"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Location
                          <span className="caret"></span>
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <div className="jobs-search-box1">
                            <input
                              type="text"
                              id="jobsearch4"
                              onChange={this.changeHandler}
                              name="location"
                              className="jobs-search-box__input1"
                              placeholder="Search by Location"
                            />
                          </div>
                          <div className="button-panel text-right">
                            <button
                              type="submit"
                              className="btn arteco-btn"
                              onClick={this.onSearch}
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              className="btn arteco-btn-save"
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle border-btn"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Job Type
                          <span className="caret"></span>
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <div className="checkbox-wrapper">
                            <div className="checkbox" data-search="Full Time">
                              <label className="align-boxes-center">
                                <input
                                  name="employment_type"
                                  onChange={this.changeHandler}
                                  value="Full Time"
                                  type="radio"
                                />
                                &nbsp;&nbsp;Full Time
                              </label>
                            </div>
                            <div className="checkbox" data-search="Part Time">
                              <label className="align-boxes-center">
                                <input
                                  name="employment_type"
                                  onChange={this.changeHandler}
                                  value="Part Time"
                                  type="radio"
                                />
                                &nbsp;&nbsp;Part Time
                              </label>
                            </div>
                            <div className="checkbox" data-search="Contract">
                              <label className="align-boxes-center">
                                <input
                                  name="employment_type"
                                  onChange={this.changeHandler}
                                  value="Contract"
                                  type="radio"
                                />
                                &nbsp;&nbsp;Contract
                              </label>
                            </div>
                            <div className="checkbox" data-search="Temporary">
                              <label className="align-boxes-center">
                                <input
                                  name="employment_type"
                                  onChange={this.changeHandler}
                                  value="Temporary"
                                  type="radio"
                                />
                                &nbsp;&nbsp;Temporary
                              </label>
                            </div>
                            <div className="checkbox" data-search="Internship">
                              <label className="align-boxes-center">
                                <input
                                  name="employment_type"
                                  onChange={this.changeHandler}
                                  value="Internship"
                                  type="radio"
                                />
                                &nbsp;&nbsp;Internship
                              </label>
                            </div>
                            <div className="checkbox" data-search="Volunteer">
                              <label className="align-boxes-center">
                                <input
                                  name="employment_type"
                                  onChange={this.changeHandler}
                                  value="Volunteer"
                                  type="radio"
                                />
                                &nbsp;&nbsp;Volunteer
                              </label>
                            </div>
                          </div>
                          <div className="button-panel text-right">
                            <button
                              type="submit"
                              className="btn arteco-btn"
                              onClick={this.onSearch}
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              className="btn arteco-btn-save"
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            <div className="jobs-search-two-pane__wrapper jobs-search-two-pane__wrapper--two-pane">
              <div className="neptune-grid one-column full-height">
                <div className="display-flex full-height">
                  <div className="jobs-search-two-pane__results jobs-search-two-pane__results--responsive display-flex full-width">
                    <div
                      className="jobs-search-results jobs-search-results--is-two-pane"
                      tabIndex="-1"
                    >
                      <ul className="jobs-search-results__list artdeco-list artdeco-list--offset-4">
                        <JobList
                          jobs={this.state.jobdata}
                          getSelectedJob={this.openJob}
                          selectedJob={currentjobliststate}
                          self={this}
                        />
                      </ul>
                    </div>
                  </div>
                  <div className="jobs-search-two-pane__details pt4 ph3 jobs-search-two-pane__details--responsive ember-view">
                    <div id="job-view-layout jobs-details ember-view">
                      <JobDetails
                        jobs={currentjobliststate}
                        self={this}
                        logapplyapplicationtypes={
                          this.props.logapplyapplicationtypes
                        }
                        applyjob={this.props.applyjob}
                        getapplicantprofile={this.props.getapplicantprofile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="neptune-grid1">
            <div className="col-6 offset-3 text-center">
              <br />
              <br />
              <img alt="" src="images/nojobs.png" />
              <br />
              <br />
              <span style={{ fontSize: "150%" }}>
                Sorry, there are no jobs to display.
              </span>
              <br />
              <br /> <br />
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const JobList = ({ jobs, getSelectedJob, selectedJob, self }) => {
  let jobList = jobs.map(function (job, i) {
    return (
      <JobListItem
        job={job}
        key={i}
        openJob={getSelectedJob}
        self={self}
        selectedJob={selectedJob === job}
      />
    );
  });
  return (
    <li className="occludable-update artdeco-list__item p0 ember-view">
      {jobList}
    </li>
  );
};

const JobListItem = ({ job, openJob, selectedJob, self }) => {
  var classes = "job-card-search";
  if (selectedJob) {
    classes += " job-card-search--is-active";
  }
  // console.log(job)
  return (
    <div className={classes} onClick={() => openJob(job._id)}>
      <div className="media">
        <a href=" " className="pull-left">
          <img
            alt=""
            src={job.company_logo}
            style={{ height: "56px", width: "56px" }}
          ></img>
        </a>
        <div className="artdeco-entity-lockup--size-4 gap1">
          <a
            href={`/job/view/${job._id}`}
            onClick={(event) => self.viewjob(event, job)}
          >
            <div className="job-item__subject">{job.title}</div>
          </a>
          <div className="job-item__name">{job.company}</div>
          <div className="job-item__location">
            <FontAwesomeIcon
              className="fa-map-marker-alt"
              icon="map-marker-alt"
            ></FontAwesomeIcon>
            &nbsp;&nbsp;{job.location}
          </div>
          <div
            className="job-item__message"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "pre-wrap",
              overflow: "hidden",
            }}
          >
            {job.job_description}
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetails = ({
  jobs,
  self,
  applyjob,
  logapplyapplicationtypes,
  getapplicantprofile,
}) => {
  if (!jobs) {
    return (
      <div className="jobs-details__wrapper">
        <div className="empty-container">
          <div className="empty-container__content"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="jobs-details__main-content--single-pane full-width relative">
      <div className="jobs-box jobs-box--fadein jobs-box--full-width jobs-details-top-card jobs-box--no-bottom-offset ember-view">
        <div className="media">
          <a href=" " className="pull-left">
            <img
              src={jobs.company_logo}
              alt=" "
              style={{ height: "150px", width: "150px" }}
            ></img>
          </a>
          <div className="artdeco-entity-lockup--size-4 gap1">
            <a
              href={`/job/view/${jobs._id}`}
              onClick={(event) => self.viewjob(event, jobs)}
            >
              <div className="job-details__subject">{jobs.title}</div>
            </a>
            <div className="job-details__name">{jobs.company}</div>
            <div className="job-details__location">
              <FontAwesomeIcon
                className="fa-map-marker-alt"
                icon="map-marker-alt"
              ></FontAwesomeIcon>
              &nbsp;&nbsp;{jobs.location}
            </div>
            <div className="job-details__posted">
              Posted on{" "}
              {jobs.posted_date
                .slice(0, new Date().toISOString().indexOf("T"))
                .replace(/-/g, "/")}
            </div>
            <div className="row form-group">
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="job-details__posted">
                {jobs.no_of_views === undefined ? 0 : jobs.no_of_views}
                &nbsp;view(s)
              </div>
              <div className="job-details__posted">
                &nbsp;&nbsp;{jobs.applications.length}&nbsp;applicant(s) applied
              </div>
            </div>
            {jobs.application_method === "Easy Apply" ? (
              <Easyapply
                applyjob={applyjob}
                logapplyapplicationtypes={logapplyapplicationtypes}
                getapplicantprofile={getapplicantprofile}
                id={jobs._id}
                jobdetails={jobs}
              />
            ) : (
              <button
                type="submit"
                className="btn arteco-btn"
                onClick={(event) => self.normalapplyjob(event, jobs)}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="jobs-description__container">
        <h2 className="job-desc-title">Job Description</h2>
        <div
          className="jobs-description__content"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <span style={{ color: "#5e6d77" }}>{jobs.job_description}</span>
        </div>
      </div>
      <div className="jobs-description__container">
        <h2 className="job-desc-title">Job Function</h2>
        <div
          className="jobs-description__content"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <span style={{ color: "#5e6d77" }}>{jobs.job_function}</span>
        </div>
      </div>
      <div className="jobs-description__container">
        <h2 className="job-desc-title">Job Type</h2>
        <div
          className="jobs-description__content"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <span style={{ color: "#5e6d77" }}>{jobs.employment_type}</span>
        </div>
      </div>
      <div className="jobs-description__container">
        <h2 className="job-desc-title">Industry</h2>
        <div
          className="jobs-description__content"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <span style={{ color: "#5e6d77" }}>{jobs.industry}</span>
        </div>
      </div>
    </div>
  );
};

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
    searchjob: state.searchjob,
    getapplicantprofile: state.getapplicantprofile,
    applyjob: state.applyjob,
    logapplyapplicationtypes: state.logapplyapplicationtypes,
    logjobclicks: state.logjobclicks,
  };
}

export default withRouter(
  reduxForm({
    form: "Search_jobs",
  })(
    connect(mapStateToProps, {
      searchjob,
      logjobclicks,
      getapplicantprofile,
      applyjob,
      logapplyapplicationtypes,
    })(SearchJobs)
  )
);
