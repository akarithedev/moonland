const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold'],
      memberName: 'pause',
      group: 'music',
      description: 'Pause the current playing song',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Únete a un canal de voz e intenta de nuevo');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('No hay cancion para cantar');
    }

    message.say({embed: {"title": "Music Paused!", "description": "The song has stopped ⏸️", "color": "#ff0000"}})

    message.guild.musicData.songDispatcher.pause();
  }
};
