//uptime callback
const http = require("http");
const express = require("express");
const app = express();

var server = require("http").createServer(app);

app.get("/", (request, response) => {
  console.log("Ping Received by uptimers");
  response.send("Made by Maria")

});

const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
}); 

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 300000); 

 
//_______________________________________________________________________________________________________________________________


const { Structures } = require("discord.js");
const { MessageEmbed, MessageAttachment, Collection } = require("discord.js");
const path = require("path");
const { default_prefix, CHANNEL_ID, SERVER_CHANNEL_ID } = require("./config.json");
const { badwords } = require("./badwords.json");
const { nolinks } = require("./no-links.json");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://maria:maria123@cluster1.bvusk.mongodb.net/moonland?retryWrites=true&w=majority"
); 

db.on("ready", () => {
  console.log("Database connected!");
});

Structures.extend("Guild", Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1,
        loop: false
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});


const Commando = require("discord.js-commando");
const bot = new Commando.Client({
  commandPrefix: default_prefix,
  owner: ["764817986968092712", "557112105275228161"],
  unknownCommandResponse: false,
  commandError: false
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([["music", "Music"]])
  .registerGroups([["other", "Other"]])
  .registerGroups([["help", "Help"]])
  .registerGroups([["moderation", "Moderation"]])
  .registerGroups([["owner", "Owner"]])
  .registerGroups([["info", "Info"]])
  .registerGroups([["util", "Util"]])
  .registerGroups([["images", "Images"]])
  .registerGroups([["admin", "Administrator"]])
  .registerGroups([["fun", "Fun"]])
  .registerGroups([["economy", "Economy"]])
  .registerDefaultGroups([])
  .registerDefaultCommands({
    eval: true,
    prefix: false,
    ping: false,
    commandState: true,
    help: false,
    unknownCommand: false
  })
  .registerCommandsIn(path.join(__dirname, "comandos"));


bot.commands = new Collection();
bot.aliases = new Collection(); 

bot.on("ready", () => {
  const ascii = require("ascii-table");

  // Create a new Ascii table
  let table = new ascii("");

  table.setHeading("Made by Maria <3", "");
  table.addRow(`Hi, ${bot.user.username} is now online`);
  console.log(table.toString());
  const statusname = db.get("status").then(async status => {
    await bot.user.setActivity(status, { type: "WATCHING" });
  });
}); 
bot.on("message", async message => {
  function Check(str) {
    if (
      bot.emojis.cache.find(emoji => emoji.name === str) ||
      message.guild.emojis.cache.find(emoji => emoji.name === str)
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (message.content.startsWith(":") && message.content.endsWith(":")) {
    let EmojiName = message.content.slice(1, -1);

    if (Check(EmojiName) === true) {
      const channel = bot.channels.cache.get(message.channel.id);
      try {
        let webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.first();
        if (webhook === undefined || null || !webhook) {
          let Created = channel
            .createWebhook("BUDOP")
            .then(async webhook => {
              const emoji =
                bot.emojis.cache.find(e => e.name == EmojiName).id ||
                message.guild.emojis.cache.find(e => e.name === EmojiName).id;

              await webhook.send(`${bot.emojis.cache.get(emoji)}`, {
                username: message.author.username,
                avatarURL: message.author.avatarURL({ dynamic: true })
              });
              message.delete();
            });
        }

        const emoji =
          bot.emojis.cache.find(e => e.name == EmojiName).id ||
          message.guild.emojis.cache.find(e => e.name === EmojiName).id;

        await webhook.send(`${bot.emojis.cache.get(emoji)}`, {
          username: message.author.username,
          avatarURL: message.author.avatarURL({ dynamic: true })
        });
        message.delete();
      } catch (error) {
        console.log(`Error :\n${error}`);
      }
    
    
    }}}); 

bot.on("error", (e) => console.error(e));

const YouTubeNotifier = require("youtube-notification");
const notifier = new YouTubeNotifier({
  hubCallback: "https://moonlandbot-1.glitch.me/yt",
  secret: "JOIN_MY_SERVER_OR_DIE"
});

notifier.on("notified", data => {
  console.log("New Video");

  const embed = new MessageEmbed()
    .setAuthor(
      `Hey, **${data.channel.name}** Uploaded a new video, go check it out`
    )
    .setDescription(`❯ Video Link: [Click Here](${data.video.link})`)
    .setColor("BLUE");

  var channel = bot.channels.cache.get(SERVER_CHANNEL_ID);
  channel.send(embed);
});

notifier.subscribe(CHANNEL_ID);
app.use("/yt", notifier.listener());

bot.on("message", async message => {
 if(message.mentions.has("@everyone")) { 
   return; 
   }
  let prefix = default_prefix;
  //this event is fired, whenever the bot sees a new message
  if (message.mentions.has(bot.user)) {
    //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
    //this is where you put what you want to do now
    const embed = new MessageEmbed()
      .setTitle("Prefix Help")
      .setDescription(`Hey, my prefix in this server is \`${prefix}\``)
      .setColor("#FFFF00");
    return message.channel.send(embed);
  }
});

bot.on("message", message => {
  if (message.author.bot) return;
  //START
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    let confirm = false;
    //NOW WE WILL USE FOE LOOP
    var i;
    for (i = 0; i < nolinks.length; i++) {
      if (message.content.toLowerCase().includes(nolinks[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      const spEmbed = new MessageEmbed()
        .setTitle("Anti-Link Alert")
        .setDescription(
          `${message.author}, You are not allowed to send links in this channel`
        )
        .setColor("RED");
      message.delete();
      return message.channel.send({ embed: spEmbed });
    }
  }
  //END
}); 

bot.on("roleCreate", async role => {  
 
  const rhx = await db.fetch(`logs_${role.guild.id}`);  
  if(rhx === null) { 
    return; 
   } 
  
  const embed = new MessageEmbed()  
  .setTitle(`\✅ Role created: ${role.name}`) 
  .addField(`❯ Permissions`, role.permissions.toArray().join(", ")) 
  .setTimestamp()  
  .setFooter("ID: " + role.id)
  .setColor("BLUE") 
  
  const channel = role.guild.channels.cache.get(rhx);
  return channel.send(embed);
}); 

bot.on("roleUpdate", async (oldRole, newRole) => { 
if(oldRole.name === newRole.name) { 
  return; 
} 
const chx = await db.fetch(`logs_${oldRole.guild.id}`); 
if(!chx) { 
  return; 
} 
 
const embed = new MessageEmbed() 
.setTitle(`📝 Role Updated: ${oldRole.name}`)
.setDescription(`❯ **Old name**: ${oldRole.name}\n❯ **New name**: ${newRole.name}`)
.setColor("BLUE") 
.setTimestamp() 
.setFooter("ID: " + oldRole.id) 

const channel = oldRole.guild.channels.cache.get(chx);
  return channel.send(embed);
}); 

bot.on("message", message => {
  if (message.author.bot) return;
  //START
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    let confirm = false;
    //NOW WE WILL USE FOR LOOP
    var i;
    for (i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      const bEmbed = new MessageEmbed()
        .setTitle("Anti-Swearing")
        .setDescription(
          `${message.author}, You are not allowed to send badwords here`
        )
        .setColor("RED");
      message.delete();
      return message.channel.send({ embed: bEmbed });
    }
  }
  //END
});

bot.on("guildMemberAdd", async member => {
  const chx = await db.fetch(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  const welMsg = new MessageEmbed()
    .setAuthor(
      `${member.user.tag}`,
      member.user.displayAvatarURL({ format: 'png', dynamic: true}))
    .setDescription(`❯ Welcome ${member.user.username} to ${member.guild.name}\n\n❯ You are the ${member.guild.memberCount}th member`)
    .setColor("#54BBFF")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
  
  const channel = bot.channels.cache.get(chx); 
  return channel.send(welMsg);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  //start
  const globalMsg = new MessageEmbed()
    .setTitle(`Sender: ${message.author.tag}`)
    .setDescription(message.content)
    .setColor(message.member.displayHexColor)
    .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
    .setFooter(`From: ${message.guild.name} | Author ID: ${message.author.id}`);

  if (message.channel.name !== "global-chat") return;
  message.delete();
  return await Promise.all(
    bot.channels.cache
      .filter(c => c.name === "global-chat")
      .map(c => c.send(globalMsg))
  );
});

bot.on("guildMemberRemove", async member => {
  //Beginning :(
  const bhx = await db.fetch(`goodbye_${member.guild.id}`);
  if (bhx === null) {
    return;
  }

  const gbMsg = new MessageEmbed()
    .setDescription(`${member.user.tag} left.\nHope they join back `)
    .setColor("RED")
    .setTimestamp();
  return bot.channels.cache.get(bhx).send(gbMsg);
});

bot.on("messageDelete", async message => {
  if (message.author.bot) {
    return;
  }
  const logs = await db.fetch(`logs_${message.guild.id}`);
  
  if (logs === null) {
    return;
  }

  let embed = new MessageEmbed()
    .setColor("BLUE")
    .setTimestamp()
    .setTitle(`Message Deleted in #${message.channel.name}`)
    .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
    .setAuthor(`${message.author.tag}`)
    .setDescription(`**❯ Message:** ${message.content}`)
    .setFooter(`Author ID: ${message.author.id}`);
  //Logging With Simple | You Can Change

  const channel = bot.channels.cache.get(logs);
  return channel.send(embed);
});

bot.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) {
    return;
  }

  if (oldMessage.author.bot) {
    return;
  }
  const logs = await db.fetch(`logs_${oldMessage.guild.id}`);

  if (logs === null) {
    return;
  }

  let embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Message Edited in #${oldMessage.channel.name}`)
    .setThumbnail(oldMessage.author.avatarURL({ format: "png", dynamic: true }))
    .setAuthor(`${oldMessage.author.tag}`)
    .setDescription(
      `**❯ Before:** ${oldMessage.content}\n**❯ After:** ${newMessage.content}`,
      true
    )
    .setFooter(`Author ID: ${oldMessage.author.id}`)
    .setTimestamp();
  //Logging With Simple | You Can Change
  const channel = oldMessage.guild.channels.cache.get(logs);
  return channel.send(embed);
});

bot.on("guildCreate", guild => {
  const embed = new MessageEmbed()
    .setAuthor("Guild Join")
    .setColor("GREEN")
    .addField("❯ Server Name", `${guild.name}`)
    .addField("❯ Member Count", `${guild.memberCount}`)
    .addField("❯ Verification Level", `${guild.verificationLevel}`)
    .setThumbnail(guild.iconURL())
    .setTimestamp();
  var logs = bot.channels.cache.get("737373192938586202");
  logs.send(embed);
});

bot.on("guildDelete", guild => {
  const embed = new MessageEmbed()
    .setAuthor("Guild Leave")
    .addField("❯ Server name", guild.name)
    .addField("❯ Member Count", guild.memberCount)
    .addField("❯ Verification Level", guild.verificationLevel)
    .setColor("#ff2025")
    .setThumbnail(guild.iconURL())
    .setTimestamp();

  var logs = bot.channels.cache.get("737373192938586202");
  logs.send(embed);
});
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({ 
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000,
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});  
bot.on("message", (message) => antiSpam.message(message)); 
//what are you doing here 
bot.login(process.env.TOKEN);
