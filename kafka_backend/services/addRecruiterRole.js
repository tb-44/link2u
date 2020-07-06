const db = require("../config/mysql");
var { Users } = require("../models/user");
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
    await db.updateQuery("UPDATE user_profile SET role = ? where email = ?", [
      "AR",
      email,
    ]);
    var query = { email: msg.email };
    var update = { role: "AR" };
    await Users.findOneAndUpdate(query, update);
    resp = prepareSuccess({ result: "Recruiter Profile added Sucessfully" });
  } catch (error) {
    if (error.errno === 1032) {
      //1032 is for primary key not found
      console.log("Error: Email address not found!");
      resp = prepareResourceConflictFailure({
        message: "Email address not found.",
      });
    } else {
      console.log(
        "Something went wrong during Recruiter Role Addition! : ",
        error
      );
      resp = prepareInternalServerError();
    }
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
