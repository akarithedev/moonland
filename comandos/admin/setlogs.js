 const { Command } = require("discord.js-commando") 
 const { MessageEmbed } = require("discord.js") 
 const db = require("quick.db")

module.exports = class setlogsCommand extends Command { 
  constructor(client) {
    super(client, { 
      name: "setlogs",  
      group: "admin", 
      description: "setthe logs ", 
      memberName: "setlogs", 
      aliases: ["set-logs"],
      })
    };
  
  async run(message, client, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) { 
       
    return message.say("You dont have permissions to use this")
  }  
    
    const channel = message.mentions.channels.first(); 
    
    if(!channel) { 
      return message.say("Please set the logs channel")
    }
    
    db.set(`logs_${message.guild.id}`, channel.id).then 
    const embed = new MessageEmbed() 
    .setAuthor("Logs System") 
    .setDescription(`Logs channel has been to ${channel}`) 
    .setColor("#ff2025") 
    .setTimestamp() 
    return message.channel.send(embed) 
    process.exit(1);
  }
};