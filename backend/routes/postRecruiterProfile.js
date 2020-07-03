const express = require("express");
const kafka = require("./../kafka/client");
const {
  POST_RECRUITER_PROFILE_REQUEST,
  POST_RECRUITER_PROFILE_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Inside post Recruiter Profile controller");
  console.log("POSTRECRUITERPROFILE: ", req.body);
  let errors = validateInput(req);
  if (errors) {
    let msg = errors
      .map((error) => error.msg)
      .reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
    sendBadRequest(res, {
      detail: msg,
    });
  } else {
    kafka.make_request(
      POST_RECRUITER_PROFILE_REQUEST,
      POST_RECRUITER_PROFILE_RESPONSE,
      req.body,
      function (err, result) {
        if (err) {
          sendInternalServerError(res);
        } else {
          responseHandler(res, result);
        }
      }
    );
  }
});

function validateInput(req) {
  req.checkBody("companyName", "A Company name is required.").notEmpty();
  req.checkBody("phoneNumber", "A Phone Number is required.").notEmpty();

  return req.validationErrors();
}

module.exports = router;
