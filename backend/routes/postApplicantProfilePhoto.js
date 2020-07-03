const express = require("express");
const kafka = require("./../kafka/client");
const {
  POST_APPLICANT_PROFILE_PHOTO_REQUEST,
  POST_APPLICANT_PROFILE_PHOTO_RESPONSE,
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
    callback(null, "./profilepictures");
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
  var filename;
  req.files.map((file) => {
    filename = file.filename;
  });
  console.log(filename);

  console.log("Inside post applicant Profile Picture controller");
  console.log("POST APPLICANT PROFILE PICTURE: ", req.body);
  const data = {
    email: req.body.email,
    profilePicture: filename,
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
      POST_APPLICANT_PROFILE_PHOTO_REQUEST,
      POST_APPLICANT_PROFILE_PHOTO_RESPONSE,
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
