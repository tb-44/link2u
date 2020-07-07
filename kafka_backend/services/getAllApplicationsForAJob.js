var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka get all applications for a job backend");

  let resp = {};
  try {
    let _id = msg.jobID;
    let all_applications = await Jobs.find(
      { _id: _id },
      {
        applications: 1,
        _id: 0,
      }
    );

    resp = prepareSuccess({
      allApplications: all_applications[0].applications,
    });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
