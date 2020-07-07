var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka get jobs by recruiter backend");

  let resp = {};
  try {
    var recruiter_email = msg.recruiterEmail;
    let job_list = await Jobs.find(
      { posted_by: recruiter_email },
      {
        title: 1,
        company: 1,
        job_description: 1,
        industry: 1,
        employment_type: 1,
        location: 1,
        job_function: 1,
        company_logo: 1,
        posted_date: 1,
        expiry_date: 1,
      }
    );
    resp = prepareSuccess({ allJobs: job_list });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
