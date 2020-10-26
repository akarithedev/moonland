const Discord = require('discord.js') 
const { Command } = require('discord.js-commando')

module.exports = class UserinfoCommand extends Command { 
  constructor(client) {
    super(client, { 
      name: "userinfo", 
      aliases: ["ui"],
      group: "info", 
      memberName: "userinfo",
      description: "Get info about user or author", 
      guildOnly: true,
      
      })
    }
  
    async run(message) {
  function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
      
  const usario = message.mentions.users.first() || message.author;
      
      const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline"
      } 
      
      const embed = new Discord.MessageEmbed()
        embed.setColor("BLUE")
        embed.setTitle("")
        embed.setThumbnail(usario.displayAvatarURL({format: 'png', dynamic: true }))
        embed.setAuthor(`❯ Profile of ${usario.username}`) 
        embed.addField("❯ Full Username", `${usario.username}#${usario.discriminator}`, true)
        embed.addField("❯ ID", `${usario.id}`, true) 
        embed.addField("❯ BOT", usario.bot || `false`, true)
        embed.addField("❯ Nickname", message.guild.member(usario.id).nickname || `No nickname`, true)
        embed.addField("❯ Status", `${status[usario.presence.status]}`, true) 
        embed.addField("❯ Activity", usario.presence.activities[0]|| `None`, true)
        embed.addField("❯ User Flags", "" + usario.flags.toArray().join(", ") || `None`, true) 
        embed.addField("❯ Roles", message.guild.member(usario).roles.cache.map(r => r) || `None`, true)
        embed.addField("❯ Joined Discord At", `${usario.createdAt.toUTCString().substr(0, 16)}`, true) 
        embed.setFooter(`Requested by ${message.author.tag} `, `${message.author.displayAvatarURL({dynamic: true})}`)
        embed.setTimestamp(Date.now())

    message.channel.send(embed);
  }
}