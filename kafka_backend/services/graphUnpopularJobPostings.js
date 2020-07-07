var { Jobs } = require("../models/job");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka get graph for unpopular 5 job postings backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.recruiterEmail;
  let resp = {};
  try {
    let data = await Jobs.aggregate([
      { $match: { posted_by: email } },
      {
        $project: {
          title: 1,
          count: { $size: "$applications" },
        },
      },
      { $sort: { count: 1 } },
    ]);
    let label = [];
    let colors = ["#FF8000", "#F7464A", "#46BFBD", "#FDB45C", "#FEDCBA"];
    let values = [];
    let num = 1;
    for (var i = 0; i < data.length; i++) {
      if (num <= 5) {
        label.push(data[i].title);
        values.push(data[i].count);
        num = num + 1;
      }
    }
    resp = prepareSuccess({ label: label, colors: colors, values: values });
  } catch (error) {
    console.log("Something went wrong while acquiring data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
