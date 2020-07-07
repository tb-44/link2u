var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka get graph for city wise jobs per month backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let _id = msg.jobID;
  let req_month = parseInt(msg.month);
  let resp = {};
  try {
    let data = await Jobs.find({ _id: _id }, { title: 1, applications: 1 });
    let jobs_dict = {};
    for (var i = 0; i < data[0].applications.length; i++) {
      let curr_application = JSON.parse(
        JSON.stringify(data[0].applications[i])
      );
      console.log("Current Application - ", curr_application);
      if (
        curr_application &&
        curr_application.date &&
        new Date(curr_application.date).getMonth() + 1 == req_month
      ) {
        if (curr_application.city in jobs_dict) {
          jobs_dict[curr_application.city] += 1;
        } else {
          jobs_dict[curr_application.city] = 1;
        }
      }
    }
    console.log("Final Data - ", jobs_dict);

    let lables = [];
    let values = [];
    let key_list = Object.keys(jobs_dict);
    for (var i = 0; i < key_list.length; i++) {
      lables.push(key_list[i]);
      values.push(jobs_dict[key_list[i]]);
    }

    resp = prepareSuccess({ lables: lables, values: values });
  } catch (error) {
    console.log("Something went wrong while acquiring data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
