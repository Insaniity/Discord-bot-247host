module.exports.run = async (bot, message, args) => {

    var cmdTxt = message.content.split(" ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);

    message.channel.send(suffix, {disableEveryone:true})
    message.delete();
}

module.exports.help = {
	name: "sayd"
}