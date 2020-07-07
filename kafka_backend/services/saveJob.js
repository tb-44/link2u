var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka save job backend");

  let resp = {};
  try {
    await Users.updateOne(
      { email: msg.applicantEmail },
      {
        $push: { savedJobs: msg.jobID },
      }
    );
    resp = prepareSuccess({ result: "Job Saved!" });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
