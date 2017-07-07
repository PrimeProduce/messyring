var messyslack = {};

const Slack = require('slack-node');
var Secrets = require('./Secrets');


messyslack.init = function(callback) {
  messyslack.instance = new Slack();
  messyslack.instance.setWebhook(Secrets.messyslack.webhookUri);
  callback();
}

messyslack.sendNote = function(channel, text) { 
  messyslack.instance.webhook({
      channel: channel,
      username: "Doorbell-bot",
      text: text
  }, function(err, response) {
      console.log(response);
  });
}

module.exports = messyslack;
