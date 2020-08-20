const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 

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
if(!message.member.hasPermission("ADMINISTRATOR")) { 
return message.channel.send("You don't have permissions to use this command")

}

const channel = message.mentions.channels.first(); 

if(!channel) { 
return message.channel.send("Please mention a channel") 

} 
  
  const description = message.content.split(" ").slice(2).join(" ");
  
  if(!description) { 
    return message.say("Please set a description")
    } 
  
 const embed = new MessageEmbed() 
 .setTitle("Embed")
 .setDescription(`${description}`) 
 .setColor("RANDOM") 
 .setTimestamp() 
 .setFooter(`Embedded by ${message.author.tag}`)

 const embedChannel = message.guild.channels.cache.get(channel.id);
 embedChannel.send(embed); 

 }
};