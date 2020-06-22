import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getAllApplicationsForJob } from "../../Actions/recruiterActions";
import { v4 } from "node-uuid";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import URI from "../../constants/URI";
import { userConstants } from "../../constants";

import {
  getAllConnections,
  makeconnections,
  searchpeople,
} from "../../Actions/action_connections";
import { logprofileview } from "../../Actions/applicant_login_profile_actions";
import checkValidityRecruiter from "../../Actions/ValidityScript";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class RecruiterJobApplications extends Component {
  componentWillMount() {
    checkValidityRecruiter(this);
    this.props.getAllApplicationsForJob("a");
  }

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      numPages: null,
      pageNumber: 1,
      resumeUrl: "",
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  getConnections = () => {
    return new Promise((resolve, reject) => {
      const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
      this.props
        .getAllConnections(token)
        .then((response) => {
          console.log("response:", response);
          if (response.payload.status === 200) {
            var connectionResults = [];
            var approved =
              response.payload.data.connections.connectionsApproved;
            var incoming =
              response.payload.data.connections.connectionsIncoming;
            var outgoing =
              response.payload.data.connections.connectionsOutgoing;
            var i = 0;
            if (approved.length > 0) {
              for (i = 0; i < approved.length; i++) {
                connectionResults.push(
                  JSON.parse(JSON.stringify(approved[i].email))
                );
              }
            }
            if (incoming.length > 0) {
              for (i = 0; i < incoming.length; i++) {
                connectionResults.push(
                  JSON.parse(JSON.stringify(incoming[i].email))
                );
              }
            }
            if (outgoing.length > 0) {
              for (i = 0; i < outgoing.length; i++) {
                connectionResults.push(
                  JSON.parse(JSON.stringify(outgoing[i].email))
                );
              }
            }
            resolve(connectionResults);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  checkcondition = (email) => {
    var result = this.state.connectionResults.includes(email);
    return result;
  };

  goToProfile = (email) => {
    //Fetch Profile
    //let recruiterEmail = localStorage.getItem("username");
    console.log(email);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/get_applicant_profile`, {
        params: {
          email,
        },
      })
      .then((res) => {
        console.log(res.data.profile);
        this.getConnections().then((connections) => {
          console.log(connections);
          const token = JSON.parse(
            localStorage.getItem(userConstants.AUTH_TOKEN)
          );
          const data = {
            email,
          };
          this.props.logprofileview(data, token).then((response) => {
            if (response.payload.status === 200) {
              console.log("Profile view logged");
            }
          });
          this.props.history.push({
            pathname: "/recruiteruserprofile/" + res.data.profile._id,
            state: {
              profile: res.data.profile,
              requestconnection: connections.includes(email),
            },
          });
        });
      });
  };

  searchChangeListener = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    let applications = null;
    if (this.props.applicationsState.applications.length) {
      applications = this.props.applicationsState.applications.map(
        // eslint-disable-next-line array-callback-return
        (application) => {
          if (
            application.first_name.includes(this.state.search) ||
            application.last_name.includes(this.state.search)
          ) {
            console.log(application);

            return (
              <div key={v4()} className="dashItem">
                <div className="card shadow-lg ">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5
                          style={{ fontWeight: "500" }}
                          className="linkBlue"
                          href=" "
                          onClick={() => {
                            this.goToProfile(application.applicant_email);
                          }}
                        >
                          {application.first_name} {application.last_name}
                        </h5>
                        <h5>{application.applicant_email}</h5>
                        <FontAwesomeIcon
                          style={{ color: "#e6e6e6" }}
                          className="fa-map-marker-alt"
                          icon="map-marker-alt"
                        />
                        &nbsp;&nbsp;{application.address} <br />
                        <FontAwesomeIcon
                          style={{ color: "#e6e6e6" }}
                          className="calendar-alt"
                          icon="phone"
                        />
                        &nbsp;&nbsp;{application.phone_number} <br />
                        {application.how_did_they_hear_about_us !==
                        undefined ? (
                          <div>
                            <b> How Did they Hear Aboout Us:</b>
                            &nbsp;&nbsp;{
                              application.how_did_they_hear_about_us
                            }{" "}
                            <br />{" "}
                          </div>
                        ) : null}
                        {application.ethnicity !== undefined ? (
                          <div>
                            <b> Ethnicity:</b>
                            &nbsp;&nbsp;{application.ethnicity} <br />{" "}
                          </div>
                        ) : null}
                        {application.diversity_question !== undefined ? (
                          <div>
                            <b> How Did they Hear Aboout Us:</b>
                            &nbsp;&nbsp;{
                              application.diversity_question
                            } <br />{" "}
                          </div>
                        ) : null}
                        {application.sponsorship_question !== undefined ? (
                          <div>
                            <b> Do They Require Sponsorship?</b>
                            &nbsp;&nbsp;{application.sponsorship_question}{" "}
                            <br />{" "}
                          </div>
                        ) : null}
                        {application.disability_question !== undefined ? (
                          <div>
                            <b> Are They Disabled? :</b>
                            &nbsp;&nbsp;{
                              application.disability_question
                            } <br />{" "}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-4  ">
                        <button
                          type="button"
                          className="btn btn-block blueBackground text-white"
                          onClick={() => {
                            this.setState({
                              resumeUrl:
                                URI.ROOT_URL + "/resumes/" + application.resume,
                            });
                          }}
                          data-toggle="modal"
                          data-target="#resumeModal"
                        >
                          <FontAwesomeIcon
                            style={{ color: "#e6e6e6" }}
                            className="scroll"
                            icon="scroll"
                          />
                          &nbsp; View Resume
                        </button>
                        <br />
                        <button
                          type="button"
                          className="btn btn-block blueBackground text-white"
                          onClick={() => {
                            this.setState({
                              resumeUrl:
                                URI.ROOT_URL +
                                "/resumes/" +
                                application.cover_letter,
                            });
                          }}
                          data-toggle="modal"
                          data-target="#resumeModal"
                        >
                          <FontAwesomeIcon
                            style={{ color: "#e6e6e6" }}
                            className="scroll"
                            icon="scroll"
                          />
                          &nbsp; View Cover Letter
                        </button>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </div>
            );
          }
        }
      );
    } else {
      applications = (
        <div className="col-6 offset-3 text-center">
          <br />
          <br />
          <img alt="" src="images/nojobs.png" />
          <br />
          <br />
          <span style={{ fontSize: "150%" }}>
            Sorry, there are no Applications to display.
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
              {applications}
            </div>
          </div>
        </div>

        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          id="resumeModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resume</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <Document
                    file={this.state.resumeUrl}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    applicationsState: state.ApplicationsReducer,
    makeconnections: state.makeconnections,
    getAllConnections: state.getAllConnections,
    searchpeople: state.searchpeople,
    postMessage: state.postMessage,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    getAllApplicationsForJob,
    makeconnections,
    getAllConnections,
    searchpeople,
    logprofileview,
  })(RecruiterJobApplications)
);
