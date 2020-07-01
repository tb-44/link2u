import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getRecruiterJobs,
  getAllApplicationsForJob,
} from "../../Actions/recruiterActions";
import { v4 } from "node-uuid";
import moment from "moment";
import { populateJobsForm } from "../../Actions/recruiterActions";
import checkValidityRecruiter from "../../Actions/ValidityScript";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  componentWillMount() {
    checkValidityRecruiter(this);

    this.props.getRecruiterJobs();
  }

  searchChangeListener = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    let jobs = null;
    if (this.props.jobsState.jobs.length) {
      // eslint-disable-next-line array-callback-return
      jobs = this.props.jobsState.jobs.map((job) => {
        if (job.title.includes(this.state.search)) {
          return (
            <div key={v4()} className="dashItem">
              <div className="card shadow-lg ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-3 text-center">
                      <img
                        className="img-thumbnail"
                        alt=""
                        src={job.company_logo}
                        style={{ border: "none", width: "70%" }}
                      />
                    </div>

                    <div className="col-5">
                      <h5
                        style={{ fontWeight: "500" }}
                        className="linkBlue"
                        href="/"
                      >
                        {job.title}
                      </h5>
                      <h5>{job.company}</h5>
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="fa-map-marker-alt"
                        icon="map-marker-alt"
                      />
                      &nbsp;&nbsp;{job.location} <br />
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="calendar-alt"
                        icon="calendar-alt"
                      />
                      &nbsp;&nbsp;{moment(job.expiry_date).format("MM/DD/YYYY")}{" "}
                      <br />
                    </div>
                    <div className="col-4 ">
                      <button
                        type="button"
                        className="btn btn-block blueBackground text-white"
                        onClick={() => {
                          console.log(job._id);
                          this.props.getAllApplicationsForJob(job._id);
                          this.props.history.push("/applications");
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: "#e6e6e6" }}
                          className="scroll"
                          icon="scroll"
                        />
                        &nbsp; View Applications
                      </button>
                      <br />
                      <br />

                      <button
                        type="button"
                        className="btn btn-block blueBackground text-white"
                        onClick={() => {
                          let j = {
                            company: job.company,
                            companyLogo: job.company_logo,
                            employmentType: job.employment_type,
                            expiryDate: job.expiry_date,
                            industry: job.industry,
                            jobDescription: job.job_description,
                            jobFunction: job.job_function,
                            location: job.location,
                            title: job.title,
                            jobID: job._id,
                          };
                          console.log(j);
                          this.props.populateJobsForm(j);
                          this.props.history.push("/editjob");
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: "#e6e6e6" }}
                          className="edit"
                          icon="edit"
                        />
                        &nbsp; Edit Posting{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
            </div>
          );
        }
      });
    } else {
      jobs = (
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
      );
    }

    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-6 offset-2">
              <input
                type="text"
                className="form-control form-control-lg shadow-lg"
                placeholder="Search"
                aria-label="Sizing example input"
                onChange={this.searchChangeListener}
              />
            </div>

            <div className="col-2">
              <button
                type="button"
                className="btn btn-block btn-lg blueBackground text-white shadow-lg"
              >
                Search
              </button>
            </div>
          </div>
          <br />
          <br />
          <hr />
          <div className="row">
            <div className="col-10 offset-1">
              <br />
              <br />
              {jobs}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobsState: state.ShowJobsReducer,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    getRecruiterJobs,
    populateJobsForm,
    getAllApplicationsForJob,
  })(Jobs)
);
