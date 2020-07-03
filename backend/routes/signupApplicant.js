const express = require("express");
const kafka = require("./../kafka/client");
const {
  SIGNUP_APPLICANT_REQUEST_TOPIC,
  SIGNUP_APPLICANT_RESPONSE_TOPIC,
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
      SIGNUP_APPLICANT_REQUEST_TOPIC,
      SIGNUP_APPLICANT_RESPONSE_TOPIC,
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
  //req.checkBody("password", "Your Password must contain at least 1 number and 1 letter. \n Your Password must be between 7 and 32 characters.").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{7,32}$/);
  req.checkBody("firstname", "First name is required").notEmpty();
  req.checkBody("lastname", "Last name is required").notEmpty();

  return req.validationErrors();
}

module.exports = router;
