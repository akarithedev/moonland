const { Command } = require("discord.js-commando");
const { Random } = require("something-random-on-discord") 
const random = new Random(); 

module.exports = class neko extends Command { 
  constructor(client) { 
    super(client, { 
      name: "neko", 
      description: "get some neko images xD", 
      memberName: "neko", 
      group: "images",
      guildOnly: true 
    }
    )} 
  async run(message, client, args) { 
    
    let data; 
    try { 
      await random.getNeko()
    message.channel.send(data) 
    } catch(e) { 
      console.error(e)
      message.channel.send("An error occured while running this command") 
    }
  }
  
}