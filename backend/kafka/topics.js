const SIGNIN_RECRUITER_REQUEST_TOPIC = "signinRecruiterRequest";
const SIGNIN_RECRUITER_RESPONSE_TOPIC = "signinRecruiterResponse";
const SIGNUP_RECRUITER_REQUEST_TOPIC = "signupRecruiterRequest";
const SIGNUP_RECRUITER_RESPONSE_TOPIC = "signupRecruiterResponse";

const ADD_RECRUITER_ROLE_REQUEST = "addRecruiterRoleRequest";
const ADD_RECRUITER_ROLE_RESPONSE = "addRecruiterRoleResponse";

const SIGNIN_APPLICANT_REQUEST_TOPIC = "signinApplicantRequest";
const SIGNIN_APPLICANT_RESPONSE_TOPIC = "signinApplicantResponse";
const SIGNUP_APPLICANT_REQUEST_TOPIC = "signupApplicantRequest";
const SIGNUP_APPLICANT_RESPONSE_TOPIC = "signupApplicantResponse";
const SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC = "signupApplicantCheckRequest";
const SIGNUP_APPLICANT_CHECK_RESPONSE_TOPIC = "signupApplicantCheckResponse";

const POST_JOB_REQUEST = "postJobRequest";
const POST_JOB_RESPONSE = "postJobResponse";

const GET_JOBS_BY_RECRUITER_RESPONSE = "getJobsByRecruiterResponse";
const GET_JOBS_BY_RECRUITER_REQUEST = "getJobsByRecruiterRequest";

const POST_RECRUITER_PROFILE_REQUEST = "postRecruiterProfileRequest";
const POST_RECRUITER_PROFILE_RESPONSE = "postRecruiterProfileResponse";

const EDIT_JOB_REQUEST = "editJobRequest";
const EDIT_JOB_RESPONSE = "editJobResponse";

const UPDATE_JOB_VIEWS_REQUEST = "updateJobViewsRequest";
const UPDATE_JOB_VIEWS_RESPONSE = "updateJobViewsResponse";

const GET_RECRUITER_PROFILE_REQUEST = "getRecruiterProfileRequest";
const GET_RECRUITER_PROFILE_RESPONSE = "getRecruiterProfileResponse";

const GET_APPLICANT_PROFILE_REQUEST = "getApplicantProfileRequest";
const GET_APPLICANT_PROFILE_RESPONSE = "getApplicantProfileResponse";

const POST_APPLICANT_PROFILE_SUMMARY_REQUEST =
  "postApplicantProfileSummaryRequest";
const POST_APPLICANT_PROFILE_SUMMARY_RESPONSE =
  "postApplicantProfileSummaryResponse";

const POST_APPLICANT_PROFILE_EXPERIENCE_REQUEST =
  "postApplicantProfileExperienceRequest";
const POST_APPLICANT_PROFILE_EXPERIENCE_RESPONSE =
  "postApplicantProfileExperienceResponse";

const POST_APPLICANT_PROFILE_EDUCATION_REQUEST =
  "postApplicantProfileEducationRequest";
const POST_APPLICANT_PROFILE_EDUCATION_RESPONSE =
  "postApplicantProfileEducationResponse";

const POST_APPLICANT_PROFILE_SKILLS_REQUEST =
  "postApplicantProfileSkillsRequest";
const POST_APPLICANT_PROFILE_SKILLS_RESPONSE =
  "postApplicantProfileSkillsResponse";

const POST_APPLICANT_PROFILE_PHOTO_REQUEST = "postApplicantProfilePhotoRequest";
const POST_APPLICANT_PROFILE_PHOTO_RESPONSE =
  "postApplicantProfilePhotoResponse";

const UPDATE_JOB_CLICKS_REQUEST = "updateJobClicksRequest";
const UPDATE_JOB_CLICKS_RESPONSE = "updateJobClicksResponse";

const LOG_EVENT_REQUEST = "logEventRequest";
const LOG_EVENT_RESPONSE = "logEventResponse";

