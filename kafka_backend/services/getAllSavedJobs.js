var { Users } = require("../models/user");
var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka get all saved jobs backend");

  let resp = {};
  try {
    var applicant_email = msg.applicantEmail;
    let job_list = await Users.find(
      { email: applicant_email },
      {
        savedJobs: 1,
        _id: 0,
      }
    );
    console.log("HERE - ", job_list[0].savedJobs);
    var job_array = job_list[0].savedJobs;
    var allJobs = [];
    for (var i = 0; i < job_array.length; i++) {
      let curr_job = await Jobs.find(
        { _id: job_array[i] },
        {
          company_logo: 1,
          company: 1,
          title: 1,
          location: 1,
          expiry_date: 1,
          application_method: 1,
        }
      );
      if (curr_job != null && curr_job.length != 0) {
        allJobs.push(curr_job[0]);
      }
    }
    resp = prepareSuccess({ allSavedJobs: allJobs });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
