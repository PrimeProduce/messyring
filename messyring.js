var messyring = {};

const Ring = require('doorbot');
const Secrets = require('./Secrets');

messyring.init = function(callback) {
  Ring.authenticate(Secrets.ring.email, Secrets.ring.password, (e, token) => {
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
        console.log(json);
        if(json[0]['state'] === 'ringing') {
          onring(json);
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  setInterval(check, 5 * 1000);
  check();
}

messyring.getHistory = () => {
  return new Promise((resolve, reject) => {
    Ring.history(messyring.token, (error, array) => {

      if(error) { return reject(error); }
      return resolve(array);
    });
      
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
