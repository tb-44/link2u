const express = require("express");
const kafka = require("./../kafka/client");
const {
  UPDATE_PROFILE_VIEWS_REQUEST,
  UPDATE_PROFILE_VIEWS_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Inside update profile views controller");
  console.log("UPATE PROFILE VIEWS: ", req.body);
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
      UPDATE_PROFILE_VIEWS_REQUEST,
      UPDATE_PROFILE_VIEWS_RESPONSE,
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
  return req.validationErrors();
}

module.exports = router;