const SEND_MESSAGE_REQUEST = "sendMessageRequest";
const SEND_MESSAGE_RESPONSE = "sendMessageResponse";
const GET_ALL_MESSAGES_REQUEST = "getAllMessagesRequest";
const GET_ALL_MESSAGES_RESPONSE = "getAllMessagesResponse";

const SEND_CONNECTION_REQUEST = "sendConnectionRequest";
const SEND_CONNECTION_RESPONSE = "sendConnectionResponse";
const GET_ALL_CONNECTION_REQUEST = "getAllConnectionRequest";
const GET_ALL_CONNECTION_RESPONSE = "getAllConnectionResponse";
const CONNECTION_RESPONSE_REQUEST = "connectionResponseRequest";
const CONNECTION_RESPONSE_RESPONSE = "connectionResponseResponse";

const APPLY_FOR_JOB_REQUEST = "applyForJobRequest";
const APPLY_FOR_JOB_RESPONSE = "applyForJobResponse";

const SAVE_JOB_REQUEST = "saveJobRequest";
const SAVE_JOB_RESPONSE = "saveJobResponse";

const GET_ALL_SAVED_JOBS_REQUEST = "getAllSavedJobsRequest";
const GET_ALL_SAVED_JOBS_RESPONSE = "getAllSavedJobsResponse";

const DELETE_PROFILE_REQUEST = "deleteProfileRequest";
const DELETE_PROFILE_RESPONSE = "deleteProfileResponse";

const SEARCH_JOBS_REQUEST = "searchJobsRequest";
const SEARCH_JOBS_RESPONSE = "searchJobsResponse";

const SEARCH_PEOPLE_REQUEST = "searchPeopleRequest";
const SEARCH_PEOPLE_RESPONSE = "searchPeopleResponse";

const UPDATE_PROFILE_VIEWS_REQUEST = "updateProfileViewsRequest";
const UPDATE_PROFILE_VIEWS_RESPONSE = "updateProfileViewsResponse";

const GET_ALL_APPLICATIONS_REQUEST = "getAllApplicationsRequest";
const GET_ALL_APPLICATIONS_RESPONSE = "getAllApplicationsResponse";

const GRAPH_SAVED_JOBS_REQUEST = "graphSavedJobsRequest";
const GRAPH_SAVED_JOBS_RESPONSE = "graphSavedJobsResponse";

const GRAPHS_CLICK_PER_JOB_REQUEST = "graphClicksPerJobRequest";
const GRAPHS_CLICK_PER_JOB_RESPONSE = "graphClicksPerJobResponse";
const GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST =
  "graphUnpopularJobPostingsRequest";
const GRAPHS_UNPOPULAR_JOB_POSTINGS_RESPONSE =
  "graphUnpopularJobPostingsResponse";
const GRAPHS_CITYWISE_APPLICATION_REQUEST = "graphCitywiseApplicationRequest";
const GRAPHS_CITYWISE_APPLICATION_RESPONSE = "graphCitywiseApplicationResponse";
const GRAPHS_LOG_EVENT_REQUEST = "graphLogEventRequest";
const GRAPHS_LOG_EVENT_RESPONSE = "graphLogEventResponse";
const GRAPH_PROFILE_VIEWS_REQUEST = "graphProfileViewsRequest";
const GRAPH_PROFILE_VIEWS_RESPONSE = "graphProfileViewsResponse";
const GRAPHS_TOP_JOB_POSTINGS_REQUEST = "graphTopJobPostingsRequest";
const GRAPHS_TOP_JOB_POSTINGS_RESPONSE = "graphTopJobPostingsResponse";

