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
  bot.user.setActivity("Breach moim życiem!!!", {type: "WATCHING"});
			let onlinevc = bot.channels.get("748512266336469102");
	let gamerstay = bot.guilds.get('712286891902500874');
	var onlineCount = gamerstay.members.filter(m => m.presence.status === 'online').size + gamerstay.members.filter(m => m.presence.status === 'idle').size + gamerstay.members.filter(m => m.presence.status === 'dnd').size + gamerstay.members.filter(m => m.presence.status === 'offline').size
	onlinevc.setName("Członkowie: " + onlineCount);
})
bot.on('guildMemberAdd', member => {
   let onlinevc = bot.channels.get("748512266336469102");
	let gamerstay = bot.guilds.get('712286891902500874');
	var onlineCount = gamerstay.members.filter(m => m.presence.status === 'online').size + gamerstay.members.filter(m => m.presence.status === 'idle').size + gamerstay.members.filter(m => m.presence.status === 'dnd').size + gamerstay.members.filter(m => m.presence.status === 'offline').size
	onlinevc.setName("Członkowie: " + onlineCount);
});
bot.on('guildMemberAdd', member => {
 let lobby = bot.channels.get("712286891902500877");
	member.guild.channels.get('712286891902500877').send("Witaj " + member.user.username + "!\n**●** Na samym początku zapoznaj się z <#747054073487818782>, ponieważ znajdują się tam zasady, które należy przestrzegać grając na serwerze.\n**●** Następnie przeczytaj <#712299665827299386>, aby wiedzieć jak funkcjonuje nasz serwer na discordzie.\n**●** Gdy zapoznasz się z obydwona regulaminami, obczaj sobie te kanały: <#747055160173264896> oraz <#747444965549932564>, gdyż mogą one się przyczynić do lepszej znajomości chociażby mapy albo zasad działania klas.\n**●** Jesteś zainteresowany kupnem VIPa? Zapraszamy na kanał <#739248187922972732>.\n**●** Zostałaś/eś oprowadzona/y przez podstawowe kanały serwera. Zachęcamy do zapoznania się z pozostałymi kanałami, aktywnym udzielaniu się na serwerze, zakładania własnych sugestii dotyczących trybu, zgłaszania wszelkich wykrytych błędów oraz miłego spędzania czasu na naszym discordzie. <:3_:714210125149241407>");
});

bot.on('guildMemberRemove', member => {
 let lobby = bot.channels.get("712286891902500877");
	member.guild.channels.get('712286891902500877').send(member.user.username + " postanowił/a nas opuścić.");
});
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
	if(cmd === `${prefix}testwiadomościpowitalnej`){
	message.channel.send("Witaj `member.user.username`!\n**●** Na samym początku zapoznaj się z <#747054073487818782>, ponieważ znajdują się tam zasady, które należy przestrzegać grając na serwerze.\n**●** Następnie przeczytaj <#712299665827299386>, aby wiedzieć jak funkcjonuje nasz serwer na discordzie.\n**●** Gdy zapoznasz się z obydwona regulaminami, obczaj sobie te kanały: <#747055160173264896> oraz <#747444965549932564>, gdyż mogą one się przyczynić do lepszej znajomości chociażby mapy albo zasad działania klas.\n**●** Jesteś zainteresowany kupnem VIPa? Zapraszamy na kanał <#739248187922972732>.\n**●** Zostałaś/eś oprowadzona/y przez podstawowe kanały serwera. Zachęcamy do zapoznania się z pozostałymi kanałami, aktywnym udzielaniu się na serwerze, zakładania własnych sugestii dotyczących trybu, zgłaszania wszelkich wykrytych błędów oraz miłego spędzania czasu na naszym discordzie. <:3_:714210125149241407>");
	}
	
	if(cmd === `${prefix}testwiadomościpożegnalnej`){
			message.channel.send("`member.user.username` postanowił/a nas opuścić.");
	}
	if(cmd === `${prefix}profil`) {
		 const status = {
        online: "<:Dostepny:589178591716311040> Dostępny",
        idle: "<:Zaraz_wracam:589178609235918878> Zaraz wracam",
        dnd: "<:Nie_przeszadzac:589178624452591620> Nie przeszkadzać",
        offline: "<:Niedostepny_niewidoczny:589178578407784466> Niedostępny"
      }
let user = message.mentions.users.first() || message.author;
		 let channel = message.mentions.users.first() || message.author;
		 let gra = "w grze " + user.presence.game;
		 if(gra === "w grze Spotify") gra = "słucha muzyki na Spotify";
		 if(gra === "w grze " + null) gra = "aktualnie nie jest w grze";
		 if(gra === "w grze Custom Status") gra = "posiada *status własny*";
		if(gra === "w grze Breach moim życiem!!!") gra = "ogląda \"Breach moim życiem!!!\"";
		 let nazwa = `${user.username}#${user.discriminator} (ID: ${user.id})`
       let embed = new Discord.RichEmbed()
                 .setTitle("Profil")
                 .setTimestamp(new Date())
                 .setColor("#4286f4")
                 .setThumbnail(`${user.avatarURL}`)
                 .addField("Dane użytkownika", `${nazwa}` , inline = true)
                 .addField("Data utworzenia konta", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
       .addField("Status", `${status[user.presence.status]}, ${gra}`)
                        .addField("Najnowsza wiadomość", `${user.lastMessage} (ID: ${channel.lastMessageID})`)
       .setFooter(`${user.username}#${user.discriminator}`);
	
            return message.channel.send(embed);
	
        }

	
	if(cmd === `${prefix}vip`){
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Musisz posiadać uprawnienia Administratora, by użyć tej komendy, ${message.author}.`);
let member = message.mentions.members.first();
if(!member) return message.channel.send("Musisz @oznaczyć osobę, która ma dostać Vipa.");
		let role = message.guild.roles.find("name", "Vip");
        member.addRole(role).catch(console.error)
		message.channel.send(`${message.author} nadał użytkownikowi ${member} rangę Vip na okres 30 dni.`);
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
