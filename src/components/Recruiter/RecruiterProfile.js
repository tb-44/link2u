import React, { Component } from "react";
import RecruiterNavPlain from "./RecruiterNavPlain";
import { recruiterSignIn } from "../../Actions/recruiterActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class RecruiterSigin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      localErrorMessage: "",
    };

    this.signInClickHandler = this.signInClickHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  }

  validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  isBlank = (text) => {
    let regex = /^\s*\S+.*/;
    return regex.test(text);
  };

  signInClickHandler = (e) => {
    e.preventDefault();
    this.setState({
      localerror: false,
      localErrorMessage: "",
    });
    if (!this.isBlank(this.state.email) || !this.isBlank(this.state.password)) {
      this.setState({
        localerror: true,
        localErrorMessage: "Fields Cannot be left Empty",
      });
    } else if (!this.validateEmail(this.state.email)) {
      this.setState({
        localerror: true,
        localErrorMessage: "Invalid Email",
      });
    } else {
      let data = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.recruiterSignIn(data);
    }
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    if (this.props.SignInState.success) {
      this.props.history.push({
        pathname: "/recruiterdash",
      });
    }

    return (
      <div>
        <RecruiterNavPlain />
        <div
          className="blueBackground text-center"
          style={{ minHeight: "95vh" }}
        >
          <div className="container text-center ">
            <br />
            <br />
            <br />
            <h2
              style={{ opacity: ".7", fontWeight: "200" }}
              className="text-white text-center"
            >
              Sign up to LinkedIn Recruiter and start hiring people
            </h2>
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-5 offset-3">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <form>
                      <br />
                      <div className="input-group">
                        <div className="input-group-append border-right-0">
                          <span className="input-group-text bg-transparent border-right-0">
                            <i className="fas fa-at border-right-0" />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control form-control-lg border-left-0"
                          placeholder="Email"
                          onChange={this.emailChangeHandler}
                        />
                      </div>

                      <br />
                      <div className="input-group">
                        <div className="input-group-append border-right-0">
                          <span className="input-group-text bg-transparent border-right-0">
                            <i className="fas fa-key border-right-0" />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control form-control-lg border-left-0"
                          placeholder="Password"
                          onChange={this.passwordChangeHandler}
                        />
                      </div>
                      <br />
                      <button
                        type="submit"
                        style={{ background: "#004b7c" }}
                        onClick={this.signInClickHandler}
                        className="btn btn-lg btn-block text-white"
                      >
                        Sign In
                      </button>

                      {this.state.localerror ? (
                        <div>
                          <br />
                          <span className="text-danger">
                            {this.state.localErrorMessage}
                          </span>
                        </div>
                      ) : null}

                      {this.props.SignInState.error ? (
                        <div>
                          <br />
                          <span className="text-danger">
                            {this.props.SignInState.errorMessage}
                          </span>
                        </div>
                      ) : null}
                    </form>
                  </div>
                </div>
                <br />
                <br />
                <a className="text-white" href="/recruiterSignup">
                  Click Here to Sign Up
                </a>
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
    SignInState: state.RecruiterLoginReducer,
  };
}
export default withRouter(
  connect(mapStateToProps, { recruiterSignIn })(RecruiterSigin)
);
