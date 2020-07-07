var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka get graph for clicks per job backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.recruiterEmail;
  let resp = {};
  try {
    let data = await Jobs.find(
      { posted_by: email },
      { title: 1, no_of_views: 1 }
    );
    labels = [];
    values = [];
    for (var i = 0; i < data.length; i++) {
      labels.push(data[i].title);
      if (data[i].no_of_views == undefined) {
        values.push(0);
      } else {
        values.push(data[i].no_of_views);
      }
    }
    console.log("Final Data - ", values);
    resp = prepareSuccess({ labels: labels, values: values });
  } catch (error) {
    console.log("Something went wrong while acquiring data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
