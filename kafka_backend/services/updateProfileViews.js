var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka Update Profile Views backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.email;
  let curr_date = new Date() - 8 * 60 * 60000;
  let resp = {};
  try {
    await Users.findOneAndUpdate(
      { email: email },
      {
        $push: { profileViews: curr_date },
      }
    );
    resp = prepareSuccess({ result: "Profile Views Updated Sucessfully" });
  } catch (error) {
    console.log("Something went wrong while updating profile views! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
