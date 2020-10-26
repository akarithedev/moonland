const { MessageEmbed } = require("discord.js")
const { Command } = require("discord.js-commando") 
module.exports = class uptimeCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "uptime", 
      group: "info", 
      memberName: "uptime", 
      description: "Temporary bans a user", 
      guildOnly: true
      })

    };

  async run(message, args) { 
    
  function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
    } 
    
const embed = new MessageEmbed() 
.setTitle("I Have Been Online For:") 
.setDescription(`\`${duration(this.client.uptime)}\``) 
.setColor("GREEN") 
message.channel.send(embed)
    }
  };