const Discord = require("discord.js") 
const { Command } = require("discord.js-commando") 
module.exports = class SuggestionCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "suggestion", 
      group: "other", 
      memberName: "suggestion", 
      description: "sends a suggestion to a specific channel",
      guildOnly: true, 
      aliases: ["suggest", "st"],
      args: [{
             
        key: 'args',
        prompt: "What kind of suggestion do you want to suggest?",
        type: 'string', 
        default: ""
        
    } 
     ]}
       )}
          
  async run(message, { args }) {  
    
    // reasoning definition
    if(!args) {
      return message.channel.send(`Please provide a suggestion!`)
    }
    // grab reports channel
  const sChannel = message.guild.channels.cache.find(channel => channel.name === "suggestions");
      if(!sChannel) {
        return message.channel.send("You don't have a channel with name `suggestions`") 
      }
    // send to reports channel and add tick or cross  
    message.channel.send("Your suggestion has been submitted.")
    const suggestembed = new Discord.MessageEmbed()
      .setFooter("Yes or not?. it's your choice")
      .setTimestamp() 
      .setThumbnail(`${message.author.avatarURL({format: 'png', dynamic: true})}`)
      .setDescription(`**❯ Author:** ${message.author.tag}\n\n**❯ Suggestion:** \`${args}\``)
      .setColor('DARK_GREEN');
    sChannel.send(suggestembed).then(async msg => {
      await msg.react("✅");
      await msg.react("❌"); 
    });
  } 
}
