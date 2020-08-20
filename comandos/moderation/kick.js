const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class kickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      memberName: 'kick',
      group: 'moderation',
      description: 'Kick a user from server',
      guildOnly: true
    });
  }

  async run(message, client, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(
        'You Require `KICK MEMBERS` Permission to Execute this Command'
      );
    }

    let user = message.mentions.users.first();

    let reasonkick = message.content
      .split(' ')
      .slice(2)
      .join(' ');
    let guild = message.guild;
    let memberkick = message.guild.member;

    if (!user) {
      return message.channel.send('You need to mention someone to kick!');
    }

    if (!reasonkick) {
      reasonkick = 'No Reason Given';
    }

    if (!message.guild.member(user).kickable) {
      return message.channel.send(
        "That Member couldn't be kicked due to role hierarchy"
      );
    }

    message.guild.member(user).kick();

    let embed = new Discord.MessageEmbed()
      .setTitle('User Was Successfully Kicked')
      .setDescription(`${user.tag} was kicked by <@${message.author.id}>`)
      .addField(`Reason`, `${reasonkick}`)
      .setColor('RANDOM');
    message.channel.send(embed);

    let DmEmbed = new Discord.MessageEmbed()
      .setDescription(`You were Kicked from ${guild} for: ${reasonkick}`)
      .setColor('RANDOM');
    user.send(DmEmbed);
  }
};
