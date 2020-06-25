import {
  APPLICATIONS_FETCH_SUCCESS,
  APPLICATIONS_FETCH_FAILURE,
} from "../Actions/recruiterActions";

export default function (
  state = {
    applications: [],
  },
  action
) {
  switch (action.type) {
    case APPLICATIONS_FETCH_SUCCESS:
      return { ...state, applications: action.payload, error: false };
    case APPLICATIONS_FETCH_FAILURE:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}
