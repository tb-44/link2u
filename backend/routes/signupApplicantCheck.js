const express = require("express");
const kafka = require("./../kafka/client");
const {
  SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC,
  SIGNUP_APPLICANT_CHECK_RESPONSE_TOPIC,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("./../config");

router.post("/", (req, res) => {
  console.log("Inside Applicant Sign Up Check Route req:", req.body);
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
      SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC,
      SIGNUP_APPLICANT_CHECK_RESPONSE_TOPIC,
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
  req.checkBody("email", "An Email address is required.").notEmpty();

  return req.validationErrors();
}

module.exports = router;
