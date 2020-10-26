
const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class WarnCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "warn", 
      description: "Warns a member", 
      group: "moderation", 
      memberName: "warn", 
      guildOnly: true, 
      args: [{ 
        key: "user", 
        prompt: "Which member do you want to warn?", 
        type: "string",  
        default: "" 
      }]  
    }
      )} 
  run(message, args) { 
    
    const userEmbed = new MessageEmbed() 
    .setAuthor("Wrong Usage") 
    .setDescription("Correct Usage: \`ml!warn <user>\`") 
    .setColor("YELLOW") 
    
    const user = message.mentions.users.first() 
    if(!user) { 
      return message.channel.send(userEmbed)
  } 
    if(!message.member.hasPermission("ADMINISTRATOR")) { 
       return message.channel.send("You don't have the required permissions. You need `ADMINISTRATOR` permission") 
    }  
    
   if(message.content.includes(`${message.guild.owner}`)) { 
      return message.say("I hope you're stupid, you can't warn the server owner")

      } 

      if(user === message.author) { 
        return message.say("You can't warn yourself -_-")

        } 
    const razon = message.content.split(" ").slice(2).join(" "); 
    if(!razon) { 
      return razon = "No reason"; 
      }
    
  
    if(message.member.hasPermission("ADMINISTRATOR")) { 
      
    const warnEmbed = new MessageEmbed() 
    .setTitle("Punishment System") 
    .setDescription(`**${user.username}** Has been warned | Reason: ***${razon}***`) 
    .setColor("BLUE") 
    .setTimestamp()
    .setFooter(`Warned by: ${message.author.username}`) 
    .setThumbnail(user.avatarURL({format: 'png', dynamic: true})) 
    
    return message.channel.send(warnEmbed) 
  }
 } 
}
       
