const { Command } = require('discord.js-commando');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Adjust song volume',
      throttling: {
        usages: 1,
        duration: 5 
  }, 
      args: [
        {
          key: 'wantedVolume',
          prompt: '¿Qué volumen te gustaría configurar? indique un número para configurar el volumen.',
          type: 'integer',
          validate: wantedVolume => wantedVolume >= 1 && wantedVolume <= 200
        }
      ]

    }); 
    
  }
  
  //MADE BY MARIA
  run(message, { wantedVolume }) { 
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) 
      return message.reply('únete a un canal de voz e intenta nuevamente'); 
    
    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('no hay canción para cantar ahora!');
    }  
    
    const volume = wantedVolume / 100; 
    message.guild.musicData.volume = volume; 
    message.guild.musicData.songDispatcher.setVolume(volume); 
    message.say({embed: {"title": "Music Volume!", "description": `Volume has been set to ${wantedVolume}%`, "color": "#00FFFF"}});
  }
};