module.exports = {
  SIGNIN_RECRUITER_REQUEST_TOPIC,
  SIGNIN_RECRUITER_RESPONSE_TOPIC,
  SIGNUP_RECRUITER_REQUEST_TOPIC,
  SIGNUP_RECRUITER_RESPONSE_TOPIC,
  ADD_RECRUITER_ROLE_REQUEST,
  ADD_RECRUITER_ROLE_RESPONSE,
  SIGNIN_APPLICANT_REQUEST_TOPIC,
  SIGNIN_APPLICANT_RESPONSE_TOPIC,
  SIGNUP_APPLICANT_REQUEST_TOPIC,
  SIGNUP_APPLICANT_RESPONSE_TOPIC,
  SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC,
  SIGNUP_APPLICANT_CHECK_RESPONSE_TOPIC,
  POST_JOB_REQUEST,
  POST_JOB_RESPONSE,
  GET_JOBS_BY_RECRUITER_REQUEST,
  GET_JOBS_BY_RECRUITER_RESPONSE,
  POST_RECRUITER_PROFILE_REQUEST,
  POST_RECRUITER_PROFILE_RESPONSE,
  EDIT_JOB_REQUEST,
  EDIT_JOB_RESPONSE,
  GRAPH_SAVED_JOBS_REQUEST,
  GRAPH_SAVED_JOBS_RESPONSE,
  UPDATE_JOB_VIEWS_REQUEST,
  UPDATE_JOB_VIEWS_RESPONSE,
  GET_RECRUITER_PROFILE_REQUEST,
  GET_RECRUITER_PROFILE_RESPONSE,
  GET_APPLICANT_PROFILE_REQUEST,
  GET_APPLICANT_PROFILE_RESPONSE,
  POST_APPLICANT_PROFILE_SUMMARY_REQUEST,
  POST_APPLICANT_PROFILE_SUMMARY_RESPONSE,
  POST_APPLICANT_PROFILE_EXPERIENCE_REQUEST,
  POST_APPLICANT_PROFILE_EXPERIENCE_RESPONSE,
  POST_APPLICANT_PROFILE_EDUCATION_REQUEST,
  POST_APPLICANT_PROFILE_EDUCATION_RESPONSE,
  POST_APPLICANT_PROFILE_SKILLS_REQUEST,
  POST_APPLICANT_PROFILE_SKILLS_RESPONSE,
  POST_APPLICANT_PROFILE_PHOTO_REQUEST,
  POST_APPLICANT_PROFILE_PHOTO_RESPONSE,
  GRAPHS_CLICK_PER_JOB_REQUEST,
  GRAPHS_CLICK_PER_JOB_RESPONSE,
  GRAPHS_TOP_JOB_POSTINGS_REQUEST,
  GRAPHS_TOP_JOB_POSTINGS_RESPONSE,
  UPDATE_JOB_CLICKS_REQUEST,
  UPDATE_JOB_CLICKS_RESPONSE,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_REQUEST,
  GRAPHS_UNPOPULAR_JOB_POSTINGS_RESPONSE,
  GRAPHS_CITYWISE_APPLICATION_REQUEST,
  GRAPHS_CITYWISE_APPLICATION_RESPONSE,
  LOG_EVENT_REQUEST,
  LOG_EVENT_RESPONSE,
  GRAPHS_LOG_EVENT_REQUEST,
  GRAPHS_LOG_EVENT_RESPONSE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_RESPONSE,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_RESPONSE,
  SEND_CONNECTION_REQUEST,
  SEND_CONNECTION_RESPONSE,
  GET_ALL_CONNECTION_REQUEST,
  GET_ALL_CONNECTION_RESPONSE,
  CONNECTION_RESPONSE_REQUEST,
  CONNECTION_RESPONSE_RESPONSE,
  APPLY_FOR_JOB_REQUEST,
  APPLY_FOR_JOB_RESPONSE,
  SAVE_JOB_REQUEST,
  SAVE_JOB_RESPONSE,
  GET_ALL_SAVED_JOBS_REQUEST,
  GET_ALL_SAVED_JOBS_RESPONSE,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_RESPONSE,
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_RESPONSE,
  SEARCH_PEOPLE_REQUEST,
  SEARCH_PEOPLE_RESPONSE,
  GRAPH_PROFILE_VIEWS_REQUEST,
  GRAPH_PROFILE_VIEWS_RESPONSE,
  UPDATE_PROFILE_VIEWS_REQUEST,
  UPDATE_PROFILE_VIEWS_RESPONSE,
  GET_ALL_APPLICATIONS_REQUEST,
  GET_ALL_APPLICATIONS_RESPONSE,
};
