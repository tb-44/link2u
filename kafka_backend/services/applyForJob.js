var { Jobs } = require("../models/job");
var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  //console.log("Inside kafka apply for job backend");

  let resp = {};
  try {
    var sponsorship_que;
    if (
      msg.body.sponsorshipQuestion &&
      msg.body.sponsorshipQuestion == "True"
    ) {
      sponsorship_que = true;
    } else if (
      msg.body.sponsorshipQuestion &&
      msg.body.sponsorshipQuestion == "False"
    ) {
      sponsorship_que = false;
    }

    var disability_que;
    if (msg.body.disabilityQuestion && msg.body.disabilityQuestion == "True") {
      disability_que = true;
    } else if (
      msg.body.disabilityQuestion &&
      msg.body.disabilityQuestion == "False"
    ) {
      disability_que = false;
    }

    var application = {
      applicant_email: msg.body.applicantEmail,
      date: new Date() - 8 * 60 * 60000,
      first_name: msg.body.firstName,
      last_name: msg.body.lastName,
      address: msg.body.address,
      city: msg.body.city.toLowerCase(),
      phone_number: msg.body.phoneNumber,
      how_did_they_hear_about_us: msg.body.howDidTheyHearAboutUs,
      diversity_question: msg.body.disabilityQuestion,
      sponsorship_question: sponsorship_que,
      disability_question: disability_que,
      resume: msg.resumeName,
      cover_letter: msg.coverletterName,
    };
    await Jobs.updateOne(
      { _id: msg.body.jobID },
      {
        $push: { applications: application },
      }
    );

    await Users.updateOne(
      { email: msg.body.applicantEmail },
      {
        $push: { jobsAppliedTo: msg.body.jobID },
      }
    );

    await Users.updateOne(
      { email: msg.body.applicantEmail },
      {
        $pull: { savedJobs: msg.body.jobID },
      }
    );
    resp = prepareSuccess({ result: "Applied to job successfully!" });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
