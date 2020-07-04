"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var db = require("./../config/mysql");
var config = require("./../config");

const redis = require("redis");
let client = redis.createClient();
client.on("connect", function (err) {
  if (err) {
    console.log("Error occured while connecting to redis server");
  } else {
    console.log("passport connected to Redis...");
  }
});

module.exports = function (passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret,
  };
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, callback) {
      try {
        let result = null;
        let redisKey = "passport_" + jwt_payload.email;
        client.get(redisKey, async function (err, result) {
          if (!err && result != null) {
            console.log("passport : user found in cache");
            result = JSON.parse(result);
          } else {
            console.log("passport : inserting user into cache");
            result = await db.selectQuery(
              "SELECT * FROM user_profile WHERE email= ?",
              [jwt_payload.email]
            );
            if (result && result.length !== 0) {
              client.set(redisKey, JSON.stringify(result), function (
                error,
                reply
              ) {
                if (error) {
                  console.log(error);
                }
                console.log(reply);
              });
              client.expire(redisKey, 60);
            }
          }
          if (result && result.length !== 0) {
            console.log("user is authenticated successfully");
            return callback(null, result);
          } else {
            console.log("The username or password you entered is incorrect.");
            return callback(null, false);
          }
        });
      } catch (error) {
        console.log("Error occured in passport: ", error);
        callback(err, false);
      }
    })
  );
};
