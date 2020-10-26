const { Command } = require('discord.js-commando')
const Discord = require('discord.js') 
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority");
const { default_prefix } = require("../../config.json")
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
  
  async run(message, client) { 
    let prefix = await db.fetch(`prefix_${message.guild.id}`); 
  if(prefix === null) prefix = default_prefix; 
   
    const embed = new Discord.MessageEmbed() 
      .setAuthor("MoonLand Bot Help", `${this.client.user.avatarURL()}`)  
      .setTitle("Invalid Command.")
      .setDescription(`Do \`${prefix}help\` for the list of the commands.`)
      .setTimestamp() 
      .setColor("#9400D3")  
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)
    message.channel.send(embed)
    
    }
};
    
      
           
          
          
    