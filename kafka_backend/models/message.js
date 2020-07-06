const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const messageSchema = new Schema({
  user1: {
    username: {
      type: String,
      required: true,
    },
    firstname: String,
    lastname: String,
  },
  user2: {
    username: {
      type: String,
      required: true,
    },
    firstname: String,
    lastname: String,
  },
  messages: [
    {
      from: String,
      message: String,
    },
  ],
});

const Message = mongoose.model("conversations", messageSchema);
module.exports = { Message };
