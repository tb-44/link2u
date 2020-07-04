var kafka = require("kafka-node");
const config = require("./../config");

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient(
      `${config.kafkaClient_host}:${config.kafkaClient_port}`
    );
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", function () {
      console.log(topic_name, " Client Ready!");
    });
    return this.kafkaConsumerConnection;
  };

  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(
        `${config.kafkaClient_host}:${config.kafkaClient_port}`
      );
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("------- Producer Ready -------");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
