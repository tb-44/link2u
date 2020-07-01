import {
  EDIT_JOB_SUCCESS,
  EDIT_JOB_FAILURE,
} from "../Actions/recruiterActions";

export default function (state = {}, action) {
  switch (action.type) {
    case EDIT_JOB_SUCCESS:
      return { ...state, jobcreationmessage: action.payload, error: false };
    case EDIT_JOB_FAILURE:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}
