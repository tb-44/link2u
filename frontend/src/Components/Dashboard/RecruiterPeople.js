import React, { Component } from "react";
import checkValidityRecruiter from "../../Actions/ValidityScript";

import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import URI from "../../constants/URI";
import {
  getAllConnections,
  makeconnections,
  searchpeople,
} from "../../Actions/action_connections";
import { logprofileview } from "../../Actions/applicant_login_profile_actions";
import { postMessage } from "../../Actions/action_messages";
import PostJobNav from "../PostJobs/PostJobNav";

class RecruiterSearchPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchresults: 0,
      isLoading: false,
      filteredResults: [],
      connectionResults: [],
      query: "",
    };
    this.sendRequest = this.sendRequest.bind(this);
  }

  searchChangeListener = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  searchClickedListener = () => {
    this.searchFunc(this.state.query);
  };
  componentWillMount() {
    checkValidityRecruiter(this);
  }

  componentDidMount() {
    this.searchFunc(this.state.query);
  }

  searchFunc = (query) => {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

    var data = {
      search: query,
    };
    let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
    var email = user.email;
    this.props.searchpeople(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var filteredResults = response.payload.data.people;
        filteredResults = filteredResults.filter(function (x) {
          return x.email !== email;
        });
        this.setState({
          filteredResults: filteredResults,
          searchresults: filteredResults.length,
        });

        this.props.getAllConnections(token).then((response) => {
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
            this.setState({
              connectionResults: connectionResults,
            });
          }
        });
      }
    });
  };

  gotoprofile = (event, profile, requestconnection) => {
    console.log(requestconnection);
    //call to action
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    const data = {
      email: profile.email,
    };
    this.props.logprofileview(data, token).then((response) => {
      if (response.payload.status === 200) {
        console.log("Profile view logged");
      }
    });
    this.props.history.push({
      pathname: "/recruiteruserprofile/" + profile._id,
      state: {
        profile: profile,
        requestconnection: requestconnection,
      },
    });
  };

  sendRequest = (event, i) => {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    var data = {
      receiver: {
        username: this.state.filteredResults[i].email,
        firstname: this.state.filteredResults[i].firstName,
        lastname: this.state.filteredResults[i].lastName,
      },
    };
    console.log(data);

    this.props.makeconnections(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        console.log("Send Request Successfully");
        var receiver = this.state.filteredResults[i].email;
        var connectionResults = this.state.connectionResults;
        connectionResults.push(receiver);
        this.setState({
          connectionResults: connectionResults,
        });
      }
    });
  };

  checkcondition = (email) => {
    var result = this.state.connectionResults.includes(email);
    return result;
  };

  listUsers() {
    var self = this;
    const { filteredResults, isLoading } = this.state;
    if (!isLoading) {
      return Object.keys(filteredResults).map(function (i) {
        return (
          <div key={i}>
            <ul className="mn-invitations-preview__header">
              <li className="invitation-card1 ember-view">
                <div className="invitation-card__info-wrapper">
                  <div className="invitation-card__details">
                    <div className="details-view">
                      <div className="msg-conversation-card__row pr2">
                        {filteredResults[i].profilePicture === "" ? (
                          <img
                            alt=""
                            src="/images/avatar.png"
                            style={{ width: "56px", height: "56px" }}
                          />
                        ) : (
                          <img
                            alt=""
                            src={
                              URI.ROOT_URL +
                              "/profilepictures/" +
                              filteredResults[i].profilePicture
                            }
                            style={{ width: "56px", height: "56px" }}
                          />
                        )}
                        <div className="row" style={{ marginLeft: "15px" }}>
                          <div className="form-group">
                            <a
                              href={
                                "/recruiteruserprofile/" +
                                filteredResults[i]._id
                              }
                              onClick={(event) =>
                                self.gotoprofile(
                                  event,
                                  filteredResults[i],
                                  self.checkcondition(filteredResults[i].email)
                                )
                              }
                            >
                              <h5 className="t-14 t-black t-normal">
                                {filteredResults[i].firstName}&nbsp;
                                {filteredResults[i].lastName}
                              </h5>
                            </a>
                            <h5 className="t-12 t-black--light t-normal">
                              {filteredResults[i].profileSummary}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="invitation-card__action-container pl3 pr5">
                        {!self.checkcondition(filteredResults[i].email) ? (
                          <button
                            type="button"
                            className="btn arteco-btn"
                            style={{ width: "150px" }}
                            onClick={(event) => self.sendRequest(event, i)}
                          >
                            Send Request
                          </button>
                        ) : null}
                        <SendMessage
                          postMessage={self.props.postMessage}
                          id={i}
                          connection={filteredResults[i]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="jobsearch-wrapper">
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
                className="btn arteco-btn"
                style={{ height: "45px", width: "100px", marginTop: "0px" }}
                onClick={this.searchClickedListener}
              >
                Search
              </button>
            </div>
          </div>
          <br />
          <br />
          <hr />
        </div>

        <div className="neptune-grid1" style={{ marginTop: "70px" }}>
          <div className="core-rail" style={{ width: "900px" }}>
            <div className="mn-invitations-preview mb4 artdeco-card ember-view">
              <header className="artdeco-card__header mn-invitations-preview__header">
                <h3 className="t-13 t-black--light t-normal">
                  Showing&nbsp;{this.state.searchresults}&nbsp;results
                </h3>
              </header>
              {this.listUsers()}
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
                  />
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
    makeconnections: state.makeconnections,
    getAllConnections: state.getAllConnections,
    searchpeople: state.searchpeople,
    postMessage: state.postMessage,
  };
}

export default withRouter(
  reduxForm({
    form: "Search_People",
  })(
    connect(mapStateToProps, {
      makeconnections,
      getAllConnections,
      searchpeople,
      postMessage,
      logprofileview,
    })(RecruiterSearchPeople)
  )
);
