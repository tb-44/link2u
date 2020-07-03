const express = require("express");
const kafka = require("./../kafka/client");
const {
  GET_ALL_APPLICATIONS_REQUEST,
  GET_ALL_APPLICATIONS_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Inside get All Applications For A Job controller");
  console.log("GET ALL APPLICATIONS FOR A JOB: ", req.query);
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
      GET_ALL_APPLICATIONS_REQUEST,
      GET_ALL_APPLICATIONS_RESPONSE,
      req.query,
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
  return req.validationErrors();
}

module.exports = router;
