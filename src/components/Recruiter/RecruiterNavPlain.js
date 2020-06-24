import React, { Component } from "react";

class RecruiterNavPlain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className=" bottomBorder navbar navbar-expand-md navbar-fixed-top navbar-dark blueBackground main-nav">
          <div className="container" style={{ marginLeft: "15%" }}>
            <a className="navbar-brand" href="/">
              <img
                style={{ width: "50%" }}
                src="images/linkedinjob.png"
                alt=""
              />
            </a>

            <ul className="nav navbar-nav">
              <li className="nav-link ">
                <a className="text-white" href="/">
                  LINK2U.COM
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default RecruiterNavPlain;
