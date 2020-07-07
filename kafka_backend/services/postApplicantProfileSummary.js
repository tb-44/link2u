var { Users } = require("../models/user");
const db = require("../config/mysql");
const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { redisClient } = require("./../config/redisClient");

async function handle_request(msg, callback) {
  console.log("Inside kafka post Applicant profile Summary backend");
  console.log("In handle request:" + JSON.stringify(msg));

  console.log(msg);
  let resp = {};

  try {
    let profile = await Users.findOneAndUpdate(
      { email: msg.body.email },
      {
        $set: {
          firstName: msg.body.firstName,
          lastName: msg.body.lastName,
          state: msg.body.state,
          zipcode: msg.body.zipcode,
          address: msg.body.address,
          profileSummary: msg.body.profileSummary,
          phoneNumber: msg.body.phoneNumber,
          resume: msg.resumeName,
        },
      },
      { new: true }
    );
    await db.updateQuery(
      "UPDATE user_profile SET firstName = ?, lastName = ? where email = ?",
      [msg.body.firstName, msg.body.lastName, msg.body.email]
    );
    console.log(profile);
    resp = prepareSuccess({ profile: profile });
    redisClient.del("applicantProfile_" + msg.body.email);
  } catch (error) {
    console.log("Something went wrong while inserting profile! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
