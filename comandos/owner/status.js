const { Command } = require('discord.js-commando')
const Discord = require('discord.js') 
const db = require('quick.db') 
const { prefix } = require("../../config.json")
module.exports = class StatusCommand extends Command {
    constructor(client) {
        super(client, {
            name:"status",
            aliases: ["set-status"],
            group: 'owner',
            memberName: 'status',
            description: 'This command change the bot status.',
            ownerOnly: true, 
            format: 'status {status}',
            guildOnly: true,   
          
        }
   )} 
  
     async run(message) { 
          const args = message.content.split(' ').slice(1);
       //ARGUMENT
          if(!args.length) {
              return message.channel.send("Please give a name for status")
            }

db.set(`status`, args.join(" ")).then
 await message.channel.send(`Status has been changed to \`${args.join(" ")}\``)
    process.exit(1);
            //ONLY BOT OWNER
            
  }
   };
