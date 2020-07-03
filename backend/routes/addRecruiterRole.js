const express = require("express");
const kafka = require("./../kafka/client");
const {
  ADD_RECRUITER_ROLE_REQUEST,
  ADD_RECRUITER_ROLE_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("./../config");

/**
 *  this script will be called for routes begin with /signup_applicant
 */
router.post("/", (req, res) => {
  console.log("Inside Applicant Sign Up Route req:", req.body);
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
      ADD_RECRUITER_ROLE_REQUEST,
      ADD_RECRUITER_ROLE_RESPONSE,
      req.body,
      function (err, result) {
        if (err) {
          // called in case of time out error, or if we failed to send data over kafka
          sendInternalServerError(res);
        } else {
          if (result.code === 200) {
            var token = jwt.sign(result.data, config.secret, {
              expiresIn: 10080, // in seconds
            });
            result.data.token = "JWT " + token;
          }
          responseHandler(res, result);
        }
      }
    );
  }
});

/**
 * returns false if there is no validation error, otherwise returns array of error messages.
 */
function validateInput(req) {
  req.checkBody("email", "An Email address is required.").notEmpty();
  return req.validationErrors();
}

module.exports = router;
