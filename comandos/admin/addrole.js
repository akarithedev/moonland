const { MessageEmbed } = require('discord.js')  
const { Command } = require("discord.js-commando") 

module.exports = class addroleCommand extends Command { 
  constructor(client) {
    super(client, { 
      name: "addrole", 
      group: "admin", 
      description: "Give a role to a member", 
      memberName: "addrole", 
      guildOnly: true 
      })
    }; 
 
  async run(message, client, args) { 
    if(!message.member.hasPermission("MANAGE_ROLES")) { 
return message.channel.send("You're not allowed to use this command")

}

var user = message.mentions.members.first(); 

if(!user) { 
return message.channel.send("Please mention someone")

} 

let name = message.content.split(" ").slice(2).join(" ");
let { cache } = message.guild.roles; 
let role = message.mentions.roles.first(); 

if(!role) { 
return message.channel.send("Please mention a role to give")

}

// Define the role that you wanna give the users as role

if (message.guild.me.roles.highest.position < role.position) {
return message.channel.send("The role you are trying to give to someone is under me. Put me over the role!")

} 

await user.roles.add(role).then 
const embed = new MessageEmbed() 

.setTitle("AddRole System") 
.setDescription(`:white_check_mark: | Succesfully added ${role} role to ${user}`) 
.setColor("GREEN") 
.setFooter("Made by 👑 Maria2020 👑")
.setTimestamp() 

return message.channel.send(embed) 
process.exit(1);

 } 
};