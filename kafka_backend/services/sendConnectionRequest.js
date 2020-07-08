const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { Users } = require("./../models/user");

async function handle_request(req, callback) {
  let resp = {};
  console.log(req);

  try {
    receiverIncomingRequest = await Users.findOneAndUpdate(
      { email: req.receiver.username },
      {
        $push: {
          connectionsIncoming: {
            email: req.sender.username,
            firstName: req.sender.firstname,
            lastName: req.sender.lastname,
          },
        },
      }
    );
    senderOutgoingRequest = await Users.findOneAndUpdate(
      { email: req.sender.username },
      {
        $push: {
          connectionsOutgoing: {
            email: req.receiver.username,
            firstName: req.receiver.firstname,
            lastName: req.receiver.lastname,
          },
        },
      }
    );
    resp = prepareSuccess();
  } catch (error) {
    console.log(error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

exports.handle_request = handle_request;
