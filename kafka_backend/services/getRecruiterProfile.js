var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka get Recruiter profile backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.email;
  let resp = {};
  try {
    let profile = await Users.findOne({
      email: email,
    });
    resp = prepareSuccess({ profile: profile });
  } catch (error) {
    console.log("Something went wrong while inserting profile! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
