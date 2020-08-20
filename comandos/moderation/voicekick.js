const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class voicekickCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "voicekick", 
      group: "moderation", 
      description: "delete the messages", 
      memberName: "voicekick", 
      aliases: ["voice-kick"], 
      guildOnly: true 
    })
  }; 
  
  async run(message, args) { 
    const embed = new MessageEmbed() 
    embed.setColor("#ff2025")
    if (!message.member.hasPermission("ADMINISTRATOR")) { 
      return message.channel.send(embed.setAuthor(
        "You Don't Have Proper Permissions To Use This Command!"
      )); 
    } 
    
  const member = new MessageEmbed()
 member.setColor("#ff2025")
    if (!message.mentions.members.first()) {
      return message.channel.send(member.setAuthor(
        `Please Mention User That You Want To Kick From Voice Channel!`
      )); 
    }
    
    const channelError = new MessageEmbed()

    let { channel } = message.mentions.members.first().voice;

    if (!channel) { 
      return message.channel.send(channelError.setAuthor(`User Is Not In Any Voice Channel!`));
 channelError.setColor("#ff2025") 
    } 
    
    const memberKick = new MessageEmbed() 
    memberKick.setColor("GREEN")
    message.mentions.members.first().voice.kick();
    
    message.channel.send(memberKick.setAuthor(`User Has Been Kicked From Voice Channel!`))
  }
};
