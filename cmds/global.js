module.exports.run = async (bot, message, args) => {
    var cmdTxt = message.content.split(" ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);
    
    bot.guilds.forEach(g => {

      if (message.author.id !== "190174684371746818") return; {
		g.defaultChannel.send(suffix)

      }

    })
}

module.exports.help = {
	name: "g"
}