import React, { Component } from "react";
import "../../App.css";
import "../../jobsearch_wrapper.css";
import "./connections.css";
import Navbar from "../NavBar/Navbar";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import { getAllConnections } from "../../Actions/action_connections";
import { postMessage } from "../../Actions/action_messages";
import PostJobNav from "../PostJobs/PostJobNav";

class Myconnections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      connections: [],
    };
  }

  componentDidMount() {
    //call to action

    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.getAllConnections(token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var approved = response.payload.data.connections.connectionsApproved;
        this.setState({
          connections: approved,
        });
      }
    });
  }

  listUsers() {
    const { connections, isLoading } = this.state;
    var self = this;
    if (!isLoading) {
      return Object.keys(connections).map(function (i) {
        return (
          <div key={i}>
            <ul className="mn-invitations-preview__header">
              <li className="invitation-card1 ember-view">
                <div className="invitation-card__info-wrapper">
                  <div className="invitation-card__details">
                    <div className="details-view">
                      <div className="msg-conversation-card__row pr2">
                        {/* <img alt="" src={connections[i].profilePicture} style = {{width : "56px", height : "56px"}}/> */}
                        <img
                          alt=""
                          src="/images/avatar.png"
                          style={{ width: "56px", height: "56px" }}
                        />
                        <div className="row" style={{ marginLeft: "15px" }}>
                          <div className="form-group">
                            <h5 className="t-14 t-black t-normal">
                              {connections[i].firstName}&nbsp;
                              {connections[i].lastName}
                            </h5>
                            {/* <h5 className = "t-12 t-black--light t-normal">{connections[i].description}</h5> */}
                            {/* <h5 className = "t-12 t-black--light t-normal">Description</h5> */}
                          </div>
                        </div>
                      </div>
                      <SendMessage
                        postMessage={self.props.postMessage}
                        id={i}
                        connection={connections[i]}
                      ></SendMessage>
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
    let role = localStorage.getItem("role");
    return (
      <div className="jobsearch-wrapper">
        {role && role === "R" ? <PostJobNav /> : <Navbar />}
        <div className="neptune-grid1" style={{ marginTop: "70px" }}>
          <div className="core-rail" style={{ width: "900px" }}>
            <div className="mn-invitations-preview mb4 artdeco-card ember-view">
              <header className="artdeco-card__header mn-invitations-preview__header">
                <h3 className="t-13 t-black--light t-normal">
                  Showing&nbsp;{this.state.connections.length}&nbsp;results
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
    getAllConnections: state.getAllConnections,
    postMessage: state.postMessage,
  };
}

export default withRouter(
  reduxForm({
    form: "Search_People",
  })(
    connect(mapStateToProps, { getAllConnections, postMessage })(Myconnections)
  )
);
