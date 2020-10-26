const { Command } = require('discord.js-commando')
const Discord = require('discord.js')  
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority");


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
       const statusname = args.join(" "); 
          if(!statusname) {
              return message.channel.send("Please give a name for status")
            }

 db.set("status", statusname).then
 await message.channel.send(`Status has been changed to \`${statusname}\``)
    process.exit(1);
            //ONLY BOT OWNER
        

  }
   };
