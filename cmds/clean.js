module.exports.run = (bot, message, args) => {
    let num = (!!message.args[0]) ? parseInt(message.args[0]) || 20 : 20;
    message.channel.fetchMessages({limit:num}).then(msgs => {
      let ms = msgs.filter(m => m.author.id === bot.user.id);
      if (ms.size === 1) { ms.first().delete(); return send("**Cleaning up my messages :joy:**") }
      if (ms.size < 1) return send("**No messages found to clean**")
      message.channel.bulkDelete(ms, true).then(() => send("**Cleaning up my messages :joy:**"))
    })
}

module.exports.help = {
	name: "clean"
}
