const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class restartCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'restart',
      group: 'owner',
      description: 'Restart the bot',
      memberName: 'restart',
      ownerOnly: true
    });
  }

  async run(message, client, args) {
    //Restarting section
        message.channel.send("Restarting...").then(m => {
      //Restarted ;D
      setTimeout(() => {
        const restarted = new MessageEmbed().setAuthor(
          'I have been restarted.'
        ); 
        m.edit(restarted); 
        process.exit(0);
      }, 5000);
    });

    
  }
};
