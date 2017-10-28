const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ms = require('ms');
const moment = require('moment');
require("moment-duration-format");
const request = require('request');
const Cleverbot = require('cleverbot-node');
const clbot = new Cleverbot;
clbot.configure({botapi: 'CC2fhxHqzjAe--t9Nmwr4rOo3ew'});
const botSettings = require("./botsettings.json")

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

// Modlog testing.
//bot.on('messageUpdate', (message, newMessage, guild) => {
//	if (!newMessage.guild.channels) return
//	let channel = message.guild.channels.find(c => c.topic === 'xaq-modlog')
//	if (!channel) return
//  if (message.content === newMessage.content) return
//	message.guild.channels.find(c => c.topic === 'xaq-modlog').send(`**#${message.channel.name} | ${message.author.tag} edited their message:**\n**before:** \`${message.content}\`\n**+after:** \`${newMessage.content}\``)
//});

bot.on('messageDelete', (message, guild) => {
	if (!message.guild.channels) return
	let channel = message.guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    if (message.channel.type !== "text") return
	message.guild.channels.find(c => c.topic === 'xaq-modlog').send(`**#${message.channel.name} | ${message.author.tag} deleted their message:** \`${message.content}\``)
});

bot.on('disconnect', () =>{
  console.log(`You have been disconnected at ${new Date()}`);
});

bot.on('reconnecting', () => {
  console.log(`Reconnecting at ${new Date()}`);
});

bot.on('guildMemberUpdate', (old, nw, guild) => {
	if (!nw.guild.channels) return
	let channel = nw.guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    let txt
    if (old.roles.size !== nw.roles.size) {
        if (old.roles.size > nw.roles.size) {
            //Taken
            let dif = old.roles.filter(r => !nw.roles.has(r.id)).first()
            txt = `**${nw.user.tag} | Role taken -> \`${dif.name}\`**`
        } else if (old.roles.size < nw.roles.size) {
            //Given
            let dif = nw.roles.filter(r => !old.roles.has(r.id)).first()
            txt = `**${nw.user.tag} | Role given -> \`${dif.name}\`**`
        }
    } else if (old.nickname !== nw.nickname) {
        txt = `**${nw.user.tag} | Changed their nickname to -> \`${nw.nickname}\`**`
    } else return
   nw.guild.channels.find(c => c.topic === 'xaq-modlog').send(txt, nw.guild)
})

bot.on('roleCreate', (role, guild) => {
	if (!role.guild.channels) return
	let channel = role.guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    role.guild.channels.find(c => c.topic === 'xaq-modlog').send("**New role created**")
})

bot.on('roleDelete', (role, guild) => {
	if (!role.guild.channels) return
	let channel = role.guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    role.guild.channels.find(c => c.topic === 'xaq-modlog').send("**Role deleted -> `" + role.name + "`**")
})

bot.on('roleUpdate', (old, nw, guild) => {
	if (!nw.guild.channels) return
	let channel = nw.guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    let txt
    if (old.name !== nw.name) {
        txt = `**${old.name} | Role name updated to -> \`${nw.name}\`**`
    } else return
    nw.guild.channels.find(c => c.topic === 'xaq-modlog').send(txt)
})

bot.on('guildBanAdd', (guild, user) => {
	if (!guild.channels) return
	let channel = guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    guild.channels.find(c => c.topic === 'xaq-modlog').send(`**User banned -> \`${user.tag}\`**`)
})

bot.on('guildBanRemove', (guild, user) => {
	if (!guild.channels) return
	let channel = guild.channels.find(c => c.topic === 'xaq-modlog')
 	if (!channel) return
    guild.channels.find(c => c.topic === 'xaq-modlog').send(`**User unbanned -> \`${user.tag}\`**`)
})

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", () => {
   	  bot.user.setStatus("online"); //dnd , online , ldle
      bot.user.setGame("x!help || https://discord.gg/YkfFZ9C");
      console.log("Running as user "+bot.user.username+"#"+bot.user.discriminator+".");
//			bot.user.setAvatar('./avatar.png')
//  			.then(user => console.log(`New avatar set!`))
//  			.catch(console.error);
});

//bot.on("guildCreate", guild => {
//	guild.defaultChannel.send("Hey! Thanks for inviting me. To see my commands just say `x!help`. Have fun using XaQBot :joy:");
//});

bot.on("message", message => {
	if(message.author.bot) return;
	if(message.content.includes("<@335351230601887764> help")){
		message.author.send("My prefix is x!\nSay x!help in a server to get my commands!")
	}
	if(message.channel.type === "dm") {
/* 	clbot.write(message.content, (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.output).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
    }); return;
*/ return;
	}

	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = messageArray.slice(1);
    var cmdTxt = message.content.split(" ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);

	if(message.content.includes('<@335351230601887764>')) {
 /*   clbot.write(message.content, (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.output).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
    }); */
message.channel.send("I can't respond to this right now.")
  }

	if(!command.startsWith(prefix)) return;



	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args);
});

process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Error: \n${error.stack}`);
});

bot.login(process.env.BOT_TOKEN);
