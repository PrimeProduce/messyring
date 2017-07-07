messyring = require('./messyring');
messyslack = require('./messyslack');
var moment = require('moment');
var tracery = require('tracery-grammar');

var grammar = tracery.createGrammar({
  'greeting': "Hi|Hello|Hullo|Greetings|Aloha|Howdy".split("|"),
  'people': "everyone|people|peeps|y'all|folks|friends".split("|"),
  'pleasecheck_1':'Does anyone want to|Can anyone|Could someone'.split("|"),
  'pleasecheck_2':'take a gander|hop on over|take a look|open the door|say hello|greet them'.split("|"),
})


// initialize..
messyslack.init(function() {
  messyring.init(function() {

		// if initialized, keep checking for ring
    messyring.checkForRing(function(json) {

			//WE HAVE A RING!

			// send a note
      var nowtime = moment().format('MMMM Do YYYY, h:mm:ss a'); 
      var message = grammar.flatten("<!channel>: #greeting# #people#! There's *someone at the front door of Prime Produce!* (as of " + nowtime + "). #pleasecheck_1# #pleasecheck_2#? I'll also send an IFFFT message, just in case you don't get this message.");
      messyslack.sendNote("#_front_door", message);

			// after 40 seconds, get the video recording and also post to slack
			setTimeout(function() {
				messyring.getRecording(json[0].id, function(url) {
					messyslack.sendNote("#_front_door", "Video from the most recent ring: <" + url + "|click here>");
				})
			}, 40 * 1000);


    });
  });
});

