const Discord = require("discord.js")
const { Command } = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      memberName: 'invite', 
      aliases: ['support'],
      group: 'other',
      description: 'Get the invite link of the bot',
      guildOnly: true
  }
   )}
      
  run(message) {
       const embed = new Discord.MessageEmbed()
    embed.setTitle("Support") 
    embed.setDescription("**INVITE LINK -** [MoonLand Bot](https://discord.com/api/oauth2/authorize?client_id=713367500427100210&permissions=2147483639&scope=bot)\n**Support Server -** [MoonLand Bot Support](https://discord.gg/xpCzK9X)\n**Website -** coming soon")
    embed.setColor("#00ff00")
    
    message.channel.send(embed);
    
  }
};