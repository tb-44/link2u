var { Users } = require("../models/user");
const db = require("../config/mysql");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("Inside kafka delete user profile backend");

  let resp = {};
  try {
    await Users.remove({ email: msg.email });

    await db.deleteQuery("DELETE FROM user_profile WHERE email = ?", [
      msg.email,
    ]);
    resp = prepareSuccess({ result: "Profile deleted Successfully!" });
  } catch (err) {
    console.log("Error: ", err);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
