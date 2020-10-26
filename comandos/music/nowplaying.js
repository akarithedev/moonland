const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class nowplayingCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: 'nowplaying', 
      group: 'music', 
      memberName: 'nowplaying', 
      aliases: ['np', 'current'], 
      description: 'shows the current song', 
      guildOnly: true
    })
  } 
  
  async run(message, bot, args) { 
    var voiceChannel = message.member.voice.channel; 
    if(!voiceChannel) { 
      return message.reply("Please join in a voice channel first") 
    }
     
    const serverQueue = message.guild.musicData.nowPlaying; 
    
    if(!serverQueue) { 
      return message.say("There is nothing playing") 
    } 
    if(serverQueue) { 
    let embed = new MessageEmbed() 
    .setAuthor("Now Playing", "https://images.discordapp.net/avatars/590948209925423123/254bb38dd757bf143f5f43c94ab63768.png?size=512") 
    .setDescription(`[${serverQueue.title}](${serverQueue.url})`) 
    .setThumbnail(serverQueue.thumbnail)
    .setColor("RANDOM") 
    .setTimestamp() 
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
   return message.channel.send(embed)
    }
  }
}