var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { redisClient } = require("./../config/redisClient");

async function handle_request(msg, callback) {
  console.log("Inside kafka post Applicant profile Photo backend");
  console.log("In handle request:" + JSON.stringify(msg));

  console.log(msg);
  let resp = {};

  try {
    let profile = await Users.findOneAndUpdate(
      { email: msg.email },
      {
        $set: {
          profilePicture: msg.profilePicture,
        },
      },
      { new: true }
    );
    console.log(profile);
    resp = prepareSuccess({ profile: profile });
    redisClient.del("applicantProfile_" + msg.email);
  } catch (error) {
    console.log("Something went wrong while updating profile photo! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
