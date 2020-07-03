const express = require("express");
const kafka = require("./../kafka/client");
const {
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Inside get Graph for Unpopular 5 Job Postings controller");
  console.log("GETGRAPHPFORUNPOPULARJOBPOSTINGS: ", req.query);
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
      GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
      GRAPHS_UNPOPULAR_JOB_POSTINGS_RESPONSE,
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
