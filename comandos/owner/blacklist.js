const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database(
  "mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority"
);
module.exports = class blacklistCommand extends Command {
  constructor(client) {
    super(client, {
      name: "blacklist",
      aliases: ["block"],
      group: "owner",
      memberName: "blacklist",
      description: "This command change the bot status.",
      ownerOnly: true,
      format: "blacklist <@user>",
      guildOnly: true
    });
  }
  async run(message, args) {
    const ownerid = ["662979119713353729", "557112105275228161"];
    const user = message.mentions.users.first();
    if (!user) return message.reply("Please mention someone!");
    if (message.content.startsWith(ownerid)) {
      return message.say("I can't blacklist my creators");
    }
    let blacklist = await db.fetch(`blacklist_${user.id}`);

    if (blacklist === "Not") {
      db.set(`blacklist_${user.id}`, "Blacklisted");
      let embed = new Discord.MessageEmbed()
        .setDescription(`${user} has been blacklisted!`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Blacklisted by ${message.author.username}`);
      message.channel.send(embed);
    } else if (blacklist === "Blacklisted") {
      db.set(`blacklist_${user.id}`, "Not");
      let embed = new Discord.MessageEmbed()
        .setDescription(`The blacklist for ${user} Has been removed!`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(`Removed by ${message.author.username}`);
      message.channel.send(embed);
    } else {
      db.set(`blacklist_${user.id}`, "Not");
      let embed = new Discord.MessageEmbed()
        .setDescription(`Set up data for ${user}!`)
        .setColor("PURPLE")
        .setTimestamp();
      message.channel.send(embed);
    }
  }
};
