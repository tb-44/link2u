import React, { Component } from "react";
import RecruiterNavPlain from "./RecruiterNavPlain";
import { withRouter } from "react-router-dom";

class NotARecruiter extends Component {
  render() {
    return (
      <div>
        <RecruiterNavPlain />

        <div className="rows">
          <div className="container text-center">
            <br />
            <br />
            <br />
            <h2
              style={{ opacity: ".7", fontWeight: "200", color: "#006097" }}
              className=" text-center"
            >
              You are not a Recruiter. Go Back to Where you Came From :P
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NotARecruiter);
