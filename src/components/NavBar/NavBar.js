import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import { withRouter, Link } from "react-router-dom";
import { userConstants } from "../../constants";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection:
        this.props.location.state === undefined
          ? "Jobs"
          : this.props.location.state.selection,
      jobname: "",
      location: "",
      search: "",
    };
    this.signout = this.signout.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }

  signout = () => {
    localStorage.clear();
  };

  changeHandler = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: e.target.value,
    };

    this.setState(state);
  };

  componentDidMount() {
    //call to action
    if (!localStorage.getItem(userConstants.USER_DETAILS)) {
      window.location = "/";
    }
  }

  onJobSearch = () => {
    console.log(this.state);
    if (this.state.selection === "Jobs") {
      this.props.history.push({
        pathname: "/searchjobs",
        state: {
          selection: this.state.selection,
          jobname: this.state.jobname,
          location: this.state.location,
        },
      });
      window.location.reload();
    }
  };

  onPersonSearch = () => {
    console.log(this.state);
    if (this.state.selection === "People") {
      this.props.history.push({
        pathname: "/searchpeople",
        state: {
          selection: this.state.selection,
          search: this.state.search,
        },
      });
      window.location.reload();
    }
  };

  changeSelection = (e) => {
    this.setState({
      selection: e.target.value,
    });
  };

  render() {
    return (
      <div
        className="navbar fixed-top navbar-dark bg-dark"
        style={{ height: "52px" }}
      >
        <div className="home_wrapper">
          <div
            className="nav-main__content full-height display-flex align-items-center"
            role="navigation"
          >
            <h1>
              <a
                className="navbar-brand"
                href="/"
                style={{ marginTop: "10px", marginRight: "0px" }}
              >
                <img src={"/images/linkedin-logo2.png"} alt="" />
              </a>
            </h1>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                style={{ color: "#dee2e6" }}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.selection}
              </button>
              <div
                className="dropdown-menu selection-nav"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  type="button"
                  className="dropdown-item"
                  value="Jobs"
                  onClick={(e) => this.changeSelection(e)}
                >
                  Jobs
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  value="People"
                  onClick={(e) => this.changeSelection(e)}
                >
                  People
                </button>
              </div>
            </div>
            {this.state.selection === "Jobs" ? (
              <div className="nav-search-bar">
                <div className="nav-typeahead-wormhole">
                  <div className="jobs-search-box">
                    <label
                      htmlFor="jobsearch1"
                      className="visually-hidden"
                    ></label>
                    <FontAwesomeIcon
                      className="fa-search"
                      icon="search"
                    ></FontAwesomeIcon>
                    <input
                      type="text"
                      name="jobname"
                      onChange={this.changeHandler}
                      id="jobsearch1"
                      className="jobs-search-box__input"
                      placeholder="Search Jobs"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="nav-search-bar">
                <div className="nav-typeahead-wormhole">
                  <div className="jobs-search-box">
                    <label
                      htmlFor="jobsearch1"
                      className="visually-hidden"
                    ></label>
                    <FontAwesomeIcon
                      className="fa-search"
                      icon="search"
                    ></FontAwesomeIcon>
                    <input
                      type="text"
                      name="search"
                      onChange={this.changeHandler}
                      id="jobsearch1"
                      className="jobs-search-box__input"
                      placeholder="Search People"
                    />
                  </div>
                </div>
              </div>
            )}
            {this.state.selection === "Jobs" ? (
              <div className="nav-search-bar" style={{ marginLeft: "10px" }}>
                <div className="nav-typeahead-wormhole">
                  <div className="jobs-map-box">
                    <label
                      htmlFor="jobsearch2"
                      className="visually-hidden"
                    ></label>
                    <FontAwesomeIcon
                      className="fa-map-marker-alt"
                      icon="map-marker-alt"
                    ></FontAwesomeIcon>
                    <input
                      type="text"
                      id="jobsearch2"
                      name="location"
                      onChange={this.changeHandler}
                      className="jobs-map-box__input"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.selection === "Jobs" ? (
              <div className="nav-search-bar" style={{ marginLeft: "10px" }}>
                <div className="nav-typeahead-wormhole">
                  <button
                    type="submit"
                    id="jobsearch3"
                    className="search-jobs"
                    onClick={this.onJobSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="nav-search-bar" style={{ marginLeft: "10px" }}>
                <div className="nav-typeahead-wormhole">
                  <button
                    type="submit"
                    id="jobsearch3"
                    className="search-jobs"
                    onClick={this.onPersonSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}

            <ul
              className="nav-main nav-container display-flex full-height"
              role="navigation"
              aria-label="primary"
            >
              <span className="nav-item nav-item__icon">
                <li className="nav-item--jobs">
                  <a
                    href="/mynetwork"
                    className="nav-item__link nav-item__link--underline js-nav-item-link"
                  >
                    <FontAwesomeIcon
                      color="#dee2e6"
                      size="lg"
                      icon="users"
                    ></FontAwesomeIcon>
                    <small
                      className="nocolor small"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      My Network
                    </small>
                  </a>
                </li>
              </span>
              <span className="nav-item nav-item__icon">
                <li className="nav-item--jobs">
                  <a
                    href="/searchjobs"
                    className="nav-item__link nav-item__link--underline js-nav-item-link"
                  >
                    <FontAwesomeIcon
                      color="#dee2e6"
                      size="lg"
                      icon="suitcase"
                    ></FontAwesomeIcon>
                    <small className="nocolor small">Jobs</small>
                  </a>
                </li>
              </span>
              <span className="nav-item nav-item__icon">
                <li className="nav-item--messaging">
                  <Link
                    to="/messages"
                    className="nav-item__link nav-item__link--underline js-nav-item-link"
                  >
                    <FontAwesomeIcon
                      color="#dee2e6"
                      size="lg"
                      icon="comments"
                    ></FontAwesomeIcon>
                    <small className="nocolor small">Messaging</small>
                  </Link>
                </li>
              </span>
              <span className="nav-item nav-item__icon">
                <li className="nav-item--profile">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="nav-item__link nav-item__link--underline js-nav-item-link dropdown-toggle"
                      id="dropdownMenuProfile"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon
                        color="#dee2e6"
                        size="lg"
                        icon="user-circle"
                      ></FontAwesomeIcon>
                      <small className="nocolor small">Me</small>
                    </button>
                    <div
                      className="dropdown-menu selection-nav"
                      aria-labelledby="dropdownMenuProfile"
                    >
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                      <a className="dropdown-item" href="/applicantdashboard">
                        Dashboard
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/searchjobs">
                        Job Postings
                      </a>
                      <a className="dropdown-item" href="/job/saved">
                        Saved Jobs
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        onClick={this.signout}
                        href=" "
                      >
                        Sign Out
                      </a>
                    </div>
                  </div>
                </li>
              </span>
            </ul>
            <ul
              className="nav-side nav-container display-flex full-height"
              role="navigation"
              aria-label="primary"
            >
              <span className="nav-item nav-item__icon">
                <li className="nav-item--postjobs">
                  <a
                    href="/jobs"
                    className="nav-item__link nav-item__link--underline js-nav-item-link"
                  >
                    <FontAwesomeIcon
                      color="#dee2e6"
                      size="lg"
                      icon="calendar-alt"
                    ></FontAwesomeIcon>
                    <small
                      className="nocolor small"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Post a Job
                    </small>
                  </a>
                </li>
              </span>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Navbar);
