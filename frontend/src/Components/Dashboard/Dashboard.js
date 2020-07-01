import React, { Component } from "react";
import PostJobNav from "../PostJobs/PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkValidityRecruiter from "../../Actions/ValidityScript";

class RecruiterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    checkValidityRecruiter(this);
  }

  render() {
    return (
      <div>
        <PostJobNav />
        <div className="row bg blueBackground">
          <div className="container   ">
            <br />
            <br />
            <div className="row">
              <br />
              <br />
              <div className="col-4">
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/postajobhome",
                    });
                  }}
                  class="card shadow-lg text-center dashItem"
                >
                  <div class="card-body">
                    <br />
                    <br />
                    <FontAwesomeIcon
                      color="#006097"
                      size="4x"
                      icon="suitcase"
                    />
                    <h2 className="lightFont"> Post Jobs</h2>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="col-4">
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/jobs",
                    });
                  }}
                  class="card shadow-lg text-center dashItem"
                >
                  <div class="card-body">
                    <br />
                    <br />
                    <FontAwesomeIcon color="#006097" size="4x" icon="list-ul" />
                    <h2 className="lightFont"> View Jobs</h2>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="col-4">
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/graphs",
                    });
                  }}
                  class="card shadow-lg text-center dashItem"
                >
                  <div class="card-body">
                    <br />
                    <br />
                    <FontAwesomeIcon
                      color="#006097"
                      size="4x"
                      icon="chart-pie"
                    />
                    <h2 className="lightFont"> Graphs</h2>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="row">
              <br />
              <br />
              <div className="col-4">
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/recruiterSearchPeople",
                    });
                  }}
                  class="card shadow-lg text-center dashItem"
                >
                  <div class="card-body">
                    <br />
                    <br />
                    <FontAwesomeIcon
                      color="#006097"
                      size="4x"
                      icon="user-circle"
                    />
                    <h2 className="lightFont"> People</h2>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="col-4">
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/messages",
                    });
                  }}
                  class="card shadow-lg text-center dashItem"
                >
                  <div class="card-body">
                    <br />
                    <br />
                    <FontAwesomeIcon
                      color="#006097"
                      size="4x"
                      icon="envelope"
                    />
                    <h2 className="lightFont"> Messages</h2>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="col-4">
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/mynetwork",
                    });
                  }}
                  class="card shadow-lg text-center dashItem"
                >
                  <div class="card-body">
                    <br />
                    <br />
                    <FontAwesomeIcon color="#006097" size="4x" icon="plug" />
                    <h2 className="lightFont"> Connection Requests</h2>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default RecruiterDashboard;
