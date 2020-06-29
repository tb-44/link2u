import React, { Component } from "react";
import PostJobNav from "../PostJobs/PostJobNav";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import checkValidityRecruiter from "../../Actions/ValidityScript";
import axios from "axios";
import URI from "../../constants/URI";
var BarChart = require("react-chartjs").Bar;
var LineChart = require("react-chartjs").Line;

class RecruiterGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topten: null,
      topTenMonth: "1",
      unpopularJobs: null,
      jobs: [],
      cityWiseMonth: "1",
      cityWiseJobTitle: null,
      cityWise: null,
      logGraph: [],
      clicksPerJob: null,
      savedJobs: null,
    };
  }

  jobIDChangeListener;

  jobIDChangeListener = (e) => {
    this.LogGraph(e.target.value + "");
  };

  CityWiseMonthChangeHandler = (e) => {
    this.setState({
      cityWiseMonth: e.target.value + "",
    });
    this.CityWiseGraph(this.state.cityWiseJobTitle, e.target.value + "");
  };

  CityWiseJobChangeHandler = (e) => {
    this.setState({
      cityWiseJobTitle: e.target.value + "",
    });
    this.CityWiseGraph(e.target.value + "", this.state.cityWiseMonth);
  };

  TopTenMonthChangeHandler = (e) => {
    this.setState({
      topTenMonth: e.target.value + "",
    });
    this.TopTenJobs(e.target.value + "");
  };

  TopTenJobs = (month) => {
    let data = null;
    let recruiterEmail = localStorage.getItem("username");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/graph_top_job_postings`, {
        params: {
          recruiterEmail,
          month,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          data = {
            labels: res.data.label.slice(0, 10),
            datasets: [
              {
                label: "My dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: res.data.values.slice(0, 10),
              },
            ],
          };

          console.log("Top Ten", data);

          this.setState({
            topten: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ClicksPerJob = () => {
    let data = null;
    let recruiterEmail = localStorage.getItem("username");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/graph_clicks_per_job`, {
        params: {
          recruiterEmail,
        },
      })
      .then((res) => {
        if (res.status === 200) {
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
          console.log("Clicks Per Job", data);
          this.setState({
            clicksPerJob: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  UnpopularJobs = () => {
    let data = null;
    let recruiterEmail = localStorage.getItem("username");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/graph_unpopular_job_postings`, {
        params: {
          recruiterEmail,
        },
      })
      .then((res) => {
        console.log("Unpopular Jobs", res);

        if (res.status === 200) {
          data = {
            labels: res.data.label,
            datasets: [
              {
                label: "My dataset",
                fillColor: res.data.colors,
                data: res.data.values,
              },
            ],
          };
          this.setState({
            unpopularJobs: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  SavedJobs = () => {
    let data = null;
    let recruiterEmail = localStorage.getItem("username");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/graph_saved_jobs`, {
        params: {
          email: recruiterEmail,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          data = {
            labels: ["Count"],
            datasets: [
              {
                label: "My dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [Object.keys(res.data.data).length],
              },
            ],
          };
          console.log("Saved Jobs", data);
          this.setState({
            savedJobs: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  CityWiseGraph = (jobID, month) => {
    let data = null;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/graph_citywise_applications`, {
        params: {
          jobID,
          month,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          data = {
            labels: res.data.lables,
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
          console.log("City Wise Jobs", data);

          this.setState({
            cityWise: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  LogGraph = (jobID) => {
    console.log();
    let recruiterEmail = localStorage.getItem("username");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/graph_log_event`, {
        params: {
          recruiterEmail,
          jobID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let labels = [
            "COMPLETELY_FILL_FORM",
            "HALF_FILL_FORM",
            "JUST_READ_APPLICATION",
          ];
          let data;
          let cities = [];
          let datasets = [];
          console.log(res);
          res.data.data.forEach((element) => {
            if (!cities.includes(element.city)) {
              cities.push(element.city);
            }
          });

          cities.forEach((city) => {
            let local_data = [0, 0, 0];
            res.data.data.forEach((element) => {
              if (element.city === city) {
                if (element.event_name === "COMPLETELY_FILL_FORM") {
                  local_data[0] = element.count;
                } else if (element.event_name === "HALF_FILL_FORM") {
                  local_data[1] = element.count;
                } else if (element.event_name === "JUST_READ_APPLICATION") {
                  local_data[2] = element.count;
                }
              }
            });

            data = {
              labels: labels,
              datasets: [
                {
                  label: city,
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: local_data,
                },
              ],
            };
            datasets.push(data);
          });

          console.log("Log Jobs", datasets);
          this.setState({
            logGraph: datasets,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  populateCity = () => {
    let recruiterEmail = localStorage.getItem("username");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "user"
    );
    axios
      .get(`${URI.ROOT_URL}/get_jobs_by_recruiter`, {
        params: {
          recruiterEmail,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Populate City", res);
          this.setState({
            jobs: res.data.allJobs,
            cityWiseJobTitle: res.data.allJobs[0]._id,
          });
          this.CityWiseGraph(res.data.allJobs[0]._id, "1");
          this.LogGraph(res.data.allJobs[0]._id);
          this.SavedJobs();
        }
      })
      .catch((err) => {
        console.log("Populate City", err);
      });
  };

  componentDidMount() {
    this.TopTenJobs(this.state.topTenMonth);
    this.ClicksPerJob();
    this.UnpopularJobs();
    this.populateCity();
  }

  componentWillMount() {
    checkValidityRecruiter(this);
  }
  render() {
    let cities = this.state.jobs.map((job) => {
      return <option value={job._id}>{job.title}</option>;
    });
    let lographs = null;

    if (this.state.logGraph.length > 0) {
      lographs = this.state.logGraph.map((graph) => {
        let city = graph.datasets[0].label;

        city = city
          .toLowerCase()
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");

        return (
          <div>
            <h3 style={{ fontWeight: "200" }}>{city}</h3>
            <BarChart data={graph} width="600" height="250" /> <br />
          </div>
        );
      });
    }

    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />
        <div className="container text-center">
          <h1 style={{ fontWeight: "200" }}>Statistical Analysis</h1>
          <h2 style={{ fontWeight: "200" }}>Graphs</h2>
          <br />
          <br />
          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Top 10 Jobs Per Month</h5>
                  <div className="row">
                    <div className="col-8">
                      {this.state.topten === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        <LineChart
                          data={this.state.topten}
                          width="600"
                          height="250"
                        />
                      )}
                    </div>
                    <div className="col-4">
                      <br />
                      <br />
                      <h5> Select Month</h5>
                      <select
                        onChange={this.TopTenMonthChangeHandler}
                        className="form-control"
                      >
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Clicks per Job</h5>
                  <div className="row">
                    <div className="col-12">
                      {this.state.clicksPerJob === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        <BarChart
                          data={this.state.clicksPerJob}
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

          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Unpopular Jobs</h5>
                  <div className="row">
                    <div className="col-8">
                      {this.state.unpopularJobs === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        <BarChart
                          data={this.state.unpopularJobs}
                          width="600"
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

          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">City Wise Jobs per Month</h5>
                  <div className="row">
                    <div className="col-8">
                      {this.state.cityWise === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        <LineChart
                          data={this.state.cityWise}
                          width="600"
                          height="250"
                        />
                      )}
                    </div>
                    <div className="col-4">
                      <br />
                      <br />
                      <h5> Select Job Title</h5>
                      <select
                        onChange={this.CityWiseJobChangeHandler}
                        className="form-control"
                      >
                        {cities}
                      </select>
                      <br />
                      <h5> Select Month</h5>
                      <select
                        onChange={this.CityWiseMonthChangeHandler}
                        className="form-control"
                      >
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Job Logs</h5>
                  <div className="row">
                    <div className="col-8">
                      {this.state.lographs === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        lographs
                      )}
                    </div>
                    <div className="col-4">
                      <br />

                      <h5> Select Job Title</h5>
                      <select
                        onChange={this.jobIDChangeListener}
                        className="form-control"
                      >
                        {cities}
                      </select>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Saved Jobs</h5>
                  <div className="row">
                    <div className="col-8">
                      {this.state.savedJobs === null ? (
                        <h3>Not Enough Data</h3>
                      ) : (
                        <BarChart
                          data={this.state.savedJobs}
                          width="600"
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

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(RecruiterGraphs));
