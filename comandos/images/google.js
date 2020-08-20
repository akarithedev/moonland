const { Command } = require("discord.js-commando") 
const { MessageEmbed } = require("discord.js")
module.exports = class GoogleCommand extends Command {
  constructor(client) { 
    super(client, { 
      name: "google",
      group: "images", 
      memberName: "google", 
      aliases: ["gog"], 
      description: "Get screenshot of given site name",  
      guildOnly: true,
  
    }
       
 )} 

  
  async run(message) { 
    
    const args = message.content.split(' ').slice(1); 
    
  const puppeteer = require("puppeteer")
 
if(!message.channel.nsfw) {
  return message.channel.send('You can use this command in an NSFW Channel!') 
}
    if(!args.length) {
      return message.channel.send('Please provide a URl to be used for the bot.')
      message.delete(6000) 
    }
  try {
  const browser = await puppeteer.launch({args:["--no-sandbox"]})
  const page = await browser.newPage()
  await page.setViewport({width: 1440, height: 900});
	await page.goto(`https://${args.join(" ")}`) //ok
  var screenshot = await page.screenshot({type: 'png'});
					
		message.channel.send({files:[{ attachment: screenshot, name: "screenshot.png" }]})
    await browser.close();
  } catch(err) {
    console.error(err)
    message.channel.send(`:warning: ${err}`)
  }
 
// Copyrighted by DR strange boyfriend of Maria
    //dont share this code to anyone its precious 
  }
}