var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka Update Job Views backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let _id = msg.jobID;

  let resp = {};
  try {
    await Jobs.findOneAndUpdate(
      { _id: _id },
      {
        $inc: {
          no_of_views: 1,
        },
      }
    );
    resp = prepareSuccess({ result: "Job Views Updated Sucessfully" });
  } catch (error) {
    console.log("Something went wrong while updating job views! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
