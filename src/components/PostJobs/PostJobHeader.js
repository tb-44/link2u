import React, { Component } from "react";
import PostAJobWizard from "./PostAJobWizard";
import { createNewJob } from "../../Actions/recruiterActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import checkValidityRecruiter from "../../Actions/ValidityScript";
import PostJobNav from "./PostJobNav";

class PostJobHeader extends Component {
  onAddJobClickListener = (values) => {
    this.props
      .createNewJob(values)
      .then((res) => {
        console.log("Job Posted Successfully");
      })
      .catch((err) => {
        console.log("Error was encountered", err);
      });
  };
  componentWillMount() {
    checkValidityRecruiter(this);
  }

  render() {
    if (this.props.jobAdditionState.jobcreationmessage) {
      alert("Job Added Sucessfully!");
      this.props.history.push("/jobs");
    }

    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <br />
              <br />
              <PostAJobWizard onSubmit={this.onAddJobClickListener} />
            </div>
            <div className="col-4" style={{ fontSize: "90%" }}>
              <br />
              <br />
              <img src="images/bulb.png" style={{ width: "20%" }} alt="" />
              <br />
              <br />
              <b>Show your job to the right candidates </b>
              <br /> <br />
              Include more details such as relevant job functions, industries,
              and seniority level to help us advertise your job post to
              qualified candidates and recommend matches for you to reach out
              to.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobAdditionState: state.JobsReducer,
  };
}
export default withRouter(
  connect(mapStateToProps, { createNewJob })(PostJobHeader)
);
