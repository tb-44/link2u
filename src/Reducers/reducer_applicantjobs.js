import { userConstants } from "../constants";

export function ApplicantJobsReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.SAVE_JOB:
      return action.payload;
    case userConstants.APPLY_JOB:
      return action.payload;
    case userConstants.GET_SAVEDJOBS:
      return action.payload;
    case userConstants.SEARCH_JOBS:
      return action.payload;
    default:
      return state;
  }
}
