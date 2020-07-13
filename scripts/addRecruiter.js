var addRecruiter = require("../kafka_backend/services/signupRecruiter");
var addRecruiterProfile = require("../kafka_backend/services/postRecruiterProfile");
var { mongoose } = new require("../kafka_backend/config/mongoose");
var con = require("../kafka_backend/config/mysql");
con.startConnection();

var address_list = [
  "312 Gough",
  "112 Van Ness",
  "2032 California",
  "12 Market Street",
];

var city_list = ["San Jose", "Chicago", "New York", "San Francisco"];

var state_list = [
  "California",
  "New York",
  "Washington",
  "Florida",
  "Illinois",
];

var zipcode_list = ["94104", "67210", "12690", "65390"];

var phoneNumber_list = ["1123345678", "3432321212", "6689907765", "6674432123"];

var companyName_list = [
  "Google",
  "Facebook",
  "Microsoft",
  "Intel",
  "Cisco",
  "Adobe",
];

function addRecruiters() {
  // for (var i = 156; i < 161; i++) {
  //     console.log("Created Recruiter", i);
  //     var signupdata = {
  //         firstname: 'RecruiterFirstname' + i.toString(),
  //         lastname: 'RecruiterLastname' + i.toString(),
  //         email: 'recruiteremail' + i.toString() + '@gmail.com',
  //         password: '1234'
  //     }
  //     addRecruiter.handle_request(signupdata, function (res) {
  //         console.log("Result Signup", res)
  //     })

  // }

  for (var i = 156; i < 161; i++) {
    var profiledata = {
      email: "recruiteremail" + i.toString() + "@gmail.com",
      firstname: "RecruiterFirstname" + i.toString(),
      lastname: "RecruiterLastname" + i.toString(),
      address: address_list[Math.floor(Math.random() * address_list.length)],
      city: city_list[Math.floor(Math.random() * city_list.length)],
      state: state_list[Math.floor(Math.random() * state_list.length)],
      zipcode: zipcode_list[Math.floor(Math.random() * zipcode_list.length)],
      phoneNumber:
        phoneNumber_list[Math.floor(Math.random() * phoneNumber_list.length)],
      companyName:
        companyName_list[Math.floor(Math.random() * companyName_list.length)],
    };

    addRecruiterProfile.handle_request(profiledata, function (result) {
      console.log("Result Profile", result);
    });
  }
}

addRecruiters();
