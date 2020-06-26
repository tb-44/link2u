import { userConstants } from "../constants";

export function HomeReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.APPLICANT_LOGIN:
      return action.payload;
    case userConstants.APPLICANT_SIGNUP:
      return action.payload;
    case userConstants.APPLICANT_PROFILE_FETCH:
      return action.payload;
    case userConstants.APPLICANT_PROFILE_SUMMARY_POST:
      return action.payload;
    case userConstants.APPLICANT_PROFILE_EXPERIENCE_POST:
      return action.payload;
    case userConstants.APPLICANT_PROFILE_EDUCATION_POST:
      return action.payload;
    case userConstants.APPLICANT_PROFILE_SKILLS_POST:
      return action.payload;
    case userConstants.APPLICANT_PROFILE_PHOTOS_POST:
      return action.payload;
    default:
      return state;
  }
}
