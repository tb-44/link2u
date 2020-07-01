import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { populateJobsForm } from "../../Actions/recruiterActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import checkValidityRecruiter from "../../Actions/ValidityScript";

class PostAJobHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      city: "",
    };
  }

  componentWillMount() {
    checkValidityRecruiter(this);
  }
  companyChangeHandler = (e) => {
    this.setState({
      company: e.target.value,
    });
  };

  titleChangeHandler = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  startAJobClickHandler = (e) => {
    let data = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.city,
    };

    this.props.populateJobsForm(data);

    this.props.history.push("/postajob");
  };

  render() {
    return (
      <div>
        <PostJobNav />
        <div className="blueBackground" style={{ minHeight: "95vh" }}>
          <div className="container text-center ">
            <br />
            <br />
            <br />
            <h2
              style={{ opacity: ".7", fontWeight: "200" }}
              className="text-white"
            >
              Reach the quality candidates you can’t find anywhere else.
            </h2>
            <br />
            <br />
            <br />

            <div className="row">
              <div className="col-5 offset-3">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <div className="input-group">
                      <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="fas fa-building border-right-0" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Company"
                        aria-label="company"
                        aria-describedby="company"
                        onChange={this.companyChangeHandler}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="fas fa-suitcase border-right-0" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Job title"
                        aria-label="jobtitle"
                        aria-describedby="jobtitle"
                        onChange={this.titleChangeHandler}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="fas fa-map-marker-alt border-right-0" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Job address or city"
                        aria-label="jbcity"
                        aria-describedby="jbcity"
                        onChange={this.cityChangeHandler}
                      />
                    </div>
                    <br />
                    <button
                      type="button"
                      style={{ background: "#004b7c" }}
                      className="btn btn-lg btn-block text-white"
                      onClick={this.startAJobClickHandler}
                    >
                      Start job post
                    </button>
                  </div>
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
  return {};
}

export default withRouter(
  connect(mapStateToProps, { populateJobsForm })(PostAJobHome)
);
