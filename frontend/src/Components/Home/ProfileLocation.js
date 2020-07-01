import React, { Component } from "react";
import "../../App.css";
import "../../home_wrapper.css";
import "../../profile_wrapper.css";

class ProfileLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      city: { value: "", isValid: true },
      state: { value: "", isValid: true },
      zipcode: { value: "", isValid: true },
      message: "",
    };

    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
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
    const state = { ...this.state.state };
    const zipcode = { ...this.state.zipcode };
    const city = { ...this.state.city };

    this.setState({
      message: "",
    });

    //state
    if (!state.value || state.value === "") {
      formIsValid = false;
      state.isValid = false;
      this.setState({
        message: "Please select a State",
      });
      return formIsValid;
    }

    //zipcode
    if (!zipcode.value || zipcode.value === "") {
      formIsValid = false;
      zipcode.isValid = false;
      this.setState({
        message: "Please enter a Zipcode",
      });
      return formIsValid;
    }

    if (!city.value || city.value === "") {
      formIsValid = false;
      city.isValid = false;
      this.setState({
        message: "Please enter a city name",
      });
      return formIsValid;
    }

    if (typeof zipcode.value !== "undefined") {
      if (!zipcode.value.match(/(^[0-9]{5}(?:-[0-9]{4})?$)/)) {
        formIsValid = false;
        zipcode.isValid = false;
        this.setState({
          message: "Please enter a valid Zipcode",
        });
        return formIsValid;
      }
    }
    return formIsValid;
  }

  submitSignup(event) {
    //prevent page from refresh
    event.preventDefault();
    this.setState({
      message: "",
    });
    if (this.handleValidation()) {
      const {
        firstname,
        lastname,
        email,
        password,
        state,
        city,
        zipcode,
      } = this.state;
      this.props.history.push({
        pathname: "/profileedit/new",
        state: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          state: state.value,
          city: city.value,
          zipcode: zipcode.value,
        },
      });
    }
  }

  render() {
    const { state, city, zipcode, message } = { ...this.state };
    return (
      <div className="profilelocation-wrapper">
        <div className="navbar fixed-top">
          <div className="home_wrapper">
            <h1>
              <a href=" " className="navbar-brand">
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
            Let's start your profile, connect to people you know, and engage
            with them on topics you care about.
          </h3>
          <section className="form-body">
            <label htmlFor="reg-location" className="mb1 required">
              Country/Region
            </label>
            <select
              className="form-control"
              onChange={this.changeHandler}
              name="state"
              value={state.value}
              style={{ width: "500px" }}
              id="reg-location"
              maxLength="100"
              type="text"
            >
              <option value="">United States</option>
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District Of Columbia">District Of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
            <label htmlFor="reg-city" className="mb1 required">
              City*
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="city"
              value={city.value}
              id="reg-city"
              placeholder="Type city name in lower letters"
              type="text"
            />
            <label htmlFor="reg-zipcode" className="mb1 required">
              Postal Code
            </label>
            <input
              className="form-control"
              onChange={this.changeHandler}
              name="zipcode"
              value={zipcode.value}
              id="reg-zipcode"
              pattern="[0-9]{5}"
              placeholder="Five digit zip code"
              type="text"
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
              onClick={this.submitSignup}
              id="registration-submit"
              className="registration submit-button"
              type="submit"
              value="Next"
            ></input>
          </section>
        </div>
      </div>
    );
  }
}

export default ProfileLocation;
