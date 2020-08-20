const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class muteCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "mute", 
      group: "moderation", 
      memberName: "mute", 
      description: "mute the member who obey the rules", 
      guildOnly: true 
      })
    }; 
 
  
  async run(message, client, args) { 
    var user = message.mentions.members.first();
    const reason = message.content.split(" ").slice(2).join(" "); 

    if(!message.member.hasPermission("MANAGE_ROLES")) { 
      return message.channel.send("You dont have permissions to use this command");
      }  
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) { 
      return message.channel.send("I can't mute this member");
      } 
    if(user === message.guild.me) { 
      return message.channel.send("You can't mute me LOL");
      }
 
    if(!user) { 
      message.channel.send("Please mention someone for me to mute");
  }  
  
  
     if(user.id == message.author.id) { 
        return message.channel.send("You can't mute yourself -_-");
        }
      
    if(user.roles.highest.position >= message.member.roles.highest.position) {
			return message.channel.send("That user is a mod/admin. I can't do that");

		} 
    
    if(user.id == message.guild.owner.id) { 
   return message.channel.send("I hope you're stupid, you can't mute the server owner");
      
    } 
    
    const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
    
    if(!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]

      })

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false

        });
      });

    } catch(e){
      console.error(e);
    }
  } 
    if(!reason) { 
      reason = "No reason given";
      } 
    
    
       
     await user.roles.add(muterole.id).then
 
     const embed = new MessageEmbed() 
      .setTitle("User Was Successfully Muted") 
      .setDescription(`**<@${user.id}>** has been muted | reason: ${reason}`) 
      .setColor("RED") 
      .setTimestamp() 
      
      return message.channel.send(embed) 
      
      process.exit(1);
    }
  };