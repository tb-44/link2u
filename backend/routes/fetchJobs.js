const express = require("express");
const kafka = require("../kafka/client");
const { FETCH_JOBS_REQUEST, FETCH_JOBS_RESPONSE } = require("../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();
const config = require("../config");

router.post("/", (req, res) => {
  console.log("Inside Fetch Jobs Route Request", req.body);
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
      FETCH_JOBS_REQUEST,
      FETCH_JOBS_RESPONSE,
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
