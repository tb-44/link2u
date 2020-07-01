import {
  RECRUITER_SIGNIN_FAILURE,
  RECRUITER_SIGNIN_SUCCESS,
} from "../Actions/recruiterActions";

export default function (
  state = {
    success: false,
    error: false,
  },
  action
) {
  switch (action.type) {
    case RECRUITER_SIGNIN_SUCCESS:
      return {
        ...state,
        signedInMessage: action.payload,
        error: false,
        success: true,
      };
    case RECRUITER_SIGNIN_FAILURE:
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
