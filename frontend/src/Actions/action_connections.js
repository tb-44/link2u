import axios from "axios";
import { userConstants } from "../constants";
import URI from "../constants/URI";

//target action for Send Connection Request
export function makeconnections(data, tokenFromStorage) {
  console.log("inside Send Connection Request action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = axios.post(
    URI.ROOT_URL + "/makeConnectionRequest/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.MAKE_CONNECTION_REQUEST,
    payload: response,
  };
}

//target action getAllConnections Request
export function getAllConnections(tokenFromStorage) {
  console.log("inside Get All Connections action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = axios.get(URI.ROOT_URL + "/getConnections/", config);
  console.log("Response", response);
  return {
    type: userConstants.GET_ALL_CONNECTIONS,
    payload: response,
  };
}

//target action Connection Response Request
export function connectionresponse(data, tokenFromStorage) {
  console.log("inside Get All Connections action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  axios.defaults.withCredentials = true;
  const response = axios.post(
    URI.ROOT_URL + "/connectionResponse/",
    data,
    config
  );
  console.log("Response", response);
  return {
    type: userConstants.CONNECTION_RESPONSE,
    payload: response,
  };
}

//target action Search all People Request
export function searchpeople(data, tokenFromStorage) {
  console.log("inside Search all People action");
  var config = {
    headers: {
      Authorization: tokenFromStorage,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };
  var search = data.search;
  axios.defaults.withCredentials = true;
  const response = axios.get(URI.ROOT_URL + "/searchPeople/", {
    params: {
      search,
    },
    ...config,
  });
  console.log("Response", response);
  return {
    type: userConstants.SEARCH_PEOPLE,
    payload: response,
  };
}
