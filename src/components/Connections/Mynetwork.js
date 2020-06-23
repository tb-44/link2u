import React, { Component } from "react";
import "../../App.css";
import "../../jobsearch_wrapper.css";
import "./connections.css";
import Navbar from "../NavBar/Navbar";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import {
  getAllConnections,
  connectionresponse,
} from "../../Actions/action_connections";
import PostJobNav from "../PostJobs/PostJobNav";

class Mynetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalinvitations: 0,
      totalconnections: 0,
      invitations: [],
    };
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
    this.props.getAllConnections(token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var incoming = response.payload.data.connections.connectionsIncoming;
        var connections = response.payload.data.connections.connectionsApproved;
        this.setState({
          invitations: incoming,
          totalinvitations: incoming.length,
          totalconnections: connections.length,
        });
      }
    });
  }

  Pendinglist() {
    var self = this;
    const { invitations, isLoading } = this.state;
    if (!isLoading) {
      return Object.keys(invitations).map(function (i) {
        return (
          <div key={i}>
            <ul className="mn-invitations-preview__header">
              <li className="invitation-card ember-view">
                <div className="invitation-card__info-wrapper">
                  <div className="invitation-card__details">
                    <div className="details-view">
                      <div className="msg-conversation-card__row pr2">
                        <img
                          alt=""
                          src="/images/avatar.png"
                          style={{ width: "56px", height: "56px" }}
                        />
                        <div className="row" style={{ marginLeft: "15px" }}>
                          <div className="form-group">
                            <h5 className="t-14 t-black t-normal">
                              {invitations[i].firstName}&nbsp;
                              {invitations[i].lastName}
                            </h5>
                            <h5 className="t-12 t-black--light t-normal">
                              Senior Accountant at asfasfasff
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="invitation-card__action-container pl3 pr5">
                        <button
                          type="submit"
                          className="btn arteco-btn-save"
                          onClick={(event) =>
                            self.connectionresponse(
                              event,
                              "n",
                              invitations[i],
                              i
                            )
                          }
                        >
                          Ignore
                        </button>
                        <button
                          type="submit"
                          className="btn arteco-btn"
                          onClick={(event) =>
                            self.connectionresponse(
                              event,
                              "y",
                              invitations[i],
                              i
                            )
                          }
                          style={{ marginLeft: "10px" }}
                        >
                          Accept
                        </button>
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

  connectionresponse = (event, response, invitation, i) => {
    const token = JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

    var data = {};
    if (response === "y") {
      data = {
        receiver: {
          username: invitation.email,
          firstname: invitation.firstName,
          lastname: invitation.lastName,
        },
        isAccepted: "true",
      };
    } else {
      data = {
        receiver: {
          username: invitation.email,
          firstname: invitation.firstName,
          lastname: invitation.lastName,
        },
        isAccepted: "false",
      };
    }
    this.props.connectionresponse(data, token).then((response) => {
      console.log("response:", response);
      if (response.payload.status === 200) {
        var invitations = this.state.invitations;
        invitations.splice(i, 1);
        var totalinvitations = invitations.length;
        this.setState({
          invitations: invitations,
          totalinvitations: totalinvitations,
        });
        console.log("Connection Response sent successfully");
      }
    });
  };

  render() {
    let role = localStorage.getItem("role");
    return (
      <div className="jobsearch-wrapper">
        {role && role === "R" ? <PostJobNav /> : <Navbar />}
        <div className="neptune-grid1" style={{ marginTop: "70px" }}>
          <div className="left-rail">
            <div className="sticky ember-view">
              <div className="left-rail-container ">
                <div className="mn-connections-summary container-with-shadow ember-view">
                  <a href="/myconnections">
                    <h3 className="t-13 t-black t-normal">
                      Connections&nbsp;({this.state.totalconnections})
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="core-rail">
            <div className="mn-invitations-preview mb4 artdeco-card ember-view">
              <header className="artdeco-card__header mn-invitations-preview__header">
                <h3 className="t-16 t-black t-normal">
                  Invitations&nbsp;({this.state.totalinvitations})
                </h3>
              </header>
              {this.Pendinglist()}
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
    connectionresponse: state.connectionresponse,
  };
}

export default withRouter(
  reduxForm({
    form: "Search_People",
  })(
    connect(mapStateToProps, { getAllConnections, connectionresponse })(
      Mynetwork
    )
  )
);
