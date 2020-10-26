const { MessageEmbed } = require("discord.js") 
const { Command } = require("discord.js-commando") 

module.exports = class serverinfoCommand extends Command { 
  constructor(client) { 
    super(client, { 
      name: "serverinfo", 
      group: "info", 
      memberName: "serverinfo", 
      description: "Gets info of the server", 
      aliases: ["si"], 
      guildOnly: true 
    })
  }
  
  async run(message, client, args) {
    let region = { 
      "europe": ":flag_eu: Europe", 
      "india": "🇮🇳 India",
      "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    } 
    const bot = this.client; 
    let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id){
            return bot.emojis.cache.get(id).toString()
        }
        message.guild.emojis.cache.forEach(emoji => {
            OverallEmojis++;
            if(emoji.animated) {
                Animated++;
                EmojisAnimated+=Emoji(emoji.id)
            }else {
                EmojiCount++;
                Emojis+=Emoji(emoji.id)
            }
        }) 

  
   const embed = new MessageEmbed() 
   .addField("❯ Server Name", `${message.guild.name}`, true) 
   .addField("❯ Server ID", message.guild.id, true) 
   .addField("❯ Owner", message.guild.owner.user.tag, true) 
   .addField("❯ Region", region[message.guild.region], true) 
   .addField("❯ Verification Level", message.guild.verificationLevel, true) 
   .addField("❯ Member Count", `Total Members: [\`${message.guild.members.cache.size}\`]\nUser Count: [\`${message.guild.members.cache.filter(member => !member.user.bot).size}\`]\nBot Count: [\`${message.guild.members.cache.filter(member => member.user.bot).size}\`]`, true) 
   .addField("❯ Channel Count", `Total Channels: [\`${message.guild.channels.cache.size}\`]\nText Channels: [\`${message.guild.channels.cache.filter(m => m.type === "text").size}\`]\nVoice Channels: [\`${message.guild.channels.cache.filter(m => m.type === "voice").size}\`]`, true)
   .addField("❯ Role Count", `Total Roles: [\`${message.guild.roles.cache.size}\`]`, true) 
   .addField("❯ Emoji Count", `Total Emojis: [\`${message.guild.emojis.cache.size}\`]`) 
   .addField("❯ Boost Count", `Total Boosts: [\`${message.guild.premiumSubscriptionCount}\`]`) 
   .addField("❯ Created At", `${message.channel.guild.createdAt.toDateString().substr(0, 16)}`)
   .addField("❯ Presence", [
        `**Online:** ${
          message.guild.members.cache.filter(member => member.presence.status === "online").size
        }`,
        `**Idle:** ${
          message.guild.members.cache.filter(member => member.presence.status === "idle").size
        }`,
        `**Do Not Disturb:** ${
          message.guild.members.cache.filter(member => member.presence.status === "dnd").size
        }`,
        `**Offline:** ${
          message.guild.members.cache.filter(member => member.presence.status === "offline").size
        }`,
      
      ]) 
   
   .setThumbnail(message.guild.iconURL({dynamic: true}), true) 
   .setColor("#ff2025")
   message.channel.send(embed)
   }
};