var addUser = require("../kafka_backend/services/signupApplicant");
var { mongoose } = new require("../kafka_backend/config/mongoose");
var con = require("../kafka_backend/config/mysql");
con.startConnection();

var state_lsit = ["Illinois", "California", "New York", "Michigan", "Florida"];

var city_list = [
  "Chicago",
  "San Jose",
  "San Francisco",
  "New York",
  "Seattle",
  "Detroit",
  "Orlando",
];

var zipcode_list = ["65210", "97104", "99210", "54321", "54320"];

var title_list = [
  "Manager",
  "Software Engineer",
  "Industrial Engineer",
  "Data Analyst",
  "System Engineer",
];

var company_list = ["Twitter", "Amazon", "Google", "Uber", "IBM"];

var location_list = [
  "Seattle, United States",
  "Chicago, United States",
  "San Jose, United States",
  "New York, United States",
];

var fromMonth_list = ["July", "August", "January", "May", "June", "December"];

var fromYear_list = ["2015", "2016", "2014"];

var school_list = [
  "San Jose State University",
  "Boston University",
  "California State University",
];

var degree_list = ["Bachelors", "Masters"];

function addUsers() {
  for (var i = 6; i < 11; i++) {
    console.log("Created User", i);
    var data = {
      firstname: "UserFirstName" + i.toString(),
      lastname: "UserLastname" + i.toString(),
      email: "useremail" + i.toString() + "@gmail.com",
      password: "1234",
      state: state_lsit[Math.floor(Math.random() * state_lsit.length)],
      city: city_list[Math.floor(Math.random() * city_list.length)],
      zipcode: zipcode_list[Math.floor(Math.random() * zipcode_list.length)],
      title: title_list[Math.floor(Math.random() * title_list.length)],
      company: company_list[Math.floor(Math.random() * company_list.length)],
      location: location_list[Math.floor(Math.random() * location_list.length)],
      fromMonth:
        fromMonth_list[Math.floor(Math.random() * fromMonth_list.length)],
      fromYear: fromYear_list[Math.floor(Math.random() * fromYear_list.length)],
      school: school_list[Math.floor(Math.random() * school_list.length)],
      degree: degree_list[Math.floor(Math.random() * degree_list.length)],
      schoolfromYear: "2010",
      schooltoYear: "2012",
    };
    addUser.handle_request(data, function (res) {
      console.log("Result", res);
    });
  }
}

addUsers();
