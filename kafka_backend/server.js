var connection = new require("./kafka/Connection");
var { mongoose } = new require("./config/mongoose");

// kafka services
var signupRecruiterService = require("./services/signupRecruiter");
var addRecruiterRoleService = require("./services/addRecruiterRole");
var signupApplicantService = require("./services/signupApplicant");
var signupApplicantCheckService = require("./services/signupApplicantCheck");
var signinRecruiterService = require("./services/signinRecruiter");
var signinApplicantService = require("./services/signinApplicant");
var postJobService = require("./services/postJob");
var getJobsByRecruiterService = require("./services/getJobsByRecruiter");
var postRecruiterProfileService = require("./services/postRecruiterProfile");
var getRecruiterProfileService = require("./services/getRecruiterProfile");
var getApplicantProfileService = require("./services/getApplicantProfile");
var postApplicantProfileSummaryService = require("./services/postApplicantProfileSummary");
var postApplicantProfileExperienceService = require("./services/postApplicantProfileExperience");
var postApplicantProfileEducationService = require("./services/postApplicantProfileEducation");
var postApplicantProfileSkillsService = require("./services/postApplicantProfileSkills");
var postApplicantProfilePhotoService = require("./services/postApplicantProfilePhoto");
var editJobService = require("./services/editJob");
var updateJobViewsService = require("./services/updateJobViews");
var graphClicksPerJobServce = require("./services/graphClicksPerJob");
var garphTopJobPostings = require("./services/graphTopJobPostings");
let updateJobClicksServices = require("./services/updateJobClicks");
let graphUnpopularJobPostings = require("./services/graphUnpopularJobPostings");
let graphCitywiseApplications = require("./services/graphCitywiseApplication");
let logEventService = require("./services/logEvent");
let graphLogEvent = require("./services/graphLogEvent");
let sendMessageService = require("./services/sendMessageService");
let getAllMessagesService = require("./services/getAllMessagesService");
let sendConnectionRequestService = require("./services/sendConnectionRequest");
let connectionResponse = require("./services/connectionResponse");
let getAllConnections = require("./services/getAllConnection");
let applyForJobService = require("./services/applyForJob");
let saveJobService = require("./services/saveJob");
let getAllSavedJobsService = require("./services/getAllSavedJobs");
let deleteProfileService = require("./services/deleteProfile");
let searchJobs = require("./services/searchJobs");
let searchPeople = require("./services/searchPeople");
let updateProfileViews = require("./services/updateProfileViews");
let graphProfileViews = require("./services/graphProfileViews");
let getAllApplicationsForAJob = require("./services/getAllApplicationsForAJob");
let graphSavedJobsService = require("./services/graphSavedJobs");

