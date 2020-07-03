const express = require("express");
const kafka = require("../kafka/client");
const {
  SIGNIN_APPLICANT_REQUEST_TOPIC,
  SIGNIN_APPLICANT_RESPONSE_TOPIC,
} = require("../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("../config");

router.post("/", (req, res) => {
  console.log("Inside sign in applicant controller");
  console.log("SIGNIN: ", req.body);
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
      SIGNIN_APPLICANT_REQUEST_TOPIC,
      SIGNIN_APPLICANT_RESPONSE_TOPIC,
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

function validateInput(req) {
  req.checkBody("email", "An Email address is required.").notEmpty();
  req.checkBody("password", "A Password is required.").notEmpty();
  return req.validationErrors();
}

module.exports = router;
