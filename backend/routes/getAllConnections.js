const express = require("express");
const kafka = require("./../kafka/client");
const {
  GET_ALL_CONNECTION_REQUEST,
  GET_ALL_CONNECTION_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const jwtDecode = require("jwt-decode");
const router = express.Router();

router.get("/", (req, res) => {
  const jwtDecoded = jwtDecode(
    req.headers.authorization.substring(4, req.headers.authorization.length)
  );
  req.body.username = jwtDecoded.email;
  let errors = validateInputForViewMessages(req);
  if (errors) {
    let msg = errors
      .map((error) => error.msg)
      .reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
    sendBadRequest(res, {
      detail: msg,
    });
  } else {
    kafka.make_request(
      GET_ALL_CONNECTION_REQUEST,
      GET_ALL_CONNECTION_RESPONSE,
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

function validateInputForViewMessages(req) {
  req.checkBody("username", "username is required").notEmpty();
  return req.validationErrors();
}

module.exports = router;
