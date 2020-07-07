var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { redisClient } = require("./../config/redisClient");

async function handle_request(msg, callback) {
  console.log("Inside kafka get Applicant profile backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let resp = {};
  try {
    let profile = null;
    let redisKey = "applicantProfile_" + msg.email;
    redisClient.get(redisKey, async function (err, profile) {
      if (!err && profile != null) {
        console.log("Get applicant profile : profile found in cache");
        profile = JSON.parse(profile);
      } else {
        console.log("Get applicant profile : inserting profile into cache");
        profile = await Users.findOne({ email: msg.email });
        if (profile) {
          redisClient.set(redisKey, JSON.stringify(profile), function (
            error,
            reply
          ) {
            if (error) {
              console.log(error);
            }
            console.log(reply);
          });
          //cache will expire in 30 secs
          redisClient.expire(redisKey, 30);
        }
      }
      resp = prepareSuccess({ profile: profile });
      callback(null, resp);
    });
  } catch (error) {
    console.log("Something went wrong while inserting profile! : ", error);
    resp = prepareInternalServerError();
    callback(null, resp);
  }
}

module.exports = {
  handle_request: handle_request,
};
