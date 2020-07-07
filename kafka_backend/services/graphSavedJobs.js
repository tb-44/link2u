var { Jobs } = require("../models/job");
var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka get graph for saved jobs backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.email;
  let resp = {};
  try {
    let job_list = await Jobs.find(
      { posted_by: email },
      {
        _id: 1,
      }
    );
    console.log("Job List ", job_list);
    let data = {};
    for (var i = 0; i < job_list.length; i++) {
      let curr_job_id = job_list[i]._id;
      let saved_job_list = await Users.find(
        { role: "A" },
        {
          savedJobs: {
            $elemMatch: { $eq: curr_job_id },
          },
          _id: 0,
        }
      );
      // console.log("Here - ", saved_job_list)
      for (var j = 0; j < saved_job_list.length; j++) {
        // console.log("Outer- ", saved_job_list[j])
        if (
          saved_job_list[j].savedJobs ||
          saved_job_list[j].savedJobs.length > 0
        ) {
          console.log("Here - ", saved_job_list[j].savedJobs);
          if (saved_job_list[j].savedJobs[0] !== undefined) {
            data[saved_job_list[j].savedJobs[0]] = true;
          }
        }
      }
    }

    resp = prepareSuccess({ data: data });
  } catch (error) {
    console.log("Something went wrong while getting data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
