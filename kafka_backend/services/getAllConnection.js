const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { Users } = require("./../models/user");

async function handle_request(req, callback) {
  let resp = {};
  try {
    let connections = await Users.find({ email: req.username }, [
      "connectionsApproved",
      "connectionsOutgoing",
      "connectionsIncoming",
    ]);
    resp = prepareSuccess({ connections: connections[0] });
  } catch (error) {
    console.log(error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

exports.handle_request = handle_request;
