var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka post job backend");

  let resp = {};
  try {
    var jobs = new Jobs({
      posted_by: msg.recruiterEmail,
      title: msg.title,
      company: msg.company,
      job_description: msg.jobDescription,
      industry: msg.industry,
      employment_type: msg.employmentType,
      location: msg.location,
      job_function: msg.jobFunction,
      company_logo: msg.companyLogo,
      posted_date: msg.postedDate,
      expiry_date: msg.expiryDate,
      application_method: msg.applicationMethod,
    });
    let job = await jobs.save();
    resp = prepareSuccess({ jobID: job._id });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
