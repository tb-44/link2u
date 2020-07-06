var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb://nrupa16:16Jan91*@ds159263.mlab.com:59263/linkedin_project",
    { useNewUrlParser: true, poolSize: 10 }
  )
  .then(
    () => {
      console.log("Getting MongoDB Connection!!!");
    },
    (err) => {
      console.log("Connection Failed!. Error: ${err}");
    }
  );

module.exports = {
  mongoose,
};
