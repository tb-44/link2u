var db = require("./../config/mysql");
var bcrypt = require("bcrypt");
const {
  prepareInternalServerError,
  prepareSuccess,
  prepareAuthenticationFailure,
} = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka sign in Recuiter backend");
  console.log("In handle request:" + JSON.stringify(msg));

  var email = msg.email;
  let resp = {};
  try {
    let result = await db.selectQuery(
      "SELECT * FROM user_profile WHERE role = ? AND email= ?",
      ["A", email]
    );
    let match = false;
    let user = {};
    if (result && result.length !== 0) {
      user = result[0];
      match = await bcrypt.compare(msg.password, user.password);
    }
    if (match) {
      resp = prepareSuccess({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      resp = prepareAuthenticationFailure({
        result: "Invalid username or password",
      });
    }
  } catch (e) {
    console.log("Error: ", e);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
