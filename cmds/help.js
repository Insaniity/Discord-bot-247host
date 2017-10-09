module.exports.run = (bot, message, args) => {
	message.channel.send(":mailbox_with_mail: DM'ed you!")
	message.author.send("", {embed: {
          color: 0xd2f9f6,
          title: ``,
          url: '',
          description:  ``,
          fields: [
            {
              name: "Moderation",
              value: `• x!purge - purges messages **Command is buggy ATM. Do x!purge 100 100 to purge 100 messages.**\n• x!ban - bans mentioned user\n• x!softban - bans then unbans mentioned user\n• x!kick - kicks mentioned user\n• x!modlog - explains how to setup logs\n• x!mute - mutes mentioned user\n• x!unmute - unmutes mentioned user`
            },
            {
              name: "Fun",
              value: "• x!8ball - ask the magical 8ball a question\n• x!bill - bill knows best.\n• x!punch - knock him down buddy!\n• x!say - i'll repeat your message!\n• x!sayd - same as x!say except i'll delete your message.\n• x!sigh - Sigh.\n• x!trivia - it's hard trivia. /shrug\n• x!yesno - replys yes or no\n• x!yomomma - dead memes are dead..?"
            },
            {
              name: "Utility",
              value: "• x!avatar - shows mentioned users avatar.\n• x!help - this\n• x!invite - i'll dm you my invite.\n• x!ping - my ping with uptime\n• x!userinfo - shows mentioned users info"
            },
            {
              name: "Extra",
              value: "**@ or DM the bot to talk to it!**"
            }
          ]
        }}); 
		//	message.author.send("**I am currently being rewritten, here is my current command list. (Beta)\nx!help\nx!invite\nx!kick <usr>\nx!mute <usr>\nx!unmute <usr>\nx!purge <int> `This is buggy, you may need to do it like x!purge 100 100`\nx!8ball <var>\nx!bill\nx!avatar <usr>**");
}

module.exports.help = {
	name: "help"
}
