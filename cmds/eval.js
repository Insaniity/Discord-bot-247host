const util = require('util');

module.exports.run = async (bot, message, args) => {
  if (message.author.id === "190174684371746818") {

    var cmdTxt = message.content.split(" ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);

    try {
      let toeval = util.inspect(eval(suffix))
      if (toeval.length > 1900) {
        toeval = toeval.substr(0, 1900);
      }
      message.channel.send("**Input**\n" + suffix + "\n\n**Output**\n```js\n" + toeval + "```")
        .then(m => m.delete(20000)).catch(console.log);
    } catch (err) {
      console.log(err)
      message.channel.send("**```prolog\nError:\n\n" + err + "```**")
        .then(m => m.delete(20000)).catch(console.log);
    }

  }
}


module.exports.help = {
	name: "eval"
}