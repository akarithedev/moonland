const Discord = require("discord.js")
const { Command } = require('discord.js-commando');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority"
);
const { default_prefix } = require("../../config.json")
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

 async run(message, args) { 
    let prefix = default_prefix;
       const embed = new Discord.MessageEmbed() 
    embed.setThumbnail(this.client.user.avatarURL());
    embed.setAuthor("MoonLand Bot Help")
    embed.setDescription(`Comandos disponibles para ${this.client.user.username}\nThe bot prefix is: **${prefix}**\nTotal Commands: [\`${this.client.registry.commands.size}\`]`) 
    embed.addField("❯ Owner", "`eval`, `reload`, `load`, `unload`, `enable`, `disable`, `status`, `blacklist`") 
    embed.addField("❯ Administrator", "`welcome`, `goodbye`, `addrole`, `set-logs`") 
    embed.addField("❯ Economy", "`work`, `balance`") 
    embed.addField("❯ Fun", "`marry`" )
    embed.addField("❯ Images", "`google`, `skin`, `neko`") 
    embed.addField("❯ Moderation", "`warn`, `clear`, `voicekick`, `kick`, `mute`, `tempban`") 
    embed.addField("❯ Info","`ping`, `userinfo`, `serverinfo`, `uptime`")
    embed.addField("❯ Other", "`invite`, `stats`, `avatar`, `say`, `suggestion`") 
    embed.addField("❯ Music", "`play`, `leave`, `pause`, `resume`, `skip`, `queue`, `volume`, `join`, `stream`, `nowplaying`, `lyrics`, `stop`")
    embed.setFooter('Made with ❤️ by Maria2020', `https://cdn.discordapp.com/avatars/662979119713353729/bcd894e42c0a58f409eaaf0cb6e2f0bc.png?size=2048`);
    embed.setColor("#B30AB6")  
    embed.setTimestamp()
    return message.channel.send(embed) 
     
    
   } 
};
  
   