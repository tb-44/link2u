const { prepareInternalServerError, prepareSuccess } = require("./responses");
const { Message } = require("./../models/message");

async function handle_request(req, callback) {
  let resp = {};
  try {
    let conversation = await Message.findOne(
      createSearchCriteriaForMessage(req)
    );
    let storedConversation = null;
    if (conversation) {
      storedConversation = await Message.findOneAndUpdate(
        createSearchCriteriaForMessage(req),
        {
          $push: {
            messages: {
              from: req.sender.username,
              message: req.message,
            },
          },
        }
      );
    } else {
      conversation = {
        user1: {
          username: req.sender.username,
          firstname: req.sender.firstname,
          lastname: req.sender.lastname,
        },
        user2: {
          username: req.receiver.username,
          firstname: req.receiver.firstname,
          lastname: req.receiver.lastname,
        },
        messages: [
          {
            from: req.sender.username,
            message: req.message,
          },
        ],
      };
      storedConversation = await Message.create(conversation);
    }
    resp = prepareSuccess();
  } catch (error) {
    console.log(error);
    resp = prepareInternalServerError();
  }
  callback(null, resp);
}

createSearchCriteriaForMessage = (req) => {
  let searchingCriteria = {
    $or: [
      {
        "user1.username": req.sender.username,
        "user2.username": req.receiver.username,
      },
      {
        "user1.username": req.receiver.username,
        "user2.username": req.sender.username,
      },
    ],
  };
  return searchingCriteria;
};

exports.handle_request = handle_request;
