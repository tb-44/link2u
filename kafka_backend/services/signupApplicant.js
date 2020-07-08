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
  console.log("Inside kafka sign up applicant backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let resp = {};
  try {
    let hash = await bcrypt.hash(msg.password, saltRounds);
    let post = {
      firstName: msg.firstname,
      lastName: msg.lastname,
      email: msg.email,
      password: hash,
      role: "A",
    };
    await db.insertQuery("INSERT INTO user_profile SET ?", post);
    var user = new Users({
      firstName: msg.firstname,
      lastName: msg.lastname,
      state: msg.state,
      city: msg.city,
      zipcode: msg.zipcode,
      role: "A",
      experience: [
        {
          title: msg.title,
          company: msg.company,
          location: msg.location,
          fromMonth: msg.fromMonth,
          fromYear: msg.fromYear,
        },
      ],
      education: [
        {
          school: msg.school,
          degree: msg.degree,
          schoolfromYear: msg.schoolfromYear,
          schooltoYear: msg.schooltoYear,
        },
      ],
      email: msg.email,
    });
    console.log("user:", user);
    await user.save();
    resp = prepareSuccess({
      result: "Applicant Profile created Sucessfully",
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    if (error.errno === 1062) {
      //1062 is for primary key violation
      console.log("Error: Email address already in use!");
      resp = prepareResourceConflictFailure({
        message: "Email address is already in use.",
      });
    } else {
      console.log("Something went wrong during Applicant signup! : ", error);
      //don't let time out occur, send internal server error
      resp = prepareInternalServerError();
    }
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
