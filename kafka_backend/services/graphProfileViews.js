var { Users } = require("../models/user");
const { prepareInternalServerError, prepareSuccess } = require("./responses");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

async function handle_request(msg, callback) {
  console.log("Inside kafka get graph for profile views backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let email = msg.email;
  let limit_date = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000 - 8 * 60 * 60000
  );
  console.log("Date:", limit_date);
  let curr_date = new Date(new Date().getTime() - 8 * 60 * 60000);
  console.log("Today's date:", curr_date);
  const range = moment.range(limit_date, curr_date);

  let resp = {};
  try {
    let data = await Users.find(
      { email: email },
      {
        profileViews: 1,
        _id: 0,
      }
    );
    var view_dict = {};
    if (data && data[0]) {
      var data_list = data[0].profileViews;
      for (var i = 0; i < data_list.length; i++) {
        if (range.contains(data_list[i])) {
          let key = data_list[i].getMonth() + 1 + "/" + data_list[i].getDate();
          if (key in view_dict) {
            view_dict[key] += 1;
          } else {
            view_dict[key] = 1;
          }
        }
      }
    }
    let values = [];
    let labels = [];
    let limit = new Date(new Date() - 8 * 60 * 60000 + 1 * 24 * 60 * 60000);
    for (var d = limit_date; d <= limit; d.setDate(d.getDate() + 1)) {
      let k = new Date(d).getMonth() + 1 + "/" + new Date(d).getDate();
      if (k in view_dict) {
        labels.push(k);
        values.push(view_dict[k]);
      } else {
        labels.push(k);
        values.push(0);
      }
    }

    resp = prepareSuccess({ labels: labels, values: values });
  } catch (error) {
    console.log("Something went wrong while getting data! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
