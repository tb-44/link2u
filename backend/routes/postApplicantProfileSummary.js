const express = require("express");
const kafka = require("./../kafka/client");
const {
  POST_APPLICANT_PROFILE_SUMMARY_REQUEST,
  POST_APPLICANT_PROFILE_SUMMARY_RESPONSE,
} = require("./../kafka/topics");
const {
  responseHandler,
  sendInternalServerError,
  sendBadRequest,
} = require("./response");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./resumes_and_coverletter");
  },
  filename: (req, file, callback) => {
    fileExtension = file.originalname.split(".")[1];
    callback(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + "." + fileExtension
    );
  },
});
var upload = multer({ storage: storage });

router.post("/", upload.any(), function (req, res) {
  console.log("Inside post applicant Profile Summary controller");
  console.log("POST APPLICANT PROFILE SUMMARY: ", req.body, req.files);

  var filename;
  req.files.map((file) => {
    filename = file.filename;
  });
  console.log(filename);

  const data = {
    body: req.body,
    resumeName: filename,
  };

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
      POST_APPLICANT_PROFILE_SUMMARY_REQUEST,
      POST_APPLICANT_PROFILE_SUMMARY_RESPONSE,
      data,
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
