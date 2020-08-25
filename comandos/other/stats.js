const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      memberName: 'stats',
      group: 'other',
      description: 'Get the stats of the bot',
      guildOnly: true
    });
  }

  run(message, client) {
    const embed = new Discord.MessageEmbed();
    embed.setThumbnail(message.client.user.avatarURL());
    embed.setAuthor('MoonLand 1.20.5');
    embed.setDescription('');
    embed.addField('Author', `Ana Maria & Eduard`);
    embed.addField('BOT ID', message.client.user.id);
    embed.addField('Owners', '<@662979119713353729>\n<@671449036494077967>');
    embed.addField('Owner IDs', `662979119713353729\n671449036494077967`);
    embed.addField('Default Prefix', 'ml!');
    embed.addField(
      'Music playing in',
      `${message.client.voice.connections.size} Servers`
    );
    embed.addField(
      'Bot Count',
      `${message.client.guilds.cache.size} Servers 
${message.client.users.cache.size} Members 
${message.client.channels.cache.size} Channels`
    );
    embed.addField('Library', 'Discord.js v12.2.0');
    embed
      .addField('Versions', 'Node 12.X on Linux 64 bit')
      .setColor('DARK_BLUE');
    message.channel.send(embed);
  }
};
