const Discord = require("discord.js") 
const { Command } = require("discord.js-commando") 
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority");

module.exports = class goodbyeCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "goodbye", 
      description: "sets the global-chat channel", 
      memberName: "goodbye", 
      group: "admin", 
      aliases: ["set-goodbye"],
      guildOnly: true
    }
     )} 
  
  async run(message, bot, args) { 

    
    const perm = message.member.hasPermission("ADMINISTRATOR")
  if(!perm) { 
    return message.channel.send("You need `ADMINISTRATOR` permission to use this command.") 
  }  
    const channel = message.mentions.channels.first();
    if(!channel) {
      const usageEmbed = new Discord.MessageEmbed() 
      .setTitle("Wrong Usage")
      .setDescription("Correct usage: \`ml!goodbye #channel\`") 
      .setColor("RED") 
      .setTimestamp()
      return message.channel.send(usageEmbed)
    }   
    const channelid = channel.id;
    
    db.set(`goodbye_${message.guild.id}`, channelid).then
      const gbChannel = new Discord.MessageEmbed() 
      .setTitle("GoodBye System") 
      .setDescription(`GoodBye Channel has been set to ${channel}`) 
      .setColor("BLUE") 
      .setTimestamp() 
      return message.channel.send(gbChannel) 
      process.exit(1)
    
  }
};
       