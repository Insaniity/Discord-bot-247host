module.exports.run = async (bot, message, args) => {
	message.channel.send("To use XaQBots modlog just set your desired channel's topic to `xaq-modlog`, nothing else or it won't work!")
}

module.exports.help = {
	name: "modlog"
}