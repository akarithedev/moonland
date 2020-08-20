const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip', 's'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song',
      guildOnly: true
    });
  }
  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('únete a un canal de voz e intenta nuevamente');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) 
      return message.reply('no hay canción para cantar ahora!');

    message.guild.musicData.songDispatcher.end(); 
    message.say({embed: {"title": "Music Skipped!", "description": "Thank you **1 users** for voting!", "color": "#00ff00"}})
  }
};
