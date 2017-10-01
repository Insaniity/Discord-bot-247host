module.exports.run = (bot, message, args) => {
	message.channel.send("Fetching icon..")

	if(!message.guild.iconURL) return message.edit("No icon.");

	message.channel.send({files: [
		{
			attachment: message.guild.iconURL,
			name: "icon.png"
		}
	]});

}

module.exports.help = {
	name: "icon"
}