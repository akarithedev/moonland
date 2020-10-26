 const { Command } = require("discord.js-commando") 
 const { MessageEmbed } = require("discord.js") 
 
 const { Database } = require("quickmongo");
 const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority");
//dont remove the url i am not doing , ok hmm

module.exports = class setlogsCommand extends Command { 
  constructor(client) {
    super(client, { 
      name: "setlogs",  
      group: "admin", 
      description: "setthe logs ", 
      memberName: "setlogs", 
      aliases: ["set-logs"],
      })
    };
  
  async run(message, client, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) { 
       
    return message.say("You dont have permissions to use this command")
  }  
    
    const channel = message.mentions.channels.first(); 
    
    if(!channel) { 
      return message.say("Please set the logs channel")
    }
    const channelid = channel.id;
    db.set(`logs_${message.guild.id}`, channelid).then 
    const embed = new MessageEmbed() 
    .setAuthor("Logs System") 
    .setDescription(`Logs channel has been to ${channel}`) 
    .setColor("#ff2025") 
    .setTimestamp() 
    await message.channel.send(embed) 
    process.exit(1);
  }
};