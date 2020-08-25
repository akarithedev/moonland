const Discord = require("discord.js") 
const { Command } = require("discord.js-commando") 
module.exports = class marryCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "marry", 
      group: "fun", 
      memberName: "marry", 
      description: "This command is only for fun", 
      aliases: ["ship", "love"], 
      guildOnly: true 
    })
  }; 
  
  async run(message, args) { 
  
    const user = message.mentions.members.first() 
    if(!user) { 
      return message.channel.send("Please mention someone")
    } 
    if(user.id == message.author.id) { 
      return message.say("You can't marry yourself LOL")
      }
    
    let replies = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
    let result = Math.floor((Math.random() * 1000));
    const embed = new Discord.MessageEmbed() 
   .setTitle("❤️ Marry Command ❤️") 
   .setColor("BLUE") 
   .setTimestamp() 
   .setDescription(`${message.author} loves ${user} ${result}%`)
  
    message.channel.send(embed)
  }
}