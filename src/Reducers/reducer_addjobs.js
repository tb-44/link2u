import { ADDJOB_FETCH, ADDJOB_ERROR } from "../Actions/recruiterActions";

export default function (state = {}, action) {
  switch (action.type) {
    case ADDJOB_FETCH:
      return { ...state, addjob: action.payload, error: false };
    case ADDJOB_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}
