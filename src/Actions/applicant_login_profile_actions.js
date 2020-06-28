import axios from "axios";
import { userConstants } from "../constants";
import URI from "../constants/URI";

//target action for applicant signup
export function applicantsignup(data) {
  console.log("inside applicant signup action");
  axios.defaults.withCredentials = true;
  const response = axios.post(URI.ROOT_URL + "/signup_applicant/", data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_SIGNUP,
    payload: response,
  };
}

//target action for applicant signup
export function applicantsignupcheck(data) {
  console.log("inside applicant signup check action");
  axios.defaults.withCredentials = true;
  const response = axios.post(URI.ROOT_URL + "/signup_applicant_check/", data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_SIGNUP_CHECK,
    payload: response,
  };
}

//target action for applicant login
export function applicantlogin(data) {
  console.log("inside applicant login action");
  axios.defaults.withCredentials = true;
  const response = axios.post(URI.ROOT_URL + "/signin_applicant/", data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_LOGIN,
    payload: response,
  };
}

//target action for applicant profile fetch
export async function getapplicantprofile(email, tokenFromStorage) {
  console.log("inside applicant profile fetch action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.get(URI.ROOT_URL + "/get_applicant_profile/", {
    params: {
      email,
    },
    ...config,
  });
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_FETCH,
    payload: response,
  };
}

//target action for applicant profile photo update
export async function applicantprofilephoto(data, tokenFromStorage) {
  console.log("inside applicant profile photo update action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/post_applicant_profile_photo/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_PHOTO_POST,
    payload: response,
  };
}

//target action for applicant profile summary update
export async function applicantprofilesummary(data, tokenFromStorage) {
  console.log("inside applicant profile summary update action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/post_applicant_profile_summary/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_SUMMARY_POST,
    payload: response,
  };
}

//target action for applicant profile experience update
export async function applicantprofileexperience(data, tokenFromStorage) {
  console.log("inside applicant profile experience update action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/post_applicant_profile_experience/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_EXPERIENCE_POST,
    payload: response,
  };
}

//target action for applicant profile education update
export async function applicantprofileeducation(data, tokenFromStorage) {
  console.log("inside applicant profile education update action");
  console.log(data);
  console.log(tokenFromStorage);
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/post_applicant_profile_education/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_EDUCATION_POST,
    payload: response,
  };
}

//target action for applicant profile skills update
export async function applicantprofileskills(data, tokenFromStorage) {
  console.log("inside applicant profile skills update action");
  console.log(data);
  console.log(tokenFromStorage);
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/post_applicant_profile_skills/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_SKILLS_POST,
    payload: response,
  };
}

//target action for applicant profile delete
export async function applicantprofiledelete(email, tokenFromStorage) {
  console.log("inside applicant profile delete action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.delete(URI.ROOT_URL + "/delete_profile/", {
    params: {
      email,
    },
    ...config,
  });
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_DELETE,
    payload: response,
  };
}

//target action for applicant profile view logs
export async function logprofileview(data, tokenFromStorage) {
  console.log("inside applicant profile view log action", data);
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(
    URI.ROOT_URL + "/update_profile_views/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.LOG_APPLICANT_PROFILE_VIEW,
    payload: response,
  };
}
