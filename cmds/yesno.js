module.exports.run = (bot, message, args, suffix) => {
      var request = require('request');
      request('http://yesno.wtf/api/?force=' + suffix, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var yesNo = JSON.parse(body);
          message.channel.send(message.author + " " + yesNo.image);
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
}

module.exports.help = {
	name: "yesno"
}