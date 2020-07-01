import React, { Component } from "react";
import "../../App.css";
import "../../profile_wrapper.css";
import { Redirect } from "react-router";
import { reduxForm } from "redux-form";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userConstants } from "../../constants";
import URI from "../../constants/URI";
import { postMessage } from "../../Actions/action_messages";
import { makeconnections } from "../../Actions/action_connections";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledata: [],
      loggedin: true,
      requestconnection: false,
    };
    this.signout = this.signout.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  signout = () => {
    localStorage.clear();
    this.setState({
      loggedin: false,
    });
  };

  componentDidMount() {
    this.setState({
      profiledata: this.props.location.state.profile,
      requestconnection: this.props.location.state.requestconnection,
    });
  }

  sendRequest = () => {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    var data = {
      receiver: {
        username: this.state.profiledata.email,
        firstname: this.state.profiledata.firstName,
        lastname: this.state.profiledata.lastName,
      },
    };
    console.log(data);

    this.props.makeconnections(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        console.log("Send Request Successfully");
        this.setState({
          requestconnection: true,
        });
      }
    });
  };

  render() {
    console.log(this.props.location.state.requestconnection);
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
        <div className="pv-content profile-view-grid neptune-grid2 two-column">
          <div className="core-rail">
            <div className="Elevation-2dp profile-background-image profile-background-image--loading ember-view"></div>
            <div className="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
              <div className="mt4 display-flex ember-view">
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
                        {this.state.profiledata.phoneNumber ? (
                          <p>
                            <strong>Phone Number: </strong>{" "}
                            {this.state.profiledata.phoneNumber}{" "}
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
                  {!this.state.requestconnection ? (
                    <button
                      type="button"
                      className="btn arteco-btn"
                      style={{ width: "150px", marginLeft: "20px" }}
                      onClick={this.sendRequest}
                    >
                      Send Request
                    </button>
                  ) : null}
                  <SendMessage
                    postMessage={this.props.postMessage}
                    connection={this.state.profiledata}
                  ></SendMessage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageDraft: "",
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handlevalidation = this.handlevalidation.bind(this);
  }

  sendMessage() {
    if (this.state.messageDraft.trim().length > 0) {
      let messageDetails = {
        receiver: {
          username: this.props.connection.email,
          firstname: this.props.connection.firstName,
          lastname: this.props.connection.lastName,
        },
        message: this.state.messageDraft,
      };
      this.props.postMessage(messageDetails);
      this.setState({
        messageDraft: "",
      });
    }
  }

  handlevalidation() {
    var formValid = true;
    if (this.state.messageDraft.trim().length === 0) {
      formValid = false;
    }
    return formValid;
  }

  render() {
    var id = this.props.id;
    return (
      <div>
        <div className="invitation-card__action-container pl3 pr5">
          <button
            type="button"
            className="btn arteco-btn-save"
            data-toggle="modal"
            data-target={"#messagemodal" + id}
            style={{ marginLeft: "10px", width: "100px" }}
          >
            Message
          </button>
        </div>
        <div
          className="modal fade  bd-example-modal-lg"
          id={"messagemodal" + id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={"messagemodallabel" + id}
          aria-hidden="true"
          style={{ marginTop: "40px" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"messagemodallabel" + id}>
                  Message
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
                      placeholder={this.props.connection.firstName}
                      id="position-firstname-typeahead"
                      type="text"
                      disabled
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
                      placeholder={this.props.connection.lastName}
                      id="position-lastname-typeahead"
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="messaging" className="mb1 required">
                    Message*
                  </label>
                  <textarea
                    rows="6"
                    cols="40"
                    id="messaging"
                    required
                    maxLength="10000"
                    className="form-control"
                    value={this.state.messageDraft}
                    onChange={(event) => {
                      this.setState({ messageDraft: event.target.value });
                    }}
                    name="message"
                    placeholder="Enter Message"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                {this.handlevalidation() ? (
                  <button
                    type="submit"
                    className="btn arteco-btn"
                    data-dismiss="modal"
                    style={{ width: "150px" }}
                    onClick={this.sendMessage}
                  >
                    Send Message
                  </button>
                ) : (
                  <div className="" style={{ color: "red" }}>
                    &nbsp;Message field is Mandatory&nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn arteco-btn"
                      style={{ width: "150px" }}
                    >
                      Send Message
                    </button>
                  </div>
                )}
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
    postMessage: state.postMessage,
    makeconnections: state.makeconnections,
    logprofileview: state.logprofileview,
  };
}

export default withRouter(
  reduxForm({
    form: "Search_People",
  })(connect(mapStateToProps, { postMessage, makeconnections })(UserProfile))
);
