const { Command } = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name:"avatar",
            aliases: ["av"],
            group: 'other',
            memberName: 'avatar',
            description: 'Sends the avatar of a user.',
        
        })
    }
   async run(message, args) { 
      
        const usario = message.mentions.users.first() || message.author;
        const embed = new Discord.MessageEmbed() 
        embed.setTitle("") 
        embed.setAuthor(`${usario.username}`)
        embed.setImage(usario.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }));
        embed.setColor("#00b4ff") 
        
        message.channel.send(embed);
    
    }
};