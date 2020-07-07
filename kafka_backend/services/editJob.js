var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka edit job backend");

  let resp = {};
  try {
    let _id = msg.jobID;
    let title = msg.title;
    let job_description = msg.jobDescription;
    let industry = msg.industry;
    let employment_type = msg.employmentType;
    let location = msg.location;
    let job_function = msg.jobFunction;
    let company_logo = msg.companyLogo;
    let posted_date = msg.postedDate;
    let expiry_date = msg.expiryDate;
    let application_method = msg.applicationMethod;

    let job = await Jobs.updateOne(
      { _id: _id },
      {
        $set: {
          title: title,
          job_description: job_description,
          industry: industry,
          employment_type: employment_type,
          location: location,
          job_function: job_function,
          company_logo: company_logo,
          posted_date: posted_date,
          expiry_date: expiry_date,
          application_method: application_method,
        },
      }
    );
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
