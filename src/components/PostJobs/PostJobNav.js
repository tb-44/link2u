import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostJobNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className=" bottomBorder navbar navbar-expand-md navbar-fixed-top navbar-dark blueBackground main-nav">
          <div className="container" style={{ marginLeft: "15%" }}>
            <a className="navbar-brand" href="/recruiterDash">
              <img
                style={{ width: "50%" }}
                src="images/linkedinjob.png"
                alt=""
              />
            </a>
            <ul className="nav navbar-nav">
              <li className="nav-link">
                <a href="/messages">
                  <FontAwesomeIcon color="#dee2e6" size="lg" icon="envelope" />
                </a>
              </li>
              <li className="nav-link">
                <a href="/recprofile">
                  <FontAwesomeIcon
                    color="#dee2e6"
                    size="lg"
                    icon="user-circle"
                  />
                </a>
              </li>
              <li className="nav-link">
                <a
                  href=" "
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <FontAwesomeIcon
                    color="#dee2e6"
                    size="lg"
                    icon="sign-out-alt"
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default PostJobNav;
