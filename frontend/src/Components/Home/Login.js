import React, { Component } from "react";
import "../../App.css";
import "../../home_wrapper.css";
import "../../profile_wrapper.css";
import { reduxForm } from "redux-form";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { applicantlogin } from "../../Actions";
import validator from "validator";
import { userConstants } from "../../constants";

import FloatingLabel from "floating-label-react";

// const inputStyle = {
//   floating: {
//     ...floatingStyles,
//     color: "black",
//   },
//   focus: {
//     ...focusStyles,
//     borderColor: "black",
//   },
//   input: {
//     ...inputStyles,
//     borderBottomWidth: 2,
//     borderBottomColor: "black",
//     width: "400px",
//   },
//   label: {
//     ...labelStyles,
//     marginTop: ".5em",
//     width: "400px",
//   },
// };

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: "", isValid: true },
      password: { value: "", isValid: true },
      message: "",
      islogged: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  changeHandler = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,
        isValid: true,
      },
    };
    this.setState(state);
  };

  handleValidation() {
    let formIsValid = true;
    const email = { ...this.state.email };
    const password = { ...this.state.password };

    this.setState({
      message: "",
    });

    if (!email.value || email.value === "") {
      formIsValid = false;
      this.setState({
        message: "Please enter your email address",
      });
      email.isValid = false;
      return formIsValid;
    }
    if (typeof email.value !== "undefined") {
      if (!validator.isEmail(email.value)) {
        formIsValid = false;
        this.setState({
          message: "Please enter a valid email address",
        });
        email.isValid = false;
        return formIsValid;
      }
    }

    if (!password.value || password.value === "") {
      formIsValid = false;
      this.setState({
        message: "Please enter your password",
      });
      password.isValid = false;
      return formIsValid;
    }
    return formIsValid;
  }

  componentWillMount() {
    const email = { ...this.state.email };
    const password = { ...this.state.password };
    email.value = this.props.location.state
      ? this.props.location.state.email
      : "";
    password.value = this.props.location.state
      ? this.props.location.state.password
      : "";
    this.setState({
      message: this.props.location.state
        ? this.props.location.state.message
        : "",
    });
  }

  submitLogin(event) {
    event.preventDefault();
    if (this.handleValidation()) {
      const { email, password } = this.state;
      if (email && password) {
        const data = {
          email: email.value,
          password: password.value,
        };
        this.props
          .applicantlogin(data)
          .then((response) => {
            if (response.payload.status === 200) {
              localStorage.setItem(
                userConstants.USER_DETAILS,
                JSON.stringify(response.payload.data)
              );
              localStorage.setItem(
                userConstants.AUTH_TOKEN,
                JSON.stringify(response.payload.data.token)
              );
              this.setState({
                islogged: true,
              });
            }
          })
          .catch((error) => {
            console.log("Error is", error);
            this.setState({
              message: "Please enter valid email address and password",
            });
          });
      }
    }
  }

  render() {
    const { email, password, message, islogged } = { ...this.state };
    let redirectVar = null;
    if (islogged) {
      redirectVar = <Redirect to="/profile" />;
    }
    return (
      <div className="profilelocation-wrapper">
        {redirectVar}
        <div className="navbar fixed-top">
          <div className="home_wrapper">
            <h1>
              <a className="navbar-brand" href="/">
                <img src={"/images/linkedinfulllogo.png"} alt="LinkedIn" />
              </a>
            </h1>
          </div>
        </div>
        <div className="main2">
          <h2
            className="subtitle"
            style={{ fontSize: "1.4rem", fontWeight: "300" }}
          >
            <strong>Welcome Back</strong>
          </h2>
          <h3
            className="subtitle"
            style={{ fontSize: "1.4rem", fontWeight: "300" }}
          >
            Don't miss your next opportunity. Sign in to stay updated on your
            professional world.
          </h3>
          <FloatingLabel
            id="email"
            name="email"
            placeholder="Email"
            //styles={inputStyle}
            onChange={this.changeHandler}
            type="email"
            defaultValue={email.value}
            required
          />
          <FloatingLabel
            id="password"
            name="password"
            placeholder="Password"
            //styles={inputStyle}
            onChange={this.changeHandler}
            type="password"
            defaultValue={password.value}
            required
          />
          <div className="reg-alert1" role="alert" tabIndex="-1">
            {message && (
              <div className="wrapper">
                <p className="message">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="alert-content"> {message} </span>
                </p>
              </div>
            )}
          </div>
          <input
            onClick={this.submitLogin}
            id="registration-submit"
            className="registration submit-button"
            type="submit"
            value="Sign in"
          ></input>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    applicantlogin: state.applicantlogin,
  };
}

export default withRouter(
  reduxForm({
    form: "Login",
  })(connect(mapStateToProps, { applicantlogin })(Login))
);
