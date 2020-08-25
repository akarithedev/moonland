const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { youtubeAPI } = require('../../config.json');
const youtube = new YouTube(youtubeAPI);

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['p', 'pplay'],
      memberName: 'play',
      group: 'music',
      description: 'Play any song or playlist from youtube',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 2,
        duration: 5
      }, 
      args: [{ 
        key: "query",
        prompt: "What song or playlist do you want to listen?", 
        type: "string", 
        default: "", 
        validate: query => query.length > 0 && query.length < 200 
        }]
   
    });
  }

  async run(message, { query }) { 
   // initial checking
    var voiceChannel = message.member.voice.channel; 
    if (!voiceChannel)
      return message.say('Únase a un canal de voz e intente nuevamente');
    // end initial check 
    if(!query) 
      return message.channel.send("Wrong usage. Try `ml!play <text> or <url>`");
    if (message.guild.triviaData.isTriviaRunning == true)
      return message.say('Please try after the trivia has ended');
    // This if statement checks if the user entered a youtube playlist url
    if (
      query.match(
        /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
      )
    ) {
      try {
        const playlist = await youtube.getPlaylist(query);
        const videosObj = await playlist.getVideos(10); // remove the 10 if you removed the queue limit conditions below
        //const videos = Object.entries(videosObj);
        for (let i = 0; i < videosObj.length; i++) {
          const video = await videosObj[i].fetch();

          const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
          const title = video.raw.snippet.title;
          let duration = this.formatDuration(video.duration);
          const thumbnail = video.thumbnails.high.url;
          if (duration == '00:00') duration = 'Transmisión en vivo';
          const song = {
            url,
            title,
            duration,
            thumbnail,
            voiceChannel
          };
          // this can be uncommented if you choose to limit the queue
          // if (message.guild.musicData.queue.length < 400) {
          //
          message.guild.musicData.queue.push(song);
          // } else {
          // return message.say(
          //   `I can't play the full playlist because there will be more than 400 songs in queue`
          //   );
          // }
        }
        if (message.guild.musicData.isPlaying == false) {
          message.guild.musicData.isPlaying = true;
          return this.playSong(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
          return message.say({
            embed: {
              title: 'Playlist Added',
              description: `💿 | The playlist **${playlist.title} Has been added.`,
              color: '#00FFFF'
            }
          });
        }
      } catch (err) {
        console.error(err);
        return message.say(
          '⛔ La lista de reproducción es privada o inexistente.'
        );
      }
    }

    // This if statement checks if the user entered a youtube url, it can be any kind of youtube url
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      const url = query;
      try {
        query = query
          .replace(/(>|<)/gi, '')
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = query[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);
        // // can be uncommented if you don't want the bot to play live streams
        // if (video.raw.snippet.liveBroadcastContent === 'live') {
        //   return message.say("I don't support live streams!");
        // }
        // // can be uncommented if you don't want the bot to play videos longer than 1 hour
        // if (video.duration.hours !== 0) {
        //   return message.say('I cannot play videos longer than 1 hour');
        // }
        const title = video.title;
        let duration = this.formatDuration(video.duration);
        const thumbnail = video.thumbnails.high.url;
        if (duration == '00:00') duration = 'Transmisión en vivo';
        const song = {
          url,
          title,
          duration,
          thumbnail,
          voiceChannel
        };
        // // can be uncommented if you want to limit the queue
        // if (message.guild.musicData.queue.length > 100) {
        //   return message.say(
        //     'There are too many songs in the queue already, skip or wait a bit'
        //   );
        // }
        message.guild.musicData.queue.push(song);
        if (
          message.guild.musicData.isPlaying == false ||
          typeof message.guild.musicData.isPlaying == 'undefined'
        ) {
          message.guild.musicData.isPlaying = true;
          return this.playSong(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
          const sEmbed = new MessageEmbed()
            .setAuthor(
              '| Added To Queue',
              'https://botlist.imgix.net/3954/c/submission33110oFyfZ-medium.jpg?auto=compress'
            )
            .setDescription(
              `[${song.title}](${song.url}) Has been added to the queue.`
            )
            .setColor('AQUA')
            .setThumbnail(song.thumbnail)
            .setFooter(
              `• 🎧 Duration: ${song.duration} • | Added by ${message.author.username}`
            );
          return message.say(sEmbed);
        }
      } catch (err) {
        console.error(err);
        return message.say(
          ':warning: algo no salió bien por favor intente nuevamente más tarde'
        );
      }
    }
    try {
      const videos = await youtube.searchVideos(query, 5);
      if (videos.length < 5) {
        return message.say('No tracks were found');
      }
      const vidNameArr = [];
      for (let i = 0; i < videos.length; i++) {
        vidNameArr.push(`${i + 1} **-** ${videos[i].title}`);
      }
      vidNameArr.push('');
      const embed = new MessageEmbed()
        .setColor('#f987b')
        .setAuthor(
          `Song Selection.`,
          `${message.author.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
          })}`
        )
        .setDescription(
          `${vidNameArr[0]}
${vidNameArr[1]}
${vidNameArr[2]}
${vidNameArr[3]}
${vidNameArr[4]}
${vidNameArr[5]}`
        )
        .setFooter(
          'Your response time close within the next 30 seconds. Type "cancel" to cancel the selection'
        );
      var songEmbed = await message.say({ embed });
      try {
        var response = await message.channel.awaitMessages(
          msg =>
            (msg.content > 0 && msg.content < 6) || msg.content === 'cancel',
          {
            max: 1,
            maxProcessed: 1,
            time: 30000,
            errors: ['time']
          }
        );
        var videoIndex = parseInt(response.first().content);
      } catch (err) {
        console.error(err);
        if (songEmbed) {
        }
        return message.say('An error occured, please try again.');
      }
      if (response.first().content === 'cancel')
        return message.say({
          embed: {
            title: 'Song Selection.',
            description: 'Selection has been cancelled',
            color: 'GREEN'
          }
        });

      try {
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        // // can be uncommented if you don't want the bot to play live streams
        // if (video.raw.snippet.liveBroadcastContent === 'live') {
        //   songEmbed.delete();
        //   return message.say("I don't support live streams!");
        // }

        // // can be uncommented if you don't want the bot to play videos longer than 1 hour
        // if (video.duration.hours !== 0) {
        //   songEmbed.delete();
        //   return message.say('I cannot play videos longer than 1 hour');
        // }
      } catch (err) {
        console.error(err);
        if (songEmbed) {
        }
        return message.say(
          ':warning: An error has occured when trying to get the video ID from youtube'
        );
      }
      const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
      const title = video.title;
      let duration = this.formatDuration(video.duration);
      const thumbnail = video.thumbnails.high.url;
      if (duration == '00:00') duration = 'Transmisión en vivo';
      const song = {
        url,
        title,
        duration,
        thumbnail,
        voiceChannel
      };
      // // can be uncommented if you don't want to limit the queue
      // if (message.guild.musicData.queue.length > 200 {
      //   songEmbed.delete();
      //   return message.say(
      //     'There are too many songs in the queue already, skip or wait a bit'
      //   );
      // }
      message.guild.musicData.queue.push(song);
      if (message.guild.musicData.isPlaying == false) {
        message.guild.musicData.isPlaying = true;
        if (songEmbed) {
        }
        this.playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying == true) {
        if (songEmbed) {
        }
        const sEmbed = new MessageEmbed()
          .setAuthor(
            '| Added To Queue',
            'https://botlist.imgix.net/3954/c/submission33110oFyfZ-medium.jpg?auto=compress'
          )
          .setDescription(
            `[${song.title}](${song.url}) Has been added to the queue.`
          )
          .setColor('AQUA')
          .setTimestamp()
          .setThumbnail(song.thumbnail)
          .setFooter(
            `• 🎧 Duration: ${song.duration} • | Added by ${message.author.username}`
          );
        return message.say(sEmbed);
      }
    } catch (err) {
      console.error(err);
      if (songEmbed) {
      }
      return message.say(
        ':warning: algo salió mal por favor intente nuevamente en unos minutos'
      );
    }
  }
  playSong(queue, message) {
    queue[0].voiceChannel
      .join()
      .then(connection => {
        const dispatcher = connection
          .play(
            ytdl(queue[0].url, {
              quality: 'highestaudio',
              highWaterMark: 1024 * 1024 * 10
            })
          )
          .on('start', () => {
            message.guild.musicData.songDispatcher = dispatcher;
            dispatcher.setVolume(message.guild.musicData.volume);
            const videoEmbed = new MessageEmbed()
              .setThumbnail(queue[0].thumbnail)
              .setColor('#9400D3')
              .setTimestamp()
              .setAuthor(
                'Started Playing',
                'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/youtube-512.png'
              )
              .setDescription(
                `[${queue[0].title}](${
                  queue[0].url
                })\nBitrate: \`512kbps\`, Volume: \`${dispatcher.setVolume(
                  message.guild.musicData.volume
                )}\`\nDuration: \`${queue[0].duration}\``
              )
              .setFooter(
                `Requested by ${message.author.username}`,
                `${message.author.avatarURL({ format: 'png', dynamic: true })}`
              );
            message.say(videoEmbed);
            message.guild.musicData.nowPlaying = queue[0];
            return queue.shift();
          })
          .on('finish', () => {
            if (queue.length >= 1) {
              return this.playSong(queue, message);
            } else {
              message.guild.musicData.isPlaying = false;
              message.guild.musicData.nowPlaying = null;
              if (message.guild.me.voice.channel.leave());
              return message.say({
                embed: {
                  title: '',
                  description: 'Queue has ended.',
                  color: '#FFFF00'
                }
              });
            }
          })
          .on('error', e => {
            message.say(`\`${e}\``);
            console.error(e);
            message.guild.musicData.queue.length = 0;
            message.guild.musicData.isPlaying = false;
            message.guild.musicData.nowPlaying = null;
            return message.guild.me.voice.channel.leave();
          });
      })
      .catch(e => {
        console.error(e);
        return message.guild.me.voice.channel.leave();
      });
  }

  formatDuration(durationObj) {
    const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
      durationObj.minutes ? durationObj.minutes : '00'
    }:${
      durationObj.seconds < 10
        ? '0' + durationObj.seconds
        : durationObj.seconds
        ? durationObj.seconds
        : '00'
    }`;
    return duration;
  }
};
