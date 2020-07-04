var crypto = require("crypto");
var conn = require("./connection");
var TIMEOUT = 15000;
var self;

exports = module.exports = KafkaRPC;

function KafkaRPC() {
  self = this;
  this.connection = conn;
  this.requests = {};
  this.response_queue = false;
  this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function (
  request_topic,
  response_topic,
  content,
  callback
) {
  self = this;
  var correlationId = crypto.randomBytes(16).toString("hex");

  var tId = setTimeout(
    function (corr_id) {
      console.log("timeout");
      callback(new Error("timeout " + corr_id));
      delete self.requests[corr_id];
    },
    TIMEOUT,
    correlationId
  );

  var entry = {
    callback: callback,
    timeout: tId,
  };

  self.requests[correlationId] = entry;
  self.setupResponseQueue(self.producer, response_topic, function () {
    console.log("in response");

    var payloads = [
      {
        topic: request_topic,
        messages: JSON.stringify({
          correlationId: correlationId,
          replyTo: response_topic,
          data: content,
        }),
        partition: 0,
      },
    ];
    console.log("in response1");
    console.log(self.producer.ready);
    self.producer.send(payloads, function (err, data) {
      console.log("in response2");
      if (err) console.log(err);
      console.log(data);
    });
  });
};

KafkaRPC.prototype.setupResponseQueue = function (
  producer,
  response_topic,
  next
) {
  if (this.response_queue) return next();
  console.log("setupResponseQueue for: ", response_topic);
  self = this;

  var consumer = self.connection.getConsumer(response_topic);
  consumer.on("message", function (message) {
    console.log("msg received");
    var data = JSON.parse(message.value);

    var correlationId = data.correlationId;

    if (correlationId in self.requests) {
      var entry = self.requests[correlationId];

      clearTimeout(entry.timeout);

      delete self.requests[correlationId];
      entry.callback(null, data.data);
    }
  });
  self.response_queue = true;
  console.log("returning next");
  return next();
};
