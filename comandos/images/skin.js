const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando")

module.exports = class skinCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "skin", 
      group: "images", 
      description: "Gets the skin of a Minecraft user", 
      memberName: "skin", 
      aliases: ["mcskin"], 
      guildOnly: true, 
      } 
    )}
  
 async run(message) { 
   const args = message.content.split(' ').slice(1);
    if(!args.length) { 
      return message.channel.send("Please give a minecraft username")
    }  
   
    message.channel.send({embed: { title: "👀 Searching..."}})
      const embed = new MessageEmbed() 
    embed.setTitle(`Here is the result`) 
    embed.setDescription(`[Download Skin](https://minotar.net/download/${args.join(" ")})`)
    embed.setImage(`https://minotar.net/armor/body/${args.join(" ")}/490.png`)
    embed.setTimestamp() 
    embed.setFooter(`Requested by ${message.author.tag}`)
    embed.setColor("RANDOM")
  message.channel.send(embed) 
  }
};