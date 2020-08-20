const Discord = require("discord.js")
const { Command } = require('discord.js-commando');
const { stripIndents } = require("common-tags")
const { prefix } = require("../../config.json")
module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      memberName: 'help',
      group: 'help',
      description: 'Get commands help',
      guildOnly: true,
  } 
   )}

  run(message, args) { 
    
       const embed = new Discord.MessageEmbed() 
    embed.setThumbnail(this.client.user.avatarURL());
    embed.setAuthor("MoonLand Bot Help")
    embed.setDescription(`Comandos disponibles para ${this.client.user.username}\nThe bot prefix is: **${prefix}**\nTotal Commands: [\`${this.client.registry.commands.size}\`]`) 
    embed.addField("❯ Owner", "`eval`, `reload`, `load`, `unload`, `enable`, `disable`, `status`, `blacklist`, `restart`") 
    embed.addField("❯ Administrator", "`welcome`, `goodbye`, `addrole`, `embed`, `set-logs`") 
    embed.addField("❯ Economy", "`work`, `balance`, `daily`") 
    embed.addField("❯ Fun", "`marry`" )
    embed.addField("❯ Images", "`google`, `skin`") 
    embed.addField("❯ Moderation", "`warn`, `clear`, `voicekick`, `kick`, `mute`, `tempban`") 
    embed.addField("❯ Info","`ping`, `userinfo`, `serverinfo`, `uptime`")
    embed.addField("❯ Other", "`invite`, `stats`, `avatar`, `say`, `suggestion`") 
    embed.addField("❯ Music", "`play`, `leave`, `pause`, `resume`, `skip`, `queue`, `volume`, `join`, `stream`") 
    embed.setFooter('Made with ❤️ by Maria Queen and her boyfriend', `https://cdn.discordapp.com/avatars/662979119713353729/323344199cd695407089e5edca8a9c79.png?size=2048`);
    embed.setColor("#B30AB6")  
    embed.setTimestamp()
    return message.channel.send(embed) 
     
    
   } 
};
  
   