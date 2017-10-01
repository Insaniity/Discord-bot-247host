module.exports.run = (bot, message, args) => {
      var request = require('request');
      request('https://8ball.delegator.com/magic/JSON/0', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var eightBall = JSON.parse(body);
          message.channel.send(eightBall.magic.answer + ", " + message.author);
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
}

module.exports.help = {
	name: "8ball"
}
