const redis = require("redis");
let redisClient = redis.createClient();
redisClient.on("connect", function (err) {
  if (err) {
    console.log("Error occured while connecting to redis server");
  } else {
    console.log("connected to Redis...");
  }
});

module.exports = {
  redisClient,
};
