var mongoose = require("mongoose");

var Users = mongoose.model("Users", {
  firstName: String,
  lastName: String,
  profilePicture: {
    type: String,
    default: "",
  },
  profileSummary: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  state: String,
  zipcode: String,
  phoneNumber: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  experience: [
    {
      title: String,
      company: String,
      location: String,
      fromMonth: String,
      fromYear: Number,
      description: {
        type: String,
        default: "",
      },
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      schoolfromYear: Number,
      schooltoYear: Number,
      description: {
        type: String,
        default: "",
      },
    },
  ],
  skills: {
    type: String,
    default: "",
  },
  resume: {
    type: String,
    data: Buffer,
    default: "",
  },
  connectionsIncoming: [
    {
      email: String,
      firstName: String,
      lastName: String,
    },
  ],
  connectionsOutgoing: [
    {
      email: String,
      firstName: String,
      lastName: String,
    },
  ],
  connectionsApproved: [
    {
      email: String,
      firstName: String,
      lastName: String,
    },
  ],
  jobsAppliedTo: [
    {
      type: String,
    },
  ],
  savedJobs: [
    {
      type: String,
    },
  ],
  profileViews: [
    {
      type: Date,
    },
  ],
});

module.exports = { Users };
