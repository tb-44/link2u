const express = require("express");
const kafka = require("../kafka/client");
const {
  SIGNIN_RECRUITER_REQUEST_TOPIC,
  SIGNIN_RECRUITER_RESPONSE_TOPIC,
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
  console.log("Inside sign in Recruiter controller");
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
      SIGNIN_RECRUITER_REQUEST_TOPIC,
      SIGNIN_RECRUITER_RESPONSE_TOPIC,
      req.body,
      function (err, result) {
        if (err) {
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
