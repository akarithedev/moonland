const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = class stopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      group: "music",
      memberName: "stop",
      guildOnly: true,
      description: "Leaves voice channel if in one"
    });
  }

 async run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply("You have to be in a voice channel");
  
   if (typeof message.guild.musicData.songDispatcher === 'undefined' || 
       message.guild.musicData.songDispatcher == null) {
      return message.say('There is nothing playing!');
    } 
      const channel = this.client.channels.cache.get(voiceChannel.id);
      
   if(voiceChannel) { 
  channel.leave();
  message.guild.musicData.songDispatcher.end(); 
  const embed = new MessageEmbed() 
  .setColor("BLUE") 
  .setDescription(`🛑 Left ${channel.name}, bye`)
  .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true})) 
  .setTimestamp() 
  return message.channel.send(embed)
  } 
  }
};