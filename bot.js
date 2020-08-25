//uptime callback
const http = require('http');
const express = require('express');
const app = express();

var server = require('http').createServer(app);

app.get('/', (request, response) => {
  console.log('Ping Received by uptimers');
  response.end('BOT MADE BY MARIA');
});

const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
//j
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 300000);
//_______________________________________________________________________________________________________________________________

const { Structures } = require('discord.js');
const { MessageEmbed, MessageAttachment, Collection } = require('discord.js');
const path = require('path');
const { prefix, CHANNEL_ID, SERVER_CHANNEL_ID } = require('./config.json');
const { badwords } = require('./badwords.json');
const { nolinks } = require('./no-links.json');
const db = require('quick.db');

Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
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
function newprefix(message) { 
  
  } 

const Commando = require('discord.js-commando'); 
const bot = new Commando.Client({ 
  commandPrefix: prefix,
  owner: ['662979119713353729', '671449036494077967'],
  unknownCommandResponse: false,
  commandError: false
});

  bot.registry
  .registerDefaultTypes()
  .registerGroups([['music', 'Music']])
  .registerGroups([['other', 'Other']])
  .registerGroups([['help', 'Help']])
  .registerGroups([['moderation', 'Moderation']])
  .registerGroups([['owner', 'Owner']])
  .registerGroups([['info', 'Info']])
  .registerGroups([['util', 'Util']])
  .registerGroups([['images', 'Images']])
  .registerGroups([['admin', 'Administrator']])
  .registerGroups([['fun', 'Fun']])
  .registerGroups([['economy', 'Economy']])
  .registerDefaultGroups([])
  .registerDefaultCommands({
    eval: true,
    prefix: false,
    ping: false,
    commandState: true,
    help: false,
    unknownCommand: false
  })
  .registerCommandsIn(path.join(__dirname, 'comandos')); 
function Blacklisted(blacklistedUsers) {
bot.dispatcher.addInhibitor(async msg => { 
  let blacklist = await db.fetch(`blacklist_${msg.author.id}`);  
  if(blacklist === "Blacklisted") {
    if(blacklistedUsers.has(blacklist)) return msg.reply('You are blacklisted from the bot!');
	 }
    
  }); 
} 

bot.commands = new Collection();
bot.aliases = new Collection();

bot.on('ready', () => {
  const ascii = require('ascii-table');

  // Create a new Ascii table
  let table = new ascii('');

  table.setHeading('Made by Maria <3', '');
  table.addRow(`Hi, ${bot.user.username} is now online`);
  console.log(table.toString());
  bot.user.setActivity(db.get(`status`), { type: 'WATCHING' });
});

bot.on('error', console.error);

const YouTubeNotifier = require('youtube-notification');
const notifier = new YouTubeNotifier({
  hubCallback: 'https://moonlandbot-1.glitch.me/yt',
  secret: 'JOIN_MY_SERVER_OR_DIE'
});

notifier.on('notified', data => {
  console.log('New Video');

  const embed = new MessageEmbed()
    .setAuthor(
      `Hey, **${data.channel.name}** Uploaded a new video, go check it out`
    )
    .setDescription(`❯ Video Link: [Click Here](${data.video.link})`)
    .setColor('BLUE');

  var channel = bot.channels.cache.get(SERVER_CHANNEL_ID);
  channel.send(embed);
});

notifier.subscribe(CHANNEL_ID);
app.use('/yt', notifier.listener());


bot.on('message', message => {
  if (message.mentions.has('@everyone')) {
    return;
  }
  //this event is fired, whenever the bot sees a new message
  if (message.mentions.has(bot.user)) {
    //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
    //this is where you put what you want to do now
    const embed = new MessageEmbed()
      .setTitle('Prefix Help')
      .setDescription(`Hey, my prefix in this server is \`${prefix}\``)
      .setColor('#FFFF00');
    return message.channel.send(embed);
  }
});

