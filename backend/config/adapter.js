var graphClicksPerJobServce = require("./../../kafka_backend/services/graphClicksPerJob");
var garphTopJobPostings = require("./../../kafka_backend/services/graphTopJobPostings");
let graphUnpopularJobPostings = require("./../../kafka_backend/services/graphUnpopularJobPostings");
let graphCitywiseApplications = require("./../../kafka_backend/services/graphCitywiseApplication");
let graphLogEvent = require("./../../kafka_backend/services/graphLogEvent");
let graphProfileViews = require("./../../kafka_backend/services/graphProfileViews");
let graphSavedJobs = require("./../../kafka_backend/services/graphSavedJobs");

const {
  GRAPHS_CLICK_PER_JOB_REQUEST,
  GRAPHS_TOP_JOB_POSTINGS_REQUEST,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  GRAPHS_CITYWISE_APPLICATION_REQUEST,
  GRAPHS_LOG_EVENT_REQUEST,
  GRAPH_PROFILE_VIEWS_REQUEST,
  GRAPH_SAVED_JOBS_REQUEST,
} = require("./../kafka/topics");
var { mongoose } = new require("./../../kafka_backend//config/mongoose");
const topicToServiceMap = {
  [GRAPHS_CLICK_PER_JOB_REQUEST]: graphClicksPerJobServce,
  [GRAPHS_TOP_JOB_POSTINGS_REQUEST]: garphTopJobPostings,
  [GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST]: graphUnpopularJobPostings,
  [GRAPHS_CITYWISE_APPLICATION_REQUEST]: graphCitywiseApplications,
  [GRAPHS_LOG_EVENT_REQUEST]: graphLogEvent,
  [GRAPH_PROFILE_VIEWS_REQUEST]: graphProfileViews,
  [GRAPH_SAVED_JOBS_REQUEST]: graphSavedJobs,
};

function byPassKafka(topic, msg_payload, callback) {
  topicToServiceMap[topic].handle_request(msg_payload, callback);
}

module.exports = {
  byPassKafka,
};
