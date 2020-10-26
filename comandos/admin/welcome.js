const Discord = require("discord.js") 
const { Database } = require("quickmongo");
const db = new Database(
  "mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority"
); 
const { Command } = require("discord.js-commando") 

module.exports = class welcomeCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "welcome", 
      description: "sets the welcome channel", 
      memberName: "welcome", 
      group: "admin",
      guildOnly: true
    }
     )} 
  
  async run(message, bot, args) { 

    
    const perm = message.member.hasPermission("ADMINISTRATOR")
  if(!perm) { 
    return message.channel.send("You need `ADMINISTRATOR` permission to use this command.") 
  }  
    const channel = message.mentions.channels.first()
    if(!channel) {
      const usageEmbed = new Discord.MessageEmbed() 
      .setTitle("Wrong Usage") 
      .setDescription("Correct usage: \`ml!welcome #channel\`") 
      .setColor("RED") 
      .setTimestamp()
      return message.channel.send(usageEmbed)
    } 
    const channelid = channel.id;
    
    db.set(`welchannel_${message.guild.id}`, channelid).then
      const welChannel = new Discord.MessageEmbed() 
      .setTitle("Welcome System") 
      .setDescription(`Welcome channel has been set to ${channel}`) 
      .setColor("YELLOW") 
      .setTimestamp() 
      await message.channel.send(welChannel) 
      process.exit(1)
    
  }
};
       