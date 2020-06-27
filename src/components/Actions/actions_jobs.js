import axios from "axios";
import { userConstants } from "../constants";
import URI from "../constants/URI";

//target action for Save a Job Request
export async function saveajob(data, tokenFromStorage) {
  console.log("inside Save a Job Request action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(URI.ROOT_URL + "/save_job/", data, config);
  console.log("Response", response);
  return {
    type: userConstants.SAVE_JOB,
    payload: response,
  };
}

//target action for Apply a Job Request
export async function applyjob(data, tokenFromStorage) {
  console.log("inside Apply a Job Request  action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/apply_for_job/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.APPLY_JOB,
    payload: response,
  };
}

//target action for Get all saved jobs Request
export async function getsavedjobs(applicantEmail, tokenFromStorage) {
  console.log("inside Get all saved jobs Request action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = axios.get(URI.ROOT_URL + "/get_all_saved_jobs/", {
    params: {
      applicantEmail,
    },
    ...config,
  });
  console.log("Response", response);
  return {
    type: userConstants.GET_SAVEDJOBS,
    payload: response,
  };
}

//target action for Search Jobs Request
export async function searchjob(data, tokenFromStorage) {
  console.log("inside Search Job Request action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  var start = data.start;
  var length = data.length;
  var search = data.search;
  var company = data.company;
  var employment_type = data.employment_type;
  var location = data.location;
  var date_posted = data.date_posted;

  axios.defaults.withCredentials = true;
  const response = await axios.get(URI.ROOT_URL + "/searchJobs/", {
    params: {
      start,
      length,
      search,
      company,
      employment_type,
      location,
      date_posted,
    },
    ...config,
  });
  console.log("Response", response);
  return {
    type: userConstants.SEARCH_JOBS,
    payload: response,
  };
}

//target action to log clicks per Job Posting
export async function logjobclicks(data, tokenFromStorage) {
  console.log("inside Apply a Job Request  action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/update_job_views/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.UPDATE_JOB_VIEWS,
    payload: response,
  };
}

//target action to log just read applications
export async function logapplyapplicationtypes(data, tokenFromStorage) {
  console.log("inside Apply a Job Request  action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(URI.ROOT_URL + "/log_event/", data, config);
  console.log("Response", response);
  return {
    type: userConstants.LOG_APPLY_APPLICATION_TYPES,
    payload: response,
  };
}
