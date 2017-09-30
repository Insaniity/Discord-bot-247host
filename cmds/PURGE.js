module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.");
	let count = parseInt(args[0]) || 1;
    message.channel.fetchMessages({ limit: Math.min(count, 100), before: message.id })
        .then(messages => {
            Promise.all(messages.map(m => m.delete()))
                .catch(message.error)
                .then(() => {
                    message.channel.send(`Purged \`${count}\` messages.`)
                        .then(m => m.delete(2000))
                        .then(message.delete(200));
                });
        }).catch(message.error);
}

module.exports.help = {
	name: "purge"
}