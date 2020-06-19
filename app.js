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
	if(cmd === `${prefix}respond`){
let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if (!dUser) return message.channel.send("Nie ma takiego użytkownika!")
if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Nie masz uprawnień do używania tej komendy.")
let dMessage = args.join(" ").slice(22);
if(dMessage.length < 1) return message.reply('Musisz napisać coś w wiadomości!')

dUser.send(`${dMessage}`)
	message.channel.send("Pomyślnie wysłano wiadomość");
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
let gimpedrole = message.guild.roles.find("name", "Gimped");
	if(message.member.roles.has(gimpedrole)) {
		
	if (message.content.includes(`args.join(" ")`)) {
	       message.channel.send("Hmm");

	        let gimped = [
        "SCP-049 'leczy' w zombie...",
	"SCP-049-2 to przydupas SCP-049...",
	"SCP-066 - można powiedzieć, że to coś powoduje tak jakby 'trzęsienie ziemi'...",
	"SCP-082 jest grubszy niż Personel Klasy D-1...",
	"SCP-096 jest strasznie nieśmiały...",
	"SCP-106 robi cz@rne plamy...",
	"SCP-173 lubi skręcać karki...",
	"SCP-372 bardzo lubi przyczepiać się o ściany...",
	"SCP-457 jest hot, bo się naoglądał... (wtf)...",
	"SCP-527 to zdrajca drugiej generacji...",
	"SCP-939 właściwie to jest ślepy...",
        "SCP-999 to zdrajca pierwszej generacji...",
	"SCP-1048a strasznie krzyczy, nieprawdaż?...",
			]
			let gimpedresult = Math.floor((Math.random() * gimped.length));
}
}

	
if(cmd === `${prefix}opusc`){
	if(message.author.id !=='329694416472375298') 
        return message.channel.send(`**»** ${message.author}, you don't have permission to do that!`);
    var guildID = bot.guild.find(493320672844447745)
    guildID.leave()
}
})

bot.login(process.env.BOT_TOKEN)
