module.exports.run = async (bot, message, args) => {
	message.channel.send("Check your DMs!");
	message.author.send("https://discordapp.com/oauth2/authorize?client_id=335351230601887764&scope=bot&permissions=8");
}

module.exports.help = {
	name: "invite"
}