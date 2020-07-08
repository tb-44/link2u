const db = require("./../config/mysql");
const {
  prepareInternalServerError,
  prepareSuccess,
  prepareResourceConflictFailure,
} = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka sign up applicant check backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let resp = {};
  try {
    var email = msg.email;
    await db.selectQuery(
      "SELECT * FROM user_profile WHERE role = ? AND email= ?",
      ["A", email]
    );
    resp = prepareSuccess({ result: "Applicant does not exist" });
  } catch (error) {
    if (error.errno === 1062) {
      //1062 is for primary key violation
      console.log("Error: Email address already in use!");
      resp = prepareResourceConflictFailure({
        message: "Email address is already in use.",
      });
    } else {
      console.log(
        "Something went wrong during Applicant signup Check ! : ",
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
