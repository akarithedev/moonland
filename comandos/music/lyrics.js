const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const genius = require("genius-lyrics") 
const Genius = new genius.Client("4lYImPjtmX5SZG3U2qoQXeANus9CrB7RXQdUF4RVMZtfZA-O1Rc0IAGqGIq1Ba1x");  
const { Command } = require("discord.js-commando"); 

module.exports = class lyricsCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "lyrics", 
      description: "Get lyrics of given song", 
      memberName: "lyrics", 
      group: "music", 
      guildOnly: true 
    }) 
  }; 
 async run(message, client) {  
      
    const args = message.content.split(" ").slice(1);  
    
let name; 
   try { 
     name = args.join(" "); 
    if(!name) { 
    return message.say("Please provide a song name")
    } 
  
 const embed1 = new MessageEmbed() 
   .setDescription(`\📀 | Searching lyrics for \`${name}\``) 
   .setColor(Color) 

   const msg = await message.channel.send(embed1); 
    
   const searches = await Genius.songs.search(name, {limit: name}); 
   const song = searches[0]; 
     console.log(song)
   song.lyrics().then(lyrics => { 

   const embed2 = new MessageEmbed() 
   .setTitle(`Lyrics for ${song.title} - Artist: ${song.artist.name}`) 
   .setColor(Color) 
   .setDescription(lyrics.length > 1900 ? `${lyrics.substr(0, 1900)}...` : lyrics)
   .setThumbnail(song.thumbnail)
   .setFooter("Lyrics provided by genius-lyrics") 
  return msg.edit(embed2) 
   }); 
 
     
   } catch(e) { 
     const error = new MessageEmbed() 
    .setDescription(`${e}`)
   message.say(error)
   }; 
 }
};
