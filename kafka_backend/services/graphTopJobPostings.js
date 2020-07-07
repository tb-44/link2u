var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log(
    "Inside kafka get graph for top 10 job postings per month backend"
  );
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.recruiterEmail;
  let req_month = parseInt(msg.month);
  let resp = {};
  try {
    let data = await Jobs.find(
      { posted_by: email },
      { title: 1, applications: 1 }
    );
    total_jobs = [];
    for (var i = 0; i < data.length; i++) {
      let job_list = [];
      let count = 0;
      for (var j = 0; j < data[i].applications.length; j++) {
        let curr_application = JSON.parse(
          JSON.stringify(data[i].applications[j])
        );
        if (
          curr_application &&
          curr_application.date &&
          new Date(curr_application.date).getMonth() + 1 == req_month
        ) {
          count = count + 1;
        }
      }
      job_list.push(data[i]._id);
      job_list.push(data[i].title);
      job_list.push(count);
      total_jobs.push(job_list);
    }

    total_jobs.sort(function (first, second) {
      return second[2] - first[2];
    });
    total_jobs.slice(0, 10);
    let label = [];
    let colors = [
      "#FF8000",
      "#F7464A",
      "#46BFBD",
      "#FDB45C",
      "#FEDCBA",
      "#ABCDEF",
      "#DDDDDD",
      "#ABCABC",
      "#FF4000",
      "#BF00FF",
      "#00FFFF",
      "#FFC0CB",
    ];
    let values = [];
    for (var i = 0; i < total_jobs.length; i++) {
      label.push(total_jobs[i][1]);
      values.push(total_jobs[i][2]);
    }
    resp = prepareSuccess({ colors: colors, values: values, label: label });
  } catch (error) {
    console.log("Something went wrong while acquiring data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
