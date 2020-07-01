import React, { Component } from "react";
import RecruiterProfileInformationForm from "./RecruiterProfileInformationForm";
import {
  getRecruiterProfileInformation,
  PostRecruiterInformation,
} from "../../Actions/recruiterActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import checkValidityRecruiter from "../../Actions/ValidityScript";
import PostJobNav from "../PostJobs/PostJobNav";

class RecruiterProfile extends Component {
  onUpdateProfile = (values) => {
    this.props.PostRecruiterInformation(values).then(() => {
      console.log("Edited Successfully");
      alert("Updated Profile");
    });
  };

  componentWillMount() {
    checkValidityRecruiter(this);
    this.props.getRecruiterProfileInformation().then(() => {
      console.log("Done");
    });
  }

  render() {
    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />
        <div className="container text-center">
          <h1 style={{ fontWeight: "200" }}> Profile Information</h1>

          <div className="row text-left">
            <br />
            <br />
            <RecruiterProfileInformationForm onSubmit={this.onUpdateProfile} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, {
    getRecruiterProfileInformation,
    PostRecruiterInformation,
  })(RecruiterProfile)
);
