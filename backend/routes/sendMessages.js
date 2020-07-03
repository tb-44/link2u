const express = require("express");
const kafka = require("./../kafka/client");
const {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const jwtDecode = require("jwt-decode");
const router = express.Router();

router.post("/", (req, res) => {
  const jwtDecoded = jwtDecode(
    req.headers.authorization.substring(4, req.headers.authorization.length)
  );
  req.body.sender = {
    username: jwtDecoded.email,
    firstname: jwtDecoded.firstName,
    lastname: jwtDecoded.lastName,
  };

  let errors = validateInputForAddingMessage(req);
  if (errors) {
    let msg = errors
      .map((error) => error.msg)
      .reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
    sendBadRequest(res, {
      detail: msg,
    });
  } else {
    kafka.make_request(
      SEND_MESSAGE_REQUEST,
      SEND_MESSAGE_RESPONSE,
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

function validateInputForAddingMessage(req) {
  req.checkBody("sender", "sender Object is required").notEmpty();
  req.checkBody("receiver", "receiver Object is required").notEmpty();

  req
    .checkBody("receiver.username", "receiver's firstname is required")
    .notEmpty();
  req.checkBody("sender.username", "sender firstname is required").notEmpty();

  req
    .checkBody("receiver.firstname", "receiver's firstname is required")
    .notEmpty();
  req.checkBody("sender.firstname", "sender firstname is required").notEmpty();

  req
    .checkBody("receiver.lastname", "receiver's lastname is required")
    .notEmpty();
  req.checkBody("sender.lastname", "sender lastname is required").notEmpty();

  return req.validationErrors();
}

module.exports = router;
