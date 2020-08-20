const Discord = require('discord.js') 
const { Command } = require('discord.js-commando')
const ws = require("ws")
module.exports = class PingCommand extends Command { 
  constructor(client) {
    super(client, { 
      name: "ping", 
      aliases: ["pong"],
      group: "info", 
      memberName: "ping",
      description: "Get the ping of the bot", 
      guildOnly: true, 
     
} 
 )} 
  
  run(message, client, args) { 
    
     message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp

        const embed = new Discord.MessageEmbed() 
        .addField(`🤖 Bot Latency`, `\`${ping}\``) 
        .addField(`🌐 API Latency`, `\`${message.client.ws.ping}ms\``) 
        .setColor("GREEN")
        m.edit(embed) 
     })
  } 
};
 
