const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: ['q', 'queue'],
      group: 'music',
      memberName: 'queue',
      guildOnly: true,
      description: 'Display the song queue'
    });
  }

 async run(message) { 
    var channel = message.member.voice.channel; 
   if(!channel) { 
     return message.say("Please join in a voice channel") 
   }
    if (message.guild.triviaData.isTriviaRunning) { 
      return message.say('intente nuevamente después de terminar la trivia'); 
    }
    if (typeof message.guild.musicData.songDispatcher === 'undefined' || 
       message.guild.musicData.songDispatcher == null) {
      return message.say('There is nothing playing!');
    }  
   if(message.guild.musicData.songDispatcher) { 
    let queueEmbed = new MessageEmbed()
      .setColor('AQUA')
      .setAuthor(`Music Queue`, `${message.guild.iconURL()}`)
      .setTimestamp() 
      .setFooter(`Now Playing: ${message.guild.musicData.nowPlaying.title}`)
   queueEmbed.setDescription(
      `${message.guild.musicData.queue
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
  return message.say(queueEmbed);
  } 
 }
};
