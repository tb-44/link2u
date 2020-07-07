const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { Users } = require("./../models/user");

async function handle_request(req, callback) {
  let resp = {};
  try {
    if (req.isAccepted) {
      receiverApprovedRequest = await Users.findOneAndUpdate(
        { email: req.receiver.username },
        {
          $push: {
            connectionsApproved: {
              email: req.sender.username,
              firstName: req.sender.firstname,
              lastName: req.sender.lastname,
            },
          },
          $pull: {
            connectionsOutgoing: {
              email: req.sender.username,
              firstName: req.sender.firstname,
              lastName: req.sender.lastname,
            },
          },
        }
      );
      senderApprovedRequest = await Users.findOneAndUpdate(
        { email: req.sender.username },
        {
          $push: {
            connectionsApproved: {
              email: req.receiver.username,
              firstName: req.receiver.firstname,
              lastName: req.receiver.lastname,
            },
          },
          $pull: {
            connectionsIncoming: {
              email: req.receiver.username,
              firstName: req.receiver.firstname,
              lastName: req.receiver.lastname,
            },
          },
        }
      );
    } else {
      receiverRequestRemoval = await Users.findOneAndUpdate(
        { email: req.receiver.username },
        {
          $pull: {
            connectionsIncoming: {
              email: req.sender.username,
              firstname: req.sender.firstname,
              lastname: req.sender.lastname,
            },
          },
        }
      );
      senderRequestRemoval = await Users.findOneAndUpdate(
        { email: req.sender.username },
        {
          $pull: {
            connectionsOutgoing: {
              email: req.receiver.username,
              firstName: req.receiver.firstname,
              lastName: req.receiver.lastname,
            },
          },
        }
      );
    }
    resp = prepareSuccess();
  } catch (error) {
    console.log(error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

exports.handle_request = handle_request;
