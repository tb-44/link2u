import {
  RECRUITER_SIGNUP_SUCCESS,
  RECRUITER_SIGNUP_FAILURE,
} from "../Actions/recruiterActions";

export default function (
  state = {
    success: false,
    error: false,
  },
  action
) {
  switch (action.type) {
    case RECRUITER_SIGNUP_SUCCESS:
      return {
        ...state,
        signedUpMessage: action.payload,
        error: false,
        success: true,
      };
    case RECRUITER_SIGNUP_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        success: false,
      };
    default:
      return state;
  }
}
