var addJob = require("../kafka_backend/services/postJob");
var { mongoose } = new require("../kafka_backend/config/mongoose");
var con = require("../kafka_backend/config/mysql");
con.startConnection();

function addJobs() {
  var recruiter_email = [
    "recruiteremail151@gmail.com",
    "recruiteremail152@gmail.com",
    "recruiteremail153@gmail.com",
    "recruiteremail154@gmail.com",
    "recruiteremail155@gmail.com",
    "recruiteremail156@gmail.com",
    "recruiteremail157@gmail.com",
    "recruiteremail158@gmail.com",
    "recruiteremail159@gmail.com",
    "recruiteremail160@gmail.com",
  ];

  var location_array = ["San Jose", "Chicago", "New York", "San Francisco"];

  var posted_date_array = [
    "2018-12-01",
    "2018-11-23",
    "2018-11-30",
    "2018-10-31",
    "2018-11-15",
  ];

  var expiry_date_array = [
    "2019-01-10",
    "2019-01-23",
    "2019-02-13",
    "2019-01-31",
    "2019-02-15",
  ];

  var title = [
    "Software Engineer",
    "System Engineer",
    "Architect",
    "Human Resources Manager",
    "Manager",
    "Civil Engineer",
    "Electrical Engineer",
  ];

  var company_list = [
    "Google",
    "Facebook",
    "Microsoft",
    "Intel",
    "Cisco",
    "Adobe",
  ];

  var company_logo_dic = {
    Google:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_"G"_Logo.svg/145px-Google_"G"_Logo.svg.png',
    Facebook:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png",
    Microsoft:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/878px-Microsoft_logo.svg.png",
    Intel:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/200px-Intel-logo.svg.png",
    Cisco:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/200px-Cisco_logo.svg.png",
    Adobe:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/500px-Adobe_Systems_logo_and_wordmark.svg.png",
  };

  var industry_list = [
    "Technology",
    "Civil",
    "Government",
    "Manufacturing",
    "Cottage",
  ];

  var employment_type_array = [
    "Full Time",
    "Internship",
    "Part Time",
    "Contract",
    "Temporary",
    "Voluntary",
  ];

  var application_methods = ["Easy Apply", "Normal"];

  for (var i = 5; i < 101; i++) {
    console.log("Created Job", i);
    var company_temp =
      company_list[Math.floor(Math.random() * company_list.length)];
    var data = {
      recruiterEmail:
        recruiter_email[Math.floor(Math.random() * recruiter_email.length)],
      title: title[Math.floor(Math.random() * title.length)],
      company: company_temp,
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu ultrices vitae auctor eu augue ut lectus. Velit dignissim sodales ut eu sem integer vitae. Viverra justo nec ultrices dui sapien. Tellus orci ac auctor augue mauris. Arcu cursus euismod quis viverra nibh. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Pulvinar mattis nunc sed blandit libero volutpat. Felis bibendum ut tristique et egestas quis ipsum. Nibh tellus molestie nunc non blandit massa enim. Ornare suspendisse sed nisi lacus sed. Maecenas pharetra convallis posuere morbi. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Lectus urna duis convallis convallis tellus id interdum.",
      industry: industry_list[Math.floor(Math.random() * industry_list.length)],
      employmentType:
        employment_type_array[
          Math.floor(Math.random() * employment_type_array.length)
        ],
      location:
        location_array[Math.floor(Math.random() * location_array.length)],
      jobFunction:
        "tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio",
      companyLogo: company_logo_dic[company_temp],
      postedDate:
        posted_date_array[Math.floor(Math.random() * posted_date_array.length)],
      expiryDate:
        expiry_date_array[Math.floor(Math.random() * expiry_date_array.length)],
      applicationMethod:
        application_methods[
          Math.floor(Math.random() * application_methods.length)
        ],
    };
    addJob.handle_request(data, function (res) {
      console.log("Result", res);
    });
  }
}

addJobs();
