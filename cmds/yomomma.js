module.exports.run = async (bot, message, args) => {
	var request = require('request');
      request('http://api.yomomma.info/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var yomomma = JSON.parse(body);
          message.channel.send(yomomma.joke);
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
          console.log("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
}

module.exports.help = {
	name: "yomomma"
}