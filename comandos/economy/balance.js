const Discord = require("discord.js") 
const db = require("quick.db") 
const ms = require("parse-ms")
const { Command } = require("discord.js-commando") 
module.exports = class BalanceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'balance',
      memberName: 'balance',
      group: 'economy', 
      aliases: ["bal"],
      description: 'get the balance of a user',
      guildOnly: true,
  } 
   )}

 async run(message, client, args) { 
   let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`credits_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;
  
  let moneyEmbed = new Discord.MessageEmbed()
  .setColor(`BLUE`)
  .setFooter(`Requested by: ${message.author.tag}`)
  .setTimestamp()
  .setAuthor(`${user.username}'s Balance`)
  .setDescription(`**❯ Pocket:** ${bal}\n**❯ Bank:** ${bank}`);
  message.channel.send(moneyEmbed)
 } 
};
   