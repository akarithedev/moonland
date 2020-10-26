const{ MessageEmbed } = require("discord.js")
const { Command } = require("discord.js-commando") 
const ytdl = require("ytdl-core")
module.exports = class streamCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "stream", 
      group: "music",
      memberName: "stream", 
      aliases: ["pvi"], 
      description: "plays a stream link =)", 
      guildOnly: true 

      }

    )}; 

  

  async run(message) { 
    const args = message.content.split(" ").slice(1); 
    var voiceChannel = message.member.voice.channel; 

    if(!voiceChannel) {
      return message.reply("You need to be in a voice channel to use this command")

    }  

    if(!message.guild.me.hasPermission("CONNECT")) { 
      return message.say("I don't have permission to join the voice channel")

      } 

 
if(!args.length) { 
  return message.say("Please provide a stream link")
  } 
  if(args.join("") === "https://youtube.com/" || "https://www.youtube.com/") { 
    return message.say("Not available")
    }
const channel = this.client.channels.cache.get(voiceChannel.id);
  channel.join().then(connection => {

const broadcast = this.client.voice.createBroadcast();
const dispatcher = broadcast.play(args.join(" ")); 

// Play "music.mp3" in all voice connections that the client is in
for (const connection of this.client.voice.connections.values()) {
  connection.play(broadcast);

}

    const joinEmbed = new MessageEmbed() 
      .setTitle("Radio") 
      .setDescription(`📻 Started Playing: ${args.join(" ")}`)
      .setColor("#2025") 
      .setTimestamp()

        message.channel.send(joinEmbed) 

 }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e); 
    message.say("Something went wrong");

  }); 

    }

  };