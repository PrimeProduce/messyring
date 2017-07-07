var messyring = {};

const Ring = require('doorbot');
const Secrets = require('./Secrets');

messyring.init = function(callback) {
  Ring.authenticate(Secrets.messyring.email, Secrets.messyring.password, (e, token) => {
    console.log(e, token);
    messyring.token = token;
    callback();
  });
}

messyring.checkForRing = function (onring)  {
  const check = () => {
    console.log('Checking for ring activity..');
    Ring.dings(messyring.token, (e, json) => {
      console.log(e, json);
      try {
        if(json[0]['state'] === 'ringing') {
          onring(json);
        }
      } catch (e) {
      }
    });
  };
  setInterval(check, 3 * 1000);
  check();
}

messyring.getHistory = () => {
  Ring.history(messyring.token, (error, array) => {
    console.log(error);
    console.log(array[0].id);
    messyring.getRecording(array[0].id);
    
  });
}

messyring.getRecording = (id, callback) => {
  Ring.recording(messyring.token, id, (error, url) => {
    console.log(error);
    console.log(url);
		if(error == null) {
			callback(url);
		}
  });
}


module.exports = messyring;
