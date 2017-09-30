module.exports.run = async (bot, message, args) => {
      var request = require('request');
      request('http://api.adviceslip.com/advice', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var advice = JSON.parse(body);
          message.channel.send(advice.slip.advice);
        } else {
          message.channel.send("warn", "Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
}

module.exports.help = {
	name: "advice"
}