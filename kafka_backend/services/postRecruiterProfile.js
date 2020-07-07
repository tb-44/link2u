var { Users } = require("../models/user");
const db = require("./../config/mysql");
const { prepareInternalServerError, prepareSuccess } = require("./responses");

async function handle_request(msg, callback) {
  console.log("Inside kafka post Recruiter profile backend");
  console.log("In handle request:" + JSON.stringify(msg));

  let firstName = msg.firstName;
  let lastName = msg.lastName;
  let email = msg.email;
  let address = msg.address;
  let city = msg.city.toLowerCase();
  let state = msg.state;
  let zipcode = msg.zipcode;
  let phoneNumber = msg.phoneNumber;
  let companyName = msg.companyName;
  let resp = {};
  try {
    await Users.updateOne(
      { email: email },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          state: state,
          zipcode: zipcode,
          phoneNumber: phoneNumber,
          companyName: companyName,
        },
      }
    );
    await db.updateQuery(
      "UPDATE user_profile SET firstName = ?, lastName = ? WHERE email = ?",
      [firstName, lastName, email]
    );
    resp = prepareSuccess({ result: "Profile Updated Sucessfully" });
  } catch (error) {
    console.log("Something went wrong while updating profile! : ", error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

module.exports = {
  handle_request: handle_request,
};
