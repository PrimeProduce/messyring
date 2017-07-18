var messyslack = {};

const Slack = require('slack-node');
var Secrets = require('./Secrets');


messyslack.init = function(callback) {
  messyslack.instance = new Slack();
  messyslack.instance.setWebhook(Secrets.slack.webhookUri);
  callback();
}

messyslack.sendNote = function(channel, text) { 
  messyslack.instance.webhook({
      channel: channel,
      username: "Doorbell-bot",
      text: text,
      icon_emoji: ":robot_face:"
  }, function(err, response) {
      console.log(response);
  });
}

module.exports = messyslack;
