const Discord = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class SayCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "say", 
      group: "other", 
      memberName: "say", 
      description: "Says the message from author", 
      guildOnly: true, 
      args: [
        {
          key: 'args',
          prompt: 'What kind of word do you want to use?',
          type: 'string'
        }
      ] 
    } 
     )} 
      
  run(message, { args }) {  
    if(!message.member.hasPermission("ADMINISTRATOR")) { 
      return message.channel.send("You dont have `ADMINISTRATOR` permission to use this command")
    }  
    
    if(message.member.hasPermission("ADMINISTRATOR")) { 
      
  const embed = new Discord.MessageEmbed() 
  .setAuthor(`${message.author.username} Said`, `${message.author.avatarURL()}`) 
  .setDescription(`${args}`) 
  .setColor("ORANGE") 
  .setTimestamp() 
  
  message.delete() 
  return message.channel.send(embed) 
    }
  }
};