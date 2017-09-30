const request = require('request');

  module.exports.run = async (bot, message, args) => {
    var cmdTxt = message.content.split(" ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);
    var request = require('request');
      request('http://api.urbandictionary.com/v0/define?term=' + suffix, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var uD = JSON.parse(body);
          if (uD.result_type !== "no_results") {
            message.channel.send("", {embed: {
             color: 0xd2f9f6,
              author: {
              name: 'Help',
              icon_url: bot.user.avatarURL
            },
            title: `** **`,
           url: '',
           description:  suffix + ": " + uD.list[0].definition + ' "' + uD.list[0].example + '"',
            footer: {
              text: 'XaQBot by xaqfm'
           }
         }}); return;
          } else {
            message.channel.send("", {embed: {
             color: 0xd2f9f6,
              author: {
              name: 'Help',
              icon_url: bot.user.avatarURL
            },
            title: `** **`,
           url: '',
           description:  suffix + ": This is so screwed up, even Urban Dictionary doesn't have it in it's database",
            footer: {
              text: 'XaQBot by xaqfm'
           }
         }}); return;
          }
        } else {
          console.log("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });

}

module.exports.help = {
  name: "urban"
}