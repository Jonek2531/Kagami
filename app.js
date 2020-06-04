// Wszelkie treści poniżej należą do Jonek#3313. Kopiowanie zabronione ©

const Discord = require("discord.js")
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const botconfig = require("./botconfig.json");
const fs = require("fs")
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

	bot.on("ready", async () =>{
  console.log(`${bot.user.username} jest online! Aktualnie jest na ${bot.guilds.size} serwerach.`);
  bot.user.setActivity("Breach moim życiem!!!", {type: "LISTENING"});
})

bot.on("message", async message =>{

  let prefix = botconfig.prefix;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
	
	if(message.author.bot) return;
	  if(message.channel.type === "dm"){
		  let wiado = bot.channels.get("717037109592195232");
		  let cos = (message.author.username + " napisał do mnie w prywatnej wiadomości: " + message.content);
		 wiado.send(cos);
	  }
	if(cmd === `${prefix}purge`) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
		
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 50)
      return message.reply("Proszę podać liczbę od 2 do 50.");

    const fetched = message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Nie mogę wykonać polecenia, ponieważ: ${error}`));
  }	
	if(cmd === `${prefix}wiadomość`){
let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if (!dUser) return message.channel.send("Nie ma takiego użytkownika!")
if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Nie masz uprawnień do używania tej komendy.")
let dMessage = args.join(" ").slice(22);
if(dMessage.length < 1) return message.reply('Musisz napisać coś w wiadomości!')

dUser.send(`${dMessage}`)
	message.channel.send("Pomyślnie wysłano wiadomość");
}
if(cmd === `${prefix}opusc`){
	if(message.author.id !=='329694416472375298') 
        return message.channel.send(`**»** ${message.author}, you don't have permission to do that!`);
    var guildID = bot.guild.find(493320672844447745)
    guildID.leave()
}
})

bot.login(process.env.BOT_TOKEN)
