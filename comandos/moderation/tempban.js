const { MessageEmbed } = require("discord.js") 
const ms = require("ms") 
const moment = require("moment") 
const { Command } = require("discord.js-commando") 
const { prefix } = require("../../config.json") 

module.exports = class tempbanCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "tempban", 
      group: "moderation", 
      memberName: "tempban", 
      description: "Temporary bans a user", 
      guildOnly: true 
      })
    }; 
  
  async run(message) { 
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
    
    const reason = args.splice(3).join(" ");
		const tbuser = message.mentions.members.first();
		const regex = args.splice(2).join(" ");



		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send("U dont have perms to ban someone");

		}

		if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
			return message.channel.send("I dont have permissions to ban someone");

		}

		if(tbuser === message.guild.me) {
			return message.channel.send("You cant ban me LOL");

		}

		if (!tbuser) {
			return message.channel.send("You need to specify a user ``@user``");

		}

		if (tbuser.id == message.author.id) {
			return message.channel.send("You can't ban yourself");

		}

		if(tbuser.roles.highest.position >= message.member.roles.highest.position) {
		    const roleErr = new MessageEmbed() 
        .setDescription(":x: That user is a mod/admin. I can't do that")
      return message.channel.send(roleErr);

		}



		if(tbuser.id == message.guild.owner.id) {
			return message.channel.send("You cant ban the server owner");

		}



		if(!reason) {
			 reason = "***No Reason Given***";

		}

		const tbuembed = new MessageEmbed()
			.setTitle("You have been banned!")
			.setColor("#854ae3")
			.addField("Reason:", reason)
			.addField("Time (s)", regex)
			.addField("Moderator:", message.author.username);

		tbuser.send(tbuembed);

		const tbembed = new MessageEmbed()
			.setTitle("Action: Tempban")
			.addField("User:", tbuser)
			.setAuthor(`${message.author.username}`)
			.setColor("#854ae3")
			.addField("Reason:", reason)
			.addField("Time (s)", regex)
			.addField("Moderator:", message.author.username);

		message.channel.send(tbembed);
		tbuser.send(tbuembed);
		tbuser.ban(reason).reason;

		setTimeout(() => {
			message.guild.members.unban(tbuser.id);
			message.channel.send(`${tbuser} has been unbanned after the tempban of ${regex}`);
		}, ms(regex));
		return undefined;

	}
};