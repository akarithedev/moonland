const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Resume the current paused song',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('únete a un canal de voz e intenta nuevamente');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('no hay cancion para cantar!');
    }

    message.say({embed: {"title": "Music Resumed!", "description": "The song has been resumed ▶️", "color": "#00ff00"}})

    message.guild.musicData.songDispatcher.resume();
  }
};
