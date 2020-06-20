import React, { Component } from "react";
import "../../App.css";
import "../../home_wrapper.css";
import "../../profile_wrapper.css";
import { Redirect } from "react-router";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { applicantsignup } from "../../Actions";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      city: "",
      state: "",
      zipcode: "",
      title: { value: "", isValid: true },
      company: { value: "", isValid: true },
      location: { value: "", isValid: true },
      fromMonth: { value: "", isValid: true },
      fromYear: { value: "", isValid: true },
      school: { value: "", isValid: true },
      degree: { value: "", isValid: true },
      schoolfromYear: { value: "", isValid: true },
      schooltoYear: { value: "", isValid: true },
      message: "",
      signedUp: false,
    };

    this.submitSignup = this.submitSignup.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentWillMount() {
    this.setState({
      firstname: this.props.location.state
        ? this.props.location.state.firstname
        : "",
      lastname: this.props.location.state
        ? this.props.location.state.lastname
        : "",
      email: this.props.location.state ? this.props.location.state.email : "",
      password: this.props.location.state
        ? this.props.location.state.password
        : "",
      city: this.props.location.state ? this.props.location.state.city : "",
      state: this.props.location.state ? this.props.location.state.state : "",
      zipcode: this.props.location.state
        ? this.props.location.state.zipcode
        : "",
    });
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
    const {
      title,
      company,
      location,
      school,
      degree,
      schoolfromYear,
      schooltoYear,
    } = { ...this.state };

    this.setState({
      message: "",
    });

    //title
    if (!title.value || title.value === "") {
      formIsValid = false;
      title.isValid = false;
      this.setState({
        message: "Please enter a Title to your Work Experience",
      });
      return formIsValid;
    }

    if (!company.value || company.value === "") {
      formIsValid = false;
      company.isValid = false;
      this.setState({
        message:
          "Please enter your current Company Name or enter None otherwise",
      });
      return formIsValid;
    }

    if (!location.value || location.value === "") {
      formIsValid = false;
      location.isValid = false;
      this.setState({
        message:
          "Please enter your current Work location or enter None otherwise",
      });
      return formIsValid;
    }

    if (!school.value || school.value === "") {
      formIsValid = false;
      school.isValid = false;
      this.setState({
        message: "Please enter the School you last studied in",
      });
      return formIsValid;
    }

    if (!degree.value || degree.value === "") {
      formIsValid = false;
      degree.isValid = false;
      this.setState({
        message: "Please enter the degree you last completed",
      });
      return formIsValid;
    }

    if (!schoolfromYear.value || schoolfromYear.value === "") {
      formIsValid = false;
      schoolfromYear.isValid = false;
      this.setState({
        message: "Please enter the FROM year of your education",
      });
      return formIsValid;
    }

    if (!schooltoYear.value || schooltoYear.value === "") {
      formIsValid = false;
      schooltoYear.isValid = false;
      this.setState({
        message: "Please enter the TO year of your education",
      });
      return formIsValid;
    } else {
      if (schooltoYear.value < schoolfromYear.value) {
        this.setState({
          message: "TO Year of School should be greater than FROM year",
        });
        formIsValid = false;
      }
    }
    return formIsValid;
  }

  submitSignup(event) {
    event.preventDefault();
    if (this.handleValidation()) {
      const {
        firstname,
        lastname,
        email,
        password,
        state,
        city,
        zipcode,
        title,
        company,
        location,
        fromMonth,
        fromYear,
        school,
        degree,
        schoolfromYear,
        schooltoYear,
      } = { ...this.state };
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        state: state,
        city: city,
        zipcode: zipcode,
        title: title.value,
        company: company.value,
        location: location.value,
        fromMonth: fromMonth.value,
        fromYear: fromYear.value,
        school: school.value,
        degree: degree.value,
        schoolfromYear: schoolfromYear.value,
        schooltoYear: schooltoYear.value,
      };
      console.log(data);
      this.props
        .applicantsignup(data)
        .then((response) => {
          if (response.payload.status === 200) {
            this.setState({
              signedUp: true,
            });
          }
        })
        .catch((error) => {
          console.log("Error is", error);
          alert("User ID already exists!!");
        });
    }
  }

  render() {
    const {
      title,
      company,
      location,
      fromMonth,
      fromYear,
      school,
      degree,
      schoolfromYear,
      schooltoYear,
      message,
    } = { ...this.state };
    let redirectVar = null;
    if (this.state.signedUp) {
      redirectVar = <Redirect to="/" />;
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
        <div className="main1">
          <h3
            className="subtitle"
            style={{ fontSize: "1.4rem", fontWeight: "300" }}
          >
            Your Profile helps you discover the right people and opportunities
          </h3>
          <div className="reg-alert2" role="alert" tabIndex="-1">
            {message && (
              <div className="wrapper">
                <p className="message">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="alert-content"> {message} </span>
                </p>
              </div>
            )}
          </div>
          <section className="form-body" style={{ marginBottom: "50px" }}>
            <h2 className="pv-profile-section__card-heading t-20 t-black t-normal">
              Experience
            </h2>
            <label htmlFor="position-title-typeahead" className="mb1 required">
              Title
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="title"
              value={title.value}
              id="position-title-typeahead"
              placeholder="Ex: Manager"
              maxLength="100"
              type="text"
            />

            <label
              htmlFor="position-company-typeahead"
              className="mb1 required"
            >
              Company
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="company"
              value={company.value}
              id="position-company-typeahead"
              placeholder="Ex: Microsoft"
              maxLength="100"
              type="text"
            />

            <label
              htmlFor="position-location-typeahead"
              className="mb1 required"
            >
              Location
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="location"
              value={location.value}
              id="position-location-typeahead"
              placeholder="Ex: London, United Kingdom"
              maxLength="100"
              type="text"
            />

            <label htmlFor="position-date-typeahead" className="mb1 required">
              From (Select a Month & Year only if applicable){" "}
            </label>
            <select
              className="form-control edit-date"
              onChange={this.changeHandler}
              name="fromMonth"
              value={fromMonth.value}
              id="position-date-typeahead"
            >
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <select
              id="position-start-typeahead"
              onChange={this.changeHandler}
              name="fromYear"
              value={fromYear.value}
              className="form-control edit-year"
            >
              <option value="">Year</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
            </select>
            <hr />
            <h2 className="pv-profile-section__card-heading t-20 t-black t-normal">
              Education
            </h2>
            <label htmlFor="position-school-typeahead" className="mb1 required">
              School
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="school"
              value={school.value}
              id="position-school-typeahead"
              placeholder="Ex: Boston University"
              maxLength="100"
              type="text"
            />

            <label htmlFor="position-degree-typeahead" className="mb1 required">
              Degree
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="degree"
              value={degree.value}
              id="position-degree-typeahead"
              placeholder="Ex: Bachelor's"
              maxLength="100"
              type="text"
            />

            <label htmlFor="position-date-typeahead" className="mb1 required">
              From - To
            </label>
            <select
              id="position-start-typeahead"
              onChange={this.changeHandler}
              name="schoolfromYear"
              value={schoolfromYear.value}
              className="form-control edit-year"
            >
              <option value="">Year</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
            </select>

            <select
              id="position-end-typeahead"
              onChange={this.changeHandler}
              name="schooltoYear"
              value={schooltoYear.value}
              className="form-control edit-year"
            >
              <option value="">Year</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
            </select>

            <input
              id="registration-submit"
              onClick={this.submitSignup}
              className="registration submit-button"
              type="submit"
              value="Agree & Confirm"
            ></input>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    applicantsignup: state.applicantsignup,
  };
}

export default withRouter(
  reduxForm({
    form: "Applicant_Signup_Page",
  })(connect(mapStateToProps, { applicantsignup })(ProfileEdit))
);