bot.on('message', message => {
  if (message.author.bot) return;
  //START
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    let confirm = false;
    //NOW WE WILL USE FOE LOOP
    var i;
    for (i = 0; i < nolinks.length; i++) {
      if (message.content.toLowerCase().includes(nolinks[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      const spEmbed = new MessageEmbed()
        .setTitle('Anti-Link Alert')
        .setDescription(
          `${message.author}, You are not allowed to send links in this channel`
        )
        .setColor('RED');
      message.delete();
      return message.channel.send({ embed: spEmbed });
    }
  }
  //END
});

bot.on('message', message => {
  if (message.author.bot) return;
  //START
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    let confirm = false;
    //NOW WE WILL USE FOR LOOP
    var i;
    for (i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      const bEmbed = new MessageEmbed()
        .setTitle('Anti-Swearing')
        .setDescription(
          `${message.author}, You are not allowed to send badwords here`
        )
        .setColor('RED');
      message.delete();
      return message.channel.send({ embed: bEmbed });
    }
  }
  //END
});

bot.on('guildMemberAdd', async member => {
  const chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  const welMsg = new MessageEmbed() 
    .setAuthor(`${member.user.tag}`, member.user.avatarURL({format: 'png', dynamic: true}))
    .setDescription(`Welcome ${member.user.username} to ${member.guild.name}`)
    .setColor('#54BBFF')
    .setTimestamp()
    .setThumbnail(member.gulid.iconURL())

 return bot.channels.cache.get(chx).send(welMsg);
});

bot.on('message', async message => {
  if (message.author.bot) return;
  //start
  const globalMsg = new MessageEmbed()
    .setTitle(`Sender: ${message.author.tag}`)
    .setDescription(message.content)
    .setColor(message.member.displayHexColor)
    .setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true }))
    .setFooter(`From: ${message.guild.name} | Author ID: ${message.author.id}`);

  if (message.channel.name !== 'global-chat') return;
  message.delete();
  return await Promise.all(
    bot.channels.cache
      .filter(c => c.name === 'global-chat')
      .map(c => c.send(globalMsg))
  );
});

bot.on('guildMemberRemove', member => {
  //Beginning :)
  const bhx = db.get(`goodbye_${member.guild.id}`);
  if (bhx === null) {
    return;
  }
  const gbMsg = new MessageEmbed()
    .setDescription(`${member.user.tag} left.\nHope they join back `)
    .setColor('RED')
    .setTimestamp();
  return bot.channels.cache.get(bhx).send(gbMsg);
});

bot.on('messageDelete', async message => {
  if (message.author.bot) {
    return;
  }
  const logs = db.get(`logs_${message.guild.id}`);

  if (logs === null) {
    return;
  }

  let embed = new MessageEmbed()
    .setColor('BLUE')
    .setTimestamp()
    .setTitle(`Message Deleted in #${message.channel.name}`)
    .setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true }))
    .setAuthor(`${message.author.tag}`)
    .setDescription(`**❯ Message:** ${message.content}`)
    .setFooter(`Author ID: ${message.author.id}`);
  //Logging With Simple | You Can Change

  return bot.channels.cache.get(logs).send(embed);
});

bot.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) {
    return;
  }

  if (oldMessage.author.bot) {
    return;
  }
  const logs = db.get(`logs_${oldMessage.guild.id}`);

  if (logs === null) {
    return;
  }

  let embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`Message Edited in #${oldMessage.channel.name}`)
    .setThumbnail(oldMessage.author.avatarURL({ format: 'png', dynamic: true }))
    .setAuthor(`${oldMessage.author.tag}`)
    .setDescription(
      `**❯ Before:** ${oldMessage.content}\n**❯ After:** ${newMessage.content}`,
      true
    )
    .setFooter(`Author ID: ${oldMessage.author.id}`)
    .setTimestamp();
  //Logging With Simple | You Can Change
  return bot.channels.cache.get(logs).send(embed);
});

bot.on('guildCreate', guild => {
  const embed = new MessageEmbed()
    .setAuthor('Guild Join')
    .setColor('GREEN')
    .addField('❯ Server Name', `${guild.name}`)
    .addField('❯ Owner', `${guild.owner}`)
    .addField('❯ Member Count', `${guild.memberCount}`)
    .addField('❯ Verification Level', `${guild.verificationLevel}`)
    .setThumbnail(guild.iconURL())
    .setTimestamp();
  var logs = bot.channels.cache.get('737373192938586202');
  logs.send(embed);
});

bot.on('guildDelete', guild => {
  const embed = new MessageEmbed()
    .setAuthor('Guild Leave')
    .addField('❯ Server name', guild.name)
    .addField('❯ Member Count', guild.memberCount)
    .addField('❯ Verification Level', guild.verificationLevel)
    .setColor('#ff2025')
    .setThumbnail(guild.iconURL())
    .setTimestamp();

  var logs = bot.channels.cache.get('737373192938586202');
  logs.send(embed);
});

bot.login(process.env.TOKEN);
