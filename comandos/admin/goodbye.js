const Discord = require("discord.js") 
const db = require("quick.db") 
const { Command } = require("discord.js-commando") 

module.exports = class goodbyeCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "goodbye", 
      description: "sets the global-chat channel", 
      memberName: "goodbye", 
      group: "admin", 
      aliases: ["set-goodbye"],
      guildOnly: true
    }
     )} 
  
  async run(message, bot, args) { 

    
    const perm = message.member.hasPermission("ADMINISTRATOR")
  if(!perm) { 
    return message.channel.send("You need `ADMINISTRATOR` permission to use this command.") 
  }  
    const channel = message.mentions.channels.first();
    if(!channel) {
      const usageEmbed = new Discord.MessageEmbed() 
      .setTitle("Wrong Usage")
      .setDescription("Correct usage: \`ml!goodbye #channel\`") 
      .setColor("RED") 
      .setTimestamp()
      return message.channel.send(usageEmbed)
    } 
    
    db.set(`goodbye_${message.guild.id}`, channel.id).then
      const gbChannel = new Discord.MessageEmbed() 
      .setTitle("GoodBye System") 
      .setDescription(`GoodBye Channel has been set to ${channel}`) 
      .setColor("BLUE") 
      .setTimestamp() 
      return message.channel.send(gbChannel) 
      process.exit(1)
    
  }
};
       