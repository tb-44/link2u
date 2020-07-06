var mongoose = require("mongoose");

var Jobs = mongoose.model("Jobs", {
  posted_by: String,
  title: String,
  company: String,
  job_description: String,
  industry: String,
  employment_type: String,
  location: String,
  job_function: String,
  company_logo: String,
  posted_date: Date,
  expiry_date: Date,
  application_method: String,
  no_of_views: Number,
  no_of_clicks: Number,
  applications: [
    {
      applicant_email: String,
      date: Date,
      first_name: String,
      last_name: String,
      address: String,
      city: String,
      phone_number: String,
      how_did_they_hear_about_us: String,
      diversity_question: String,
      sponsorship_question: Boolean,
      disability_question: Boolean,
      resume: {
        type: String,
        data: Buffer,
        default: "",
      },
      cover_letter: {
        type: String,
        data: Buffer,
        default: "",
      },
    },
  ],
});

module.exports = { Jobs };
