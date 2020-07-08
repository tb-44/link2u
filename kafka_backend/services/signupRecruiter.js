const db = require("./../config/mysql");
var { Users } = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  prepareInternalServerError,
  prepareSuccess,
  prepareResourceConflictFailure,
} = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka sign up Recruiter backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let resp = {};
  try {
    let hash = await bcrypt.hash(msg.password, saltRounds);
    let post = {
      firstName: msg.firstname,
      lastName: msg.lastname,
      email: msg.email,
      password: hash,
      role: "R",
    };
    await db.insertQuery("INSERT INTO user_profile SET ?", post);
    var user = new Users({
      firstName: msg.firstname,
      lastName: msg.lastname,
      email: msg.email,
      role: "R",
    });
    console.log("applicant:", user);
    await user.save();
    resp = prepareSuccess({
      result: "Recruiter Profile created Sucessfully",
      email: post.email,
      firstName: post.firstName,
      lastName: post.lastName,
      role: "R",
    });
  } catch (error) {
    if (error.errno === 1062) {
      //1062 is for primary key violation
      console.log("Error: Email address already in use!");
      resp = prepareResourceConflictFailure({
        message: "Email address is already in use.",
      });
    } else {
      console.log("Something went wrong during Recruiter signup! : ", error);
      resp = prepareInternalServerError();
    }
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
