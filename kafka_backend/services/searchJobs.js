const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { Jobs } = require("./../models/job");

async function handle_request(req, callback) {
  let resp = {};
  let offset = req.start ? parseInt(req.start) : 0;
  let length = req.length ? parseInt(req.length) : 100;
  try {
    let jobs = await Jobs.find(prepareQuery(req)).skip(offset).limit(length);
    resp = prepareSuccess({ jobs });
  } catch (error) {
    console.log(error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

function prepareQuery(request) {
  let query = {};
  console.log(request);
  if (request.search) {
    query.title = { $regex: request.search, $options: "i" };
  }
  if (request.company) {
    query.company = { $regex: request.company, $options: "i" };
  }
  if (request.location) {
    query.location = { $regex: request.location, $options: "i" };
  }
  if (request.employment_type) {
    query.employment_type = request.employment_type;
  }
  if (request.date_posted) {
    query.posted_date = prepareDateQuery(request.date_posted);
  }
  console.log(query);
  return query;
}

function prepareDateQuery(type) {
  let today = new Date();
  if ((type = "day")) {
    let yesterday = new Date().setDate(today.getDate() - 1);
    return { $gte: yesterday };
  } else if ((type = "week")) {
    let weekBefore = new Date().setDate(today.getDate() - 7);
    return { $gte: weekBefore };
  } else if ((type = "month")) {
    let monthBefore = new Date().setMonth(today.getMonth() - 1);
    return { $gte: monthBefore };
  } else {
    return {};
  }
}

exports.handle_request = handle_request;
