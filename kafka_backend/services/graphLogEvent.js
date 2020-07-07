const db = require("../config/mysql");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka get graph for log events backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.recruiterEmail;
  let job_id = msg.jobID;
  let resp = {};
  try {
    let data = await db.selectQuery(
      "SELECT job_id, job_title, city, recruiter_email, event_name, COUNT(applicant_email) AS count FROM (select job_id, job_title, city, recruiter_email, event_name, applicant_email from logging where recruiter_email = ? and job_id = ?) as t GROUP BY event_name, city",
      [email, job_id]
    );
    resp = prepareSuccess({ data: data });
  } catch (error) {
    console.log("Something went wrong while getting data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
