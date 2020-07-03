const express = require("express");
const kafka = require("./../kafka/client");
const { POST_JOB_REQUEST, POST_JOB_RESPONSE } = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Inside Post Job controller");
  console.log("POSTJOB: ", req.body);
  let errors = validateInput(req);
  if (errors) {
    let msg = errors
      .map((error) => error.msg)
      .reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
    sendBadRequest(res, {
      detail: msg,
    });
  } else {
    kafka.make_request(POST_JOB_REQUEST, POST_JOB_RESPONSE, req.body, function (
      err,
      result
    ) {
      if (err) {
        sendInternalServerError(res);
      } else {
        responseHandler(res, result);
      }
    });
  }
});

function validateInput(req) {
  req.checkBody("title", "Job Title is required.").notEmpty();
  req.checkBody("jobDescription", "Job Description is required.").notEmpty();
  req.checkBody("employmentType", "Employment Type is required.").notEmpty();
  req.checkBody("location", "Job location is required.").notEmpty();
  req.checkBody("expiryDate", "Job expiry date is required.").notEmpty();

  return req.validationErrors();
}

module.exports = router;
