/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import URI from "../../constants/URI";
import Navbar from "../NavBar/NavBar";

var BarChart = require("react-chartjs").Bar;

class ApplicantGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileViews: null,
    };
  }

  ProfileViewsGraph = () => {
    let data = null;
    let email = JSON.parse(localStorage.getItem("user_details")).email;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = JSON.parse(
      localStorage.getItem("auth_token")
    );
    axios
      .get(`${URI.ROOT_URL}/graph_profile_views`, {
        params: {
          email,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          data = {
            labels: res.data.labels,
            datasets: [
              {
                label: "My dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: res.data.values,
              },
            ],
          };
          console.log("Profile Views Graph", data);
          this.setState({
            profileViews: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.ProfileViewsGraph();
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <br />
        <br />
        <br />
        <div className="container text-center">
          <h1 style={{ fontWeight: "200" }}>Statistical Analysis</h1>
          <h2 style={{ fontWeight: "200" }}>Profile Views Graph</h2>
          <h3 style={{ fontWeight: "200" }}>
            See How Many People Have Viewed Your graph in the Last 30 Days
          </h3>

          <br />
          <br />
          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <div className="row">
                    <div className="col-8">
                      {this.state.profileViews === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        <BarChart
                          data={this.state.profileViews}
                          width="1000"
                          height="250"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default withRouter(ApplicantGraph);
