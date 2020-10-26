const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "leave",
      aliases: ["end", "disconnect"],
      group: "music",
      memberName: "leave",
      guildOnly: true,
      description: "Leaves voice channel if in one"
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply("únete a un canal de voz e intenta nuevamente");

    if (voiceChannel) {
      const channel = this.client.channels.cache.get(voiceChannel.id);

      channel.leave();
      message.channel.send({
        embed: {
          title: "Player Stopped!",
          description: "Successfully left the voice channel",
          color: "#FF000"
        }
      });
    }
  }
};
//made by Maria 2020
