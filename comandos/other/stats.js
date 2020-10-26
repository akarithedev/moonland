const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority"); 
const { default_prefix } = require("../../config.json")
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

  async run(message) { 
    let prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix; 
    
    const embed = new Discord.MessageEmbed();
    embed.setThumbnail(this.client.user.avatarURL());
    embed.setAuthor('MoonLand 1.20.5');
    embed.setDescription('');
    embed.addField('Author', `Ana Maria & Priyanshu`);
    embed.addField('BOT ID', this.client.user.id);
    embed.addField('Owners', '<@764817986968092712>\n<@557112105275228161>');
    embed.addField('Owner IDs', `764817986968092712\n557112105275228161`);
    embed.addField('Default Prefix', 'ml!');
    embed.addField(
      'Music playing in',
      `${this.client.voice.connections.size} Servers`
    );
    embed.addField(
      'Bot Count',
      `${this.client.guilds.cache.size} Servers 
${this.client.users.cache.size} Members 
${this.client.channels.cache.size} Channels`
    );
    embed.addField('Library', 'Discord.js v12.2.0');
    embed
      .addField('Versions', 'Node 12.X on Linux 64 bit')
      .setColor('DARK_BLUE');
    message.channel.send(embed);
  }
};
