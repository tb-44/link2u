import {
  RECRUITER_PROFILE_SUCCESS,
  RECRUITER_PROFILE_FAILURE,
} from "../Actions/recruiterActions";

export default function (state = {}, action) {
  switch (action.type) {
    case RECRUITER_PROFILE_SUCCESS:
      return { ...state, profile: action.payload, error: false };
    case RECRUITER_PROFILE_FAILURE:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}
