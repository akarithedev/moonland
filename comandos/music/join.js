const Discord = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class JoinCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "join",
      group: "music", 
      description: "Join in a voice channel", 
      memberName: "join", 
      aliases: ["join-vc"], 
      guildOnly: true 
      
    }
     )}

  run(message) { 
    var voiceChannel = message.member.voice.channel; 
    if(!voiceChannel) {
      return message.reply("You need to be in a voice channel to use this command")
    }  
    if(!message.guild.me.hasPermission("CONNECT")) { 
      return meddage.say("I don't have permission to join the voice channel")
      } 
        
const channel = this.client.channels.cache.get(voiceChannel.id);
 

  channel.join().then(connection => {

    // Yay, it worked!

    const joinEmbed = new Discord.MessageEmbed() 
      .setTitle("") 
      .setDescription("Successfully joined the voice channel ✅")
      .setColor("#00FFFF")

        message.channel.send(joinEmbed)
    
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);

  });
    
  
  }
}