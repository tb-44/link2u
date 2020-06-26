import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
} from "../Actions/recruiterActions";

export default function (
  state = {
    jobs: [],
  },
  action
) {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return { ...state, jobs: action.payload, error: false };
    case FETCH_JOBS_FAILURE:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}
