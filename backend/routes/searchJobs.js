const express = require("express");
const kafka = require("./../kafka/client");
const {
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const jwtDecode = require("jwt-decode");
const router = express.Router();

router.get("/", (req, res) => {
  let errors = validateInputForSearchJobs(req);
  if (errors) {
    let msg = errors
      .map((error) => error.msg)
      .reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
    sendBadRequest(res, {
      detail: msg,
    });
  } else {
    kafka.make_request(
      SEARCH_JOBS_REQUEST,
      SEARCH_JOBS_RESPONSE,
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

function validateInputForSearchJobs(req) {
  return req.validationErrors();
}

module.exports = router;
