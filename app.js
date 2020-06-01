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
		  let cos = (message.author.username + " napisał do autorskiego bota na pw: " + message.content);
		 wiado.send(cos);
	  }
	
// bot.on("messageDelete", async message =>{
//  let LoggingEmbed = new Discord.RichEmbed()
//.setTitle("BREAKING NEWS! Ktoś usunął wiadomość!")
//.setColor("#d65cff")
//.setThumbnail(message.avatarURL)
//.addField("Treść:", message.content)
//.addField("Usunięta wiadomość autorstwa: ", message.author.tag)
//.addField("Na kanale: ", message.channel)
//.addField("O godzinie: ", message.createdAt)
//.setFooter("Ojojoj");
//let logChannel = message.guild.channels.find(c => c.name === "logi_discord")
//if(!logChannel) return;

//logChannel.send(LoggingEmbed);
//});
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
