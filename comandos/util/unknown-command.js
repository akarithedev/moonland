const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const { prefix } = require("../../config.json")
module.exports = class UnknownCommandCommand extends Command {
 constructor(client) {
  super(client, { 
      name: "unknown-command", 
      group: "util", 
      aliases: ["uc"],
      memberName: "unknown-command", 
      description: "Unknown command",
      unknown: true,  
      hide: true, 
      guildOnly: true
  }
    )} 
  
  run(message, client) { 
    
    const embed = new Discord.MessageEmbed() 
      .setAuthor("MoonLand Bot Help", `${message.client.user.avatarURL()}`)  
      .setTitle("Invalid Command.")
      .setDescription(`Do \`${prefix}help\` for the list of the commands.`)
      .setTimestamp() 
      .setColor("#9400D3")  
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)
    message.channel.send(embed)
    
    }
};
    
      
           
          
          
    