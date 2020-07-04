var rpc = require("./kafkarpc");
const rpcConnections = {};
const { byPassKafka } = require("./../config/adapter");
const {
  GRAPHS_CLICK_PER_JOB_REQUEST,
  GRAPHS_TOP_JOB_POSTINGS_REQUEST,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  GRAPHS_CITYWISE_APPLICATION_REQUEST,
  GRAPHS_LOG_EVENT_REQUEST,
  GRAPH_PROFILE_VIEWS_REQUEST,
} = require("./topics");
const bypassArr = [
  GRAPHS_CLICK_PER_JOB_REQUEST,
  GRAPHS_TOP_JOB_POSTINGS_REQUEST,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  GRAPHS_CITYWISE_APPLICATION_REQUEST,
  GRAPHS_LOG_EVENT_REQUEST,
  GRAPH_PROFILE_VIEWS_REQUEST,
];

function make_request(req_queue_name, resp_queue_name, msg_payload, callback) {
  if (bypassArr.includes(req_queue_name)) {
    byPassKafka(req_queue_name, msg_payload, callback);
  } else {
    if (rpcConnections[req_queue_name + "_" + resp_queue_name] === undefined) {
      rpcConnections[req_queue_name + "_" + resp_queue_name] = new rpc();
    }
    console.log("in make request");
    console.log(msg_payload);
    rpcConnections[req_queue_name + "_" + resp_queue_name].makeRequest(
      req_queue_name,
      resp_queue_name,
      msg_payload,
      function (err, response) {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          console.log("response", response);
          callback(null, response);
        }
      }
    );
  }
}

exports.make_request = make_request;
