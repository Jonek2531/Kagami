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
bot.on("messageDelete", async message =>{
  let LoggingEmbed = new Discord.RichEmbed()
.setTitle("BREAKING NEWS! Wiadomość została usunięta!")
.setColor("#d65cff")
.setThumbnail(message.author.avatarURL)
.addField("Treść:", message.content)
.addField("Usunięta wiadomość autorstwa:", message.author.tag + ", na kanale " + message.channel)
.addField("O godzinie: ", `${moment.utc(message.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
.setFooter("Ojojoj");
let logChannel = message.guild.channels.find(c => c.name === "logger")
if(!logChannel) return;

logChannel.send(LoggingEmbed);
});

client.on('messageUpdate', (oldMessage, newMessage, message) => {
  let LoggingEmbed = new Discord.RichEmbed()
.setTitle("BREAKING NEWS! Wiadomość została zedytowana!")
.setColor("#32a864")
.setThumbnail(message.author.avatarURL)
.addField("Stara zawartość wiadomości:", oldMessage.content)
  .addField("Zawartość bo edicie:", newMessage.content)
.addField("Usunięta wiadomość autorstwa:", message.author.tag + ", na kanale " + message.channel)
.addField("O godzinie: ", `${moment.utc(message.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
.setFooter("Ojojoj");
let logChannel = message.guild.channels.find(c => c.name === "logger")
if(!logChannel) return;

logChannel.send(LoggingEmbed);
});

bot.on("message", async message =>{

  let prefix = botconfig.prefix;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
	
	if(message.author.bot) return;
	  if(message.channel.type === "dm"){
		  let wiado = bot.channels.get("723243651567976459");
		  let cos = (message.author.username + " napisał do mnie w prywatnej wiadomości: " + message.content);
		 wiado.send(cos);
	  }
		
	
	if(cmd === `@`) {
		let asay = message.guild.channels.find(`name`, "administracja-breach");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
if(sayMessage.length < 1) return message.reply('Usage: ulx sasay {message} - Send a message to currently connected superadmins. (say: $)')
    asay.send(`**${message.author} to admins:** ${sayMessage}`);
  }
	if(cmd === `$`) {
		let sasay = message.guild.channels.find(`name`, "administracja-breach");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
if(sayMessage.length < 1) return message.reply('Usage: ulx sasay {message} - Send a message to currently connected superadmins. (say: $)')
    sasay.send(`**${message.author} to superadmins:** ${sayMessage}`);
  }
	
	if(cmd === `@@`) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
		if(sayMessage.length < 1) return message.reply('Usage: ulx tsay {message} - Send a message to everyone in the chat box. (say: @@)')
    message.channel.send(sayMessage);
  }
	
	if(cmd === `@@@`) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
if(sayMessage.length < 1) return message.reply('Usage: ulx csay {message} - Send a message to everyone in the middle of their screen. (say: @@@)')
    message.channel.send(`**${sayMessage}**`);
  }
	
	if(cmd === `#`){
		let via = message.guild.channels.find(`name`, "administracja-breach");
let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if (!dUser) return message.channel.send("Nie ma takiego użytkownika!")
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You do not have access to this command, ${message.author}.`)
let dMessage = args.join(" ").slice(22);
if(dMessage.length < 1) return message.reply('Usage: ulx respond <player> {message} - send anymous admin message')

dUser.send(`${dMessage}`)
	via.send(`${message.author} via admin respond to ${dUser}: ${dMessage}.`);
}
	if(cmd === `${prefix}mute`){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
	let role = message.guild.roles.find("name", "toxic");
        let member = message.mentions.members.first();
        if(!member) return message.channel.send("TBA")
        member.addRole(role).catch(console.error)
		message.channel.send(`${message.author} muted ${member}`);
	}
	if(cmd === `${prefix}unmute`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
	let role = message.guild.roles.find("name", "toxic");
        let member = message.mentions.members.first();
	if(!member) return message.channel.send("TBA")
        member.removeRole(role).catch(console.error)
		message.channel.send(`${message.author} unmuted ${member}`);
	}
	
	if(cmd === `${prefix}gimp`){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
	let role = message.guild.roles.find("name", "Gimped");
        let member = message.mentions.members.first();
        if(!member) return message.channel.send("Usage: ulx gimp <players> - Gimps target(s) so they are unable to chat normally. (say: !gimp) (opposite: ulx ungimp)")
        member.addRole(role).catch(console.error)
		message.channel.send(`${message.author} gimped ${member}`);
	}
	if(cmd === `${prefix}ungimp`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
	let role = message.guild.roles.find("name", "Gimped");
        let member = message.mentions.members.first();
	if(!member) return message.channel.send("Usage: ulx ungimp <players> - Gimps target(s) so they are unable to chat normally. (say: !gimp) (opposite: ulx ungimp)")
        member.removeRole(role).catch(console.error)
		message.channel.send(`${message.author} ungimped ${member}`);
	}

//	let gimpedd = message.member.roles.find(r => r.name === "Gimped");
//	let gimpedrole = message.member.roles.has(gimpedd);
//	if(gimpedrole.message){
//	 let gimped = [
 //      "SCP-049 'leczy' w zombie...",
//	"SCP-049-2 to przydupas SCP-049...",
//	"SCP-066 - można powiedzieć, że to coś powoduje tak jakby 'trzęsienie ziemi'...",
//	"SCP-082 jest grubszy niż Personel Klasy D-1...",
//	"SCP-096 jest strasznie nieśmiały...",
//	"SCP-106 robi cz@rne plamy...",
//	"SCP-173 lubi skręcać karki...",
//	"SCP-372 bardzo lubi przyczepiać się o ściany...",
//	"SCP-457 jest hot, bo się naoglądał... (wtf)...",
//	"SCP-527 to zdrajca drugiej generacji...",
//	"SCP-939 właściwie to jest ślepy...",
//        "SCP-999 to zdrajca pierwszej generacji...",
//	"SCP-1048a strasznie krzyczy, nieprawdaż?...",
//			]
//	let gimpedresult = Math.floor((Math.random() * gimped.length));
//	if(!gimpedrole) return;
//	if(gimpedrole)
//
//			
//	message.channel.send(`${message.member} pisze: ` + gimped[gimpedresult])
//
//	}
      if(cmd === `${prefix}gag`){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
        let member = message.mentions.members.first();
        if(!member) return message.channel.send("Usage: ulx gag <players> - Gag target(s), disables microphone. (say: !gag) (opposite: ulx ungag)")
      await member.setMute(true);
		message.channel.send(`${message.author} gagged ${member}`);
}
	
	if(cmd === `${prefix}ungag`){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
        let member = message.mentions.members.first();
        if(!member) return message.channel.send("Usage: ulx ungag <players> - Gag target(s), disables microphone. (say: !gag) (opposite: ulx ungag)")
     await member.setMute(true);
		message.channel.send(`${message.author} ungagged ${member}`);
}
	
	if(cmd === `${prefix}strip`){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You do not have access to this command, ${message.author}.`);
		let strip = message.mentions.members.first();
		if(!strip) return message.channel.send("TBA")
		let uzytkownik = message.guild.roles.find("name", "Gimped");
if(message.member.roles.has(uzytkownik)) return;
		strip.removeRoles(strip.roles);
		message.channel.send(`${message.author} stripped weapons from ${strip}`);
	}

	if(cmd === `${prefix}kick`){

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Usage: ulx kick <player> [{reason}] - Kicks target. (say: !kick)");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Command ulx kick, argument #1: you cannot target this person or these persons");
   if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send(`You do not have access to this command, ${message.author}.`);

   let kickEmbed = new Discord.RichEmbed()
   .setDescription("Kick")
   .setColor("#00e7ff")
   .addField("Wyrzucony użytkownik", `${kUser}, ID użytkownika ${kUser.id}`)
   .addField("Wyrzucony przez", `<@${message.author.id}>, ID użytkownika: ${message.author.id}`)
   .addField("Na kanale", message.channel)
   .addField("O godzinie", message.createdAt)
   .addField("Powód", kReason);

   let kickChannel = message.guild.channels.find(`name`, "logger");
   if(!kickChannel) return message.channel.send("Nie mogę znaleźć danego kanału.");

   message.guild.member(kUser).kick(kReason);

   kickChannel.send(kickEmbed);

   return;
	
 message.channel.send(`${message.author} kicked ${kUser} (${kReason})`)
 }
  
	
if(cmd === `${prefix}opusc`){
	if(message.author.id !=='329694416472375298') 
        return message.channel.send(`**»** ${message.author}, you don't have permission to do that!`);
    var guildID = bot.guild.find(493320672844447745)
    guildID.leave()
}
})

bot.login(process.env.BOT_TOKEN)
