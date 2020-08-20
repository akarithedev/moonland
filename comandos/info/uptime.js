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
    
  const moment = require("moment");
require("moment-duration-format");

const duration = moment.duration(this.client.uptime).format(" d [days], h [hours], m [minutes], s [seconds]");

const embed = new MessageEmbed() 
.setTitle("I Have Been Online For:") 
.setDescription(`\`${duration}\``) 
.setColor("GREEN") 
message.channel.send(embed)
    }
  };