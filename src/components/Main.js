import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Home/Login";
import ProfileLocation from "./Home/Profilelocation";
import ProfileEdit from "./Home/Profileedit";
import Profile from "./Profile/Profile";
import SearchJobs from "./SearchJobs/Searchjobs";
import ViewJob from "./SearchJobs/Viewjob";
import ViewSavedJobs from "./SearchJobs/Viewsavedjobs";
import MyNetwork from "./Connections/Mynetwork";
import Inbox from "./Messages/Inbox";
import ApplyJob from "./SearchJobs/JobApply";
import PostAJobHome from "./PostJobs/PostAJobHome";
import PostAJobHeader from "./PostJobs/PostJobHeader";
import EditJobHeader from "./PostJobs/EditJobHeader";
import Jobs from "./PostJobs/Jobs";
import RecruiterGraphs from "./Dashboard/Graphs";
import RecruiterDashboard from "./Dashboard/Dashboard";
import RecruiterSearchPeople from "./Dashboard/RecruiterPeople";
import RecruiterUserProfile from "./Dashboard/RecruiterUserProfile";
import Applications from "./PostJobs/Applications";
import RecruiterSigin from "./Recruiter/RecruiterSignIn";
import RecruiterSignUp from "./Recruiter/RecruiterSignUp";
import SearchPeople from "./Connections/Searchpeople";
import MyConnections from "./Connections/Myconnections";
import UserProfile from "./Connections/UserProfile";
import NotARecruiter from "./Recruiter/NotARecruiter";
import RecruiterJobApplications from "./PostJobs/Applications";
import RecruiterProfile from "./Recruiter/RecruiterProfileForm";
import ApplicantGraph from "./Dashboard/ApplicantGraph";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/profilelocation/new" component={ProfileLocation} />
          <Route path="/profileedit/new" component={ProfileEdit} />
          <Route path="/searchjobs" component={SearchJobs} />
          <Route path="/searchpeople" component={SearchPeople} />
          <Route path="/userprofile/:_id" component={UserProfile} />
          <Route
            path="/recruiteruserprofile/:_id"
            component={RecruiterUserProfile}
          />
          <Route path="/messages" component={Inbox} />
          <Route path="/mynetwork" component={MyNetwork} />
          <Route path="/myconnections" component={MyConnections} />
          <Route path="/applyjob/:jobid" component={ApplyJob} />
          <Route path="/job/view/:jobid" component={ViewJob} />
          <Route path="/job/saved" component={ViewSavedJobs} />
          <Route path="/postajobhome" component={PostAJobHome} />
          <Route path="/postajob" component={PostAJobHeader} />
          <Route path="/editjob" component={EditJobHeader} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/recprofile/" component={RecruiterProfile} />
          <Route path="/graphs/" component={RecruiterGraphs} />
          <Route path="/recruiterdash/" component={RecruiterDashboard} />
          <Route path="/Applications/" component={Applications} />
          <Route path="/recruitersignin/" component={RecruiterSigin} />
          <Route path="/recruitersignup/" component={RecruiterSignUp} />
          <Route
            path="/recruiterSearchPeople/"
            component={RecruiterSearchPeople}
          />
          <Route path="/notarecruiter/" component={NotARecruiter} />
          <Route
            path="/recruiterApplications/"
            component={RecruiterJobApplications}
          />
          <Route path="/applicantdashboard/" component={ApplicantGraph} />
        </Switch>
      </div>
    );
  }
}

export default Main;