// kafka topics
const {
  SIGNUP_RECRUITER_REQUEST_TOPIC,
  SIGNUP_APPLICANT_REQUEST_TOPIC,
  SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC,
  POST_JOB_REQUEST,
  ADD_RECRUITER_ROLE_REQUEST,
  SIGNIN_RECRUITER_REQUEST_TOPIC,
  SIGNIN_APPLICANT_REQUEST_TOPIC,
  GET_JOBS_BY_RECRUITER_REQUEST,
  POST_RECRUITER_PROFILE_REQUEST,
  GET_RECRUITER_PROFILE_REQUEST,
  GET_APPLICANT_PROFILE_REQUEST,
  POST_APPLICANT_PROFILE_SUMMARY_REQUEST,
  POST_APPLICANT_PROFILE_EXPERIENCE_REQUEST,
  POST_APPLICANT_PROFILE_EDUCATION_REQUEST,
  POST_APPLICANT_PROFILE_SKILLS_REQUEST,
  POST_APPLICANT_PROFILE_PHOTO_REQUEST,
  EDIT_JOB_REQUEST,
  UPDATE_JOB_VIEWS_REQUEST,
  GRAPHS_CLICK_PER_JOB_REQUEST,
  GRAPHS_TOP_JOB_POSTINGS_REQUEST,
  UPDATE_JOB_CLICKS_REQUEST,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  GRAPHS_CITYWISE_APPLICATION_REQUEST,
  LOG_EVENT_REQUEST,
  GRAPHS_LOG_EVENT_REQUEST,
  SEND_MESSAGE_REQUEST,
  GET_ALL_MESSAGES_REQUEST,
  SEND_CONNECTION_REQUEST,
  GET_ALL_CONNECTION_REQUEST,
  CONNECTION_RESPONSE_REQUEST,
  APPLY_FOR_JOB_REQUEST,
  SAVE_JOB_REQUEST,
  GET_ALL_SAVED_JOBS_REQUEST,
  DELETE_PROFILE_REQUEST,
  SEARCH_JOBS_REQUEST,
  SEARCH_PEOPLE_REQUEST,
  UPDATE_PROFILE_VIEWS_REQUEST,
  GRAPH_PROFILE_VIEWS_REQUEST,
  GET_ALL_APPLICATIONS_REQUEST,
  GRAPH_SAVED_JOBS_REQUEST,
} = require("./kafka/topics");

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("observing ", topic_name, "for request");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest(SIGNUP_RECRUITER_REQUEST_TOPIC, signupRecruiterService);
handleTopicRequest(ADD_RECRUITER_ROLE_REQUEST, addRecruiterRoleService);
handleTopicRequest(SIGNUP_APPLICANT_REQUEST_TOPIC, signupApplicantService);
handleTopicRequest(
  SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC,
  signupApplicantCheckService
);
handleTopicRequest(SIGNIN_RECRUITER_REQUEST_TOPIC, signinRecruiterService);
handleTopicRequest(SIGNIN_APPLICANT_REQUEST_TOPIC, signinApplicantService);
handleTopicRequest(POST_JOB_REQUEST, postJobService);
handleTopicRequest(GET_JOBS_BY_RECRUITER_REQUEST, getJobsByRecruiterService);
handleTopicRequest(POST_RECRUITER_PROFILE_REQUEST, postRecruiterProfileService);
handleTopicRequest(GET_RECRUITER_PROFILE_REQUEST, getRecruiterProfileService);
handleTopicRequest(GET_APPLICANT_PROFILE_REQUEST, getApplicantProfileService);
handleTopicRequest(
  POST_APPLICANT_PROFILE_SUMMARY_REQUEST,
  postApplicantProfileSummaryService
);
handleTopicRequest(
  POST_APPLICANT_PROFILE_EXPERIENCE_REQUEST,
  postApplicantProfileExperienceService
);
handleTopicRequest(
  POST_APPLICANT_PROFILE_EDUCATION_REQUEST,
  postApplicantProfileEducationService
);
handleTopicRequest(
  POST_APPLICANT_PROFILE_SKILLS_REQUEST,
  postApplicantProfileSkillsService
);
handleTopicRequest(
  POST_APPLICANT_PROFILE_PHOTO_REQUEST,
  postApplicantProfilePhotoService
);
handleTopicRequest(EDIT_JOB_REQUEST, editJobService);
handleTopicRequest(UPDATE_JOB_VIEWS_REQUEST, updateJobViewsService);
handleTopicRequest(GRAPHS_CLICK_PER_JOB_REQUEST, graphClicksPerJobServce);
handleTopicRequest(GRAPHS_TOP_JOB_POSTINGS_REQUEST, garphTopJobPostings);
handleTopicRequest(UPDATE_JOB_CLICKS_REQUEST, updateJobClicksServices);
handleTopicRequest(
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  graphUnpopularJobPostings
);
handleTopicRequest(
  GRAPHS_CITYWISE_APPLICATION_REQUEST,
  graphCitywiseApplications
);
handleTopicRequest(LOG_EVENT_REQUEST, logEventService);
handleTopicRequest(GRAPHS_LOG_EVENT_REQUEST, graphLogEvent);
handleTopicRequest(SEND_MESSAGE_REQUEST, sendMessageService);
handleTopicRequest(SIGNIN_APPLICANT_REQUEST_TOPIC, signinApplicantService);
handleTopicRequest(GET_ALL_MESSAGES_REQUEST, getAllMessagesService);
handleTopicRequest(SEND_CONNECTION_REQUEST, sendConnectionRequestService);
handleTopicRequest(CONNECTION_RESPONSE_REQUEST, connectionResponse);
handleTopicRequest(GET_ALL_CONNECTION_REQUEST, getAllConnections);
handleTopicRequest(APPLY_FOR_JOB_REQUEST, applyForJobService);
handleTopicRequest(SAVE_JOB_REQUEST, saveJobService);
handleTopicRequest(GET_ALL_SAVED_JOBS_REQUEST, getAllSavedJobsService);
handleTopicRequest(DELETE_PROFILE_REQUEST, deleteProfileService);
handleTopicRequest(SEARCH_JOBS_REQUEST, searchJobs);
handleTopicRequest(SEARCH_PEOPLE_REQUEST, searchPeople);
handleTopicRequest(UPDATE_PROFILE_VIEWS_REQUEST, updateProfileViews);
handleTopicRequest(GRAPH_PROFILE_VIEWS_REQUEST, graphProfileViews);
handleTopicRequest(GET_ALL_APPLICATIONS_REQUEST, getAllApplicationsForAJob);
handleTopicRequest(GRAPH_SAVED_JOBS_REQUEST, graphSavedJobsService);
