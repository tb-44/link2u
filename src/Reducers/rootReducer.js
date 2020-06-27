import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { HomeReducer } from "./reducer_home";
import JobsReducer from "./reducer_jobs";
import EditJobsReducer from "./reducer_editjobs";
import ShowJobsReducer from "./reducer_showjobs";
import { ConnectionsReducer } from "./reducer_connections";
import { ApplicantJobsReducer } from "./reducer_applicantjobs";
import Conversations from "./reducer_messages";
import RecruiterLoginReducer from "./reducer_recruiter_sigin";
import RecruiterSignUpReducer from "./reducer_recruiter_signup";
import AddJobReducer from "./reducer_addjobs";
import ApplicationsReducer from "./reducer_applications";
import RecruiterProfileReducer from "./reducer_recruiter_profile";

const rootReducer = combineReducers({
  HomeReducer,
  RecruiterProfileReducer,
  JobsReducer,
  ShowJobsReducer,
  RecruiterLoginReducer,
  ConnectionsReducer,
  ApplicantJobsReducer,
  AddJobReducer,
  ApplicationsReducer,
  EditJobsReducer,
  form: formReducer,
  RecruiterSignUpReducer,
  conversations: Conversations,
});

export default rootReducer;
