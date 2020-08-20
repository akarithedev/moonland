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

  run(message) {
    if (message.guild.triviaData.isTriviaRunning)
      return message.say('intente nuevamente después de terminar la trivia');
    if (message.guild.musicData.queue.length == 0)
      return message.say('no hay canciones en la cola!');
    const titleArray = [];
    message.guild.musicData.queue.map(obj => {
      titleArray.push(obj.title);
    });
    var queueEmbed = new MessageEmbed()
      .setColor('AQUA') 
      .setAuthor(`Music Queue`, `${message.guild.iconURL()}`) 
      .setTimestamp() 
      .setFooter(`Requested by ${message.author.tag}`)
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.addField(`${i + 1}: ${titleArray[i]}`, `\u200b`);
    }
    return message.say(queueEmbed);
  }
};


