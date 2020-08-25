const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 
const config = require("../../config.json")
module.exports = class embedCommand extends Command { 
constructor(client) { 
super(client, { 
name: "embed", 
description: "make an embedded message", 
memberName: "embed", 
group: "admin", 
guildOnly: true, 
    
         
  });
} 

async run(message, client) { 
  const prefix = config.prefix; 
  
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
if(!message.member.hasPermission("ADMINISTRATOR")) { 
return message.channel.send("You don't have permissions to use this command")

}

const channel = message.mentions.channels.first(); 

if(!channel) { 
return message.channel.send("Please mention a channel") 

} 
  
  const description = args.splice(2).join(" ");
  
  if(!description) { 
    return message.say("No description?..., Please provide a description");
   } 
  
 const embed = new MessageEmbed() 
 .setTitle("")
 .setDescription(`${description}`) 
 .setColor("RANDOM") 
 .setTimestamp() 
 .setFooter(`Embedded by ${message.author.tag}`)

 const embedChannel = message.guild.channels.cache.get(channel.id);
 embedChannel.send(embed); 

 }
};