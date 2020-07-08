const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

let signupRecruiter = require("./routes/signupRecruiter");
let addRecruiterRole = require("./routes/addRecruiterRole");
let signupApplicant = require("./routes/signupApplicant");
let signupApplicantCheck = require("./routes/signupApplicantCheck");
let signinRecruiter = require("./routes/signinRecruiter");
let signinApplicant = require("./routes/signinApplicant");
let postJob = require("./routes/postJob");
let getJobsByRecruiter = require("./routes/getJobsByRecruiter");
let postRecruiterProfile = require("./routes/postRecruiterProfile");
let getRecruiterProfile = require("./routes/getRecruiterProfile");
let getApplicantProfile = require("./routes/getApplicantProfile");
let postApplicantProfileSummary = require("./routes/postApplicantProfileSummary");
let postApplicantProfileExperience = require("./routes/postApplicantProfileExperience");
let postApplicantProfileEducation = require("./routes/postApplicantProfileEducation");
let postApplicantProfileSkills = require("./routes/postApplicantProfileSkills");
let postApplicantProfilePhoto = require("./routes/postApplicantProfilePhoto");
let editJob = require("./routes/editJob");
let updateJobViews = require("./routes/updateJobViews");
let graphClicksPerJob = require("./routes/graphClicksPerJob");
let graphTopJobPostings = require("./routes/graphTopJobPostings");
let updateJobClicks = require("./routes/updateJobClicks");
let graphUnpopularJobPostings = require("./routes/graphUnpopularJobPostings");
let graphCitywiseApplication = require("./routes/graphCitywiseApplication");
let logEvent = require("./routes/logEvent");
let graphLogEvent = require("./routes/graphLogEvent");
let sendMessage = require("./routes/sendMessage");
let getAllMessages = require("./routes/getAllMessages");
let sendConnectionRequest = require("./routes/sendConnectionRequest");
let connectionResponse = require("./routes/connectionResponse");
let getAllConnections = require("./routes/getAllConnections");
let applyForJob = require("./routes/applyForJob");
let saveJob = require("./routes/saveJob");
let getAllSavedJobs = require("./routes/getAllSavedJobs");
let deleteProfile = require("./routes/deleteProfile");
let searchJobs = require("./routes/searchJobs");
let searchPeople = require("./routes/searchPeople");
let graphProfileViews = require("./routes/graphProfileViews");
let updateProfileViews = require("./routes/updateProfileViews");
let getAllApplicationsForAJob = require("./routes/getAllApplicationsForAJob");
let graphSavedJobs = require("./routes/graphSavedJobs");

var expressValidator = require("express-validator");
var morgan = require("morgan");
var cors = require("cors");
const config = require("./config");
const app = express();
app.use(cookieParser());
let passport = require("passport");
app.use(passport.initialize());
require("./passport/passport")(passport);
let requireAuth = passport.authenticate("jwt", { session: false });

let port = 5000 || process.env.PORT;

/** middleware */
app.use(
  cors({ origin: `http://${config.frontend_host_port}`, credentials: true })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    `http://${config.frontend_host_port}`
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//app.use(expressValidator());
app.use(morgan("dev"));

// define routes
app.use("/signup_recruiter/", signupRecruiter);
app.use("/signup_applicant/", signupApplicant);
app.use("/signup_applicant_check/", signupApplicantCheck);
app.use("/signin_recruiter/", signinRecruiter);
app.use("/signin_applicant/", signinApplicant);
app.use(
  "/profilepictures",
  express.static(path.join(__dirname, "/profilepictures/"))
);
app.get("/resumes/:resume", function (req, res, next) {
  var options = {
    root: __dirname + "/resumes_and_coverletter",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  var fileName = req.params.resume;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
    }
  });
});

app.use("/", requireAuth);
app.use("/add_recruiter_role/", addRecruiterRole);
app.use("/post_job/", postJob);
app.use("/get_jobs_by_recruiter/", getJobsByRecruiter);
app.use("/post_recruiter_profile/", postRecruiterProfile);
app.use("/get_recruiter_profile/", getRecruiterProfile);
app.use("/get_applicant_profile/", getApplicantProfile);
app.use("/post_applicant_profile_summary/", postApplicantProfileSummary);
app.use("/post_applicant_profile_experience/", postApplicantProfileExperience);
app.use("/post_applicant_profile_education/", postApplicantProfileEducation);
app.use("/post_applicant_profile_skills/", postApplicantProfileSkills);
app.use("/post_applicant_profile_photo/", postApplicantProfilePhoto);
app.use("/edit_job/", editJob);
app.use("/update_job_views/", updateJobViews);
app.use("/graph_clicks_per_job/", graphClicksPerJob);
app.use("/graph_top_job_postings/", graphTopJobPostings);
app.use("/update_job_clicks/", updateJobClicks);
app.use("/graph_unpopular_job_postings/", graphUnpopularJobPostings);
app.use("/graph_citywise_applications/", graphCitywiseApplication);
app.use("/log_event/", logEvent);
app.use("/graph_log_event/", graphLogEvent);
app.use("/message", sendMessage);
app.use("/messages", getAllMessages);
app.use("/makeConnectionRequest", sendConnectionRequest);
app.use("/connectionResponse", connectionResponse);
app.use("/getConnections", getAllConnections);
app.use("/apply_for_job/", applyForJob);
app.use("/save_job/", saveJob);
app.use("/get_all_saved_jobs/", getAllSavedJobs);
app.use("/delete_profile/", deleteProfile);
app.use("/searchJobs", searchJobs);
app.use("/searchPeople", searchPeople);
app.use("/graph_profile_views/", graphProfileViews);
app.use("/update_profile_views/", updateProfileViews);
app.use("/get_all_applications/", getAllApplicationsForAJob);
app.use("/graph_saved_jobs/", graphSavedJobs);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
