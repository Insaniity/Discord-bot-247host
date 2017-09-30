module.exports.run = (bot, message, args) => {
	message.channel.send(":mailbox_with_mail: DM'ed you!");
	message.author.send("Here's my invite! Thanks for choosing XaQBot!\n https://discordapp.com/oauth2/authorize?client_id=335351230601887764&scope=bot&permissions=8");
}

module.exports.help = {
	name: "invite"
}
