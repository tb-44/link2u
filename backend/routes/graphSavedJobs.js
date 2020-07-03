const express = require("express");
const kafka = require("./../kafka/client");
const {
  GRAPH_SAVED_JOBS_REQUEST,
  GRAPH_SAVED_JOBS_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Inside graph saved jobs controller");
  console.log("GRAPH SAVED JOBS: ", req.query);
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
      GRAPH_SAVED_JOBS_REQUEST,
      GRAPH_SAVED_JOBS_RESPONSE,
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
