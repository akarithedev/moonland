const Discord = require("discord.js") 
const db = require("quick.db") 
const ms = require("parse-ms")
const { Command } = require("discord.js-commando") 
module.exports = class WorkCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'work',
      memberName: 'work',
      group: 'economy',
      description: 'work for a job and ge 💰',
      guildOnly: true,
  } 
   )}

 async run(message, client, args) { 
   let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 3600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        
        .setColor("RED")     
        .setTimestamp()    
        .setAuthor("Timeout")
        .setDescription(`:x: You have already worked\n\n**❯ Try again in ${time.minutes}min and ${time.seconds}sec** `);        
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic', 'Police Officer', 'Bot Developer', 'Discord Trust And Safety Admin', 'Memer', 'Theif', 'Robber', 'Medic', 'Firefighter', 'Dish washer']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`:white_check_mark: **You worked as a ${replies[result]} and earned ${amount} coins**`)
        .setTimestamp()
        .setAuthor("Work Command");
        message.channel.send(embed1)
        
        db.add(`credits_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };  
 }
}