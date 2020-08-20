const Discord = require("discord.js") 
const db = require("quick.db") 
const ms = require("parse-ms")
const { Command } = require("discord.js-commando") 
module.exports = class DailyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'daily',
      memberName: 'daily',
      group: 'economy',
      description: 'work for a job and ge 💰',
      guildOnly: true,
  } 
   )}

 async run(message, client, args) { 
   let user = message.author;
    let timeout = 86400000
    
    let daily = await db.fetch(`daily_${message.author.id}`)
    
    if(daily !== null && timeout - (Date.now() - daily) >0) {
      
      let time = ms(timeout - (Date.now() - daily));
      
      let timeEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle("Timeout")
      .setDescription(`:x: You have already claimed your daily reward\n\n**❯ Try again in: ${time.hours}hours ${time.minutes}min and ${time.seconds}sec** `)
      .setTimestamp()
      
      message.channel.send(timeEmbed)
      
    } else { 
      let amount = 1000
      
      let embed1 = new Discord.MessageEmbed()
      .setColor(message.member.displayHexColor)
      .setAuthor(user.username, user.avatarURL({dynamic: true}))
      .setDescription(`❯ You have claimed ${amount} coins`)
      .setFooter(`Requested by: ${message.author.tag}`)
      .setTimestamp() 
      
      message.channel.send(embed1)
  db.add(`credits_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
      
    }
   } 
};