// Wszelkie treści poniżej należą do Jonek#3313. Kopiowanie zabronione ©

const Discord = require("discord.js")
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const botconfig = require("./botconfig.json");
const fs = require("fs")
const client = new Discord.Client();
const talkedRecently = new Set();
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()
process.setMaxListeners(1);
	bot.on("ready", async () =>{
  console.log(`${bot.user.username} jest online! Aktualnie jest na ${bot.guilds.size} serwerach.`);
  bot.user.setActivity("Breach moim życiem!!!", {type: "PLAYING"});
	let onlinevc = bot.channels.get("703564715913379891");
	let gamerstay = bot.guilds.get('701390743767351316');
	var onlineCount = gamerstay.members.filter(m => m.presence.status === 'online').size
	onlinevc.setName(onlineCount + " osób jest teraz online!");
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
		  let wiado = bot.channels.get("621435687409025043");
		  let cos = (message.author.username + " napisał do autorskiego bota na pw: " + message.content);
		 wiado.send(cos);
	  }
	
 bot.on("messageDelete", async message =>{
  let LoggingEmbed = new Discord.RichEmbed()
.setTitle("BREAKING NEWS! Ktoś usunął wiadomość!")
.setColor("#d65cff")
.setThumbnail(message.avatarURL)
 .addField("Treść:", message.content)
.addField("Usunięta wiadomość autorstwa: ", message.author.tag)
.addField("Na kanale: ", message.channel)
.addField("O godzinie: ", message.createdAt)
.setFooter("Ojojoj");
let logChannel = message.guild.channels.find(c => c.name === "logi_discord")
if(!logChannel) return;

logChannel.send(LoggingEmbed);
});

	if (message.content === "!zaspamuj") { 
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
      var interval = setInterval (function () {
        message.channel.send("=== ŚCIANA SPAMU ===")
      }, 1 * 1); 
	}

	if(cmd === `${prefix}pisz-wiecznie`){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
		let channel = message.channel
		message.channel.send("Od teraz będę pisać wiecznie. Aby to wyłączyć, wpisz !zatrzymaj-pisanie")
		channel.startTyping(999999);
	}
	
	if(cmd === `${prefix}zatrzymaj-pisanie`){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
		let channel = message.channel
		channel.stopTyping(true);
	}
	

	if(cmd === `${prefix}rola`) {
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);
    if (!role) role = message.member.highestRole;
let channel = message.channel;

    let embed = new Discord.RichEmbed()
        .setColor(role.hexColor)
        .setTitle(`Rola: ${role.name}`)
        .addField('Liczba użytkowników w roli', role.members.size, true)
        .addField('Hex roli', role.hexColor, true)
        .addField('Data stworzenia roli', role.createdAt.toDateString(), true)
            .addField('Możliwa do wzmianki', role.mentionable.toString(), true)
        .addField('Pozycja w rolach (od dołu)', role.position.toString(), true)
        .addField('ID roli', role.id, true)
    .addField('Permisje roli', role.permissions, true);
    return message.channel.send(embed)
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


  if(cmd === `${prefix}avatar`) {
    let user = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`)
    .setImage(user.displayAvatarURL)

    message.channel.send(embed)
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

   if(cmd === `${prefix}najnowsza-wiadomość`){
	   let user = message.mentions.users.first() || message.author;
	   let lastwiad = user.lastMessage
	   if(lastwiad === null) lastwiad = "Ten użytkownik nie napisał ostatnio żadnej wiadomości!";
	   let nEmbed = new Discord.RichEmbed()
	   .setTimestamp(new Date())
	   .setColor("#123456")
	   .addField("Najnowsza wiadomość napisana przez użytkownika" , `<@${user.id}>: ${lastwiad}`)
		 return message.channel.send(nEmbed);
		     }

	
	if(cmd === `${prefix}ping`) {
    	message.channel.send("Pong!");
	}
	

	
	 if(cmd === `${prefix}say`) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

if(cmd === `${prefix}kick`){

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Nie ma takiego użytkownika!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nie możesz wyrzucić tej osoby, ponieważ nie masz uprawnień!");
   if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Nie możesz wyrzucić z serwera tej osoby!");

   let kickEmbed = new Discord.RichEmbed()
   .setDescription("Kick")
   .setColor("#00e7ff")
   .addField("Wyrzucony użytkownik", `${kUser}, ID użytkownika ${kUser.id}`)
   .addField("Wyrzucony przez", `<@${message.author.id}>, ID użytkownika: ${message.author.id}`)
   .addField("Na kanale", message.channel)
   .addField("O godzinie", message.createdAt)
   .addField("Powód", kReason);

   let kickChannel = message.guild.channels.find(`name`, "logi");
   if(!kickChannel) return message.channel.send("Nie mogę znaleść danego kanału.");

   message.guild.member(kUser).kick(kReason);

   kickChannel.send(kickEmbed);

   return;
	

 }

 if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nie ma takiego użytkownika!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Nie możesz zbanować z serwera tej osoby!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#00e7ff")
    .addField("Zbanowany użytkownik", `${bUser}, ID użytkownika ${bUser.id}`)
    .addField("Zbanowany przez", `<@${message.author.id}>, ID użytkownika: ${message.author.id}`)
    .addField("Na kanale", message.channel)
    .addField("O godzinie", message.createdAt)
    .addField("Powód", bReason);

    let banChannel = message.guild.channels.find(`name`, "logi");
	 let banChannel2 = message.channel
    if(!banChannel) return message.channel.send("Nie mogę znaleść danego kanału.");

    message.guild.member(bUser).ban(bReason);

    banChannel.send(banEmbed);
	  banChannel2.send(banEmbed);

    return;
  }

  if(cmd === `${prefix}report`){
	  
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie ma takiego użytkownika bądź nikogo nie oznaczyłeś/aś.\n\n*Poprawne użycie: !report @nick powód*")
    let reason = args.join(" ").slice(22);
	  if(!reason) return message.channel.send("Musisz podać powód reporta.\n\n*Poprawne użycie: !report @nick powód*")
	  let kanal = message.channel

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Nowe zgłoszenie.")
    .setColor("#00e7ff")
    .addField("Zgłoszony użytkownik:", `${rUser} (ID: ${rUser.id})`)
    .addField("Zgłoszony przez:", `${message.author} (ID: ${message.author.id})`)
    .addField("Godzina wysłania:", `${moment.utc(message.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')} (na kanale ${message.channel})`)
    .addField("Powód:", reason)

    let reportschannel = message.guild.channels.find(`name`, "reporty");
    if(!reportschannel) return message.channel.send("Kanał od reportów musi się nazywać `#reporty`.");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);
	  kanal.send("Report został pomyślnie wysłany.")

    return;
  }

  if(cmd === `${prefix}serverinfo`){

    let serverembed = new Discord.RichEmbed()

    .setDescription("**Informacje serwera**", message.guild.name)
    .setColor("#00e7ff")
    .setTimestamp(new Date())
    .addField("Założyciel serwera", message.guild.owner, true)
    .addField("ID Założyciela serwera", message.guild.owner.id, true)
    .addField("ID serwera", message.guild.id, true)
    .addField("Liczba użytkowników", message.guild.memberCount, true)
        .addField("Data stworzenia serwera", `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
    .setThumbnail(`${message.author.avatarURL}`);


    return message.channel.send(serverembed);

  }

   
//if(cmd === `${prefix}trump`){	
//	var replys = [
 //   "https://media.giphy.com/media/xTiTnHXbRoaZ1B1Mo8/giphy.gif",
//          "https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif",
  //        "https://media.giphy.com/media/wJNGA01o1Zxp6/giphy.gif",
   //       "https://media.giphy.com/media/TIyJGNK325XGciFEnI/giphy.gif",
   //       "https://media.giphy.com/media/O1GhSbro4z4Dm/giphy.gif",
//
   //       ];
   //       let gif = (replys[Math.floor(Math.random() * replys.length)])
    //      let embed = new Discord.RichEmbed()
     //     .setColor("RANDOM")
     //     .setImage(gif)
    //      .setFooter('Trump')  
  //
//  message.channel.send(embed)
//}
	
	if(cmd === `${prefix}zapal`){
	  message.channel.send('**ja PAAAAAAAAALE GUUUUUUUUME**').then(async msg => {
  setTimeout(() => {
    msg.edit('🚬');
  }, 500);
  setTimeout(() => {
    msg.edit('🚬 ☁ ');
  }, 1000);
  setTimeout(() => {
    msg.edit('🚬 ☁☁ ');
  }, 1500);
  setTimeout(() => {
    msg.edit('🚬 ☁☁☁ ');
  }, 2000);
  setTimeout(() => {
    msg.edit('🚬 ☁☁');
  }, 2500);
  setTimeout(() => {
    msg.edit('🚬 ☁');
  }, 3000);
  setTimeout(() => {
    msg.edit('🚬 ');
  }, 3500);
  setTimeout(() => {
    msg.edit(`Palenie gumy skończoned`);
  }, 4000);
});
};

	
if (cmd.startsWith(prefix + 'hug')) {
    let hug = [
        "https://data.whicdn.com/images/221692186/original.gif",
        "http://mrwgifs.com/wp-content/uploads/2013/04/Ouran-High-School-Host-Club-Love-Hug-Gif.gif",
        "http://images6.fanpop.com/image/photos/33100000/Kyoya-and-Tamaki-ouran-high-school-host-club-33132917-500-375.gif",
        "http://31.media.tumblr.com/4d6525e7b5e546cde555bf2453563335/tumblr_mskyp8XJcb1r40gm7o1_1280.gif",
        "https://i.pinimg.com/originals/34/dc/98/34dc98f17fd5cf558611f14ff9a0c1c9.gif",
        "https://78.media.tumblr.com/6bef64140dfefe6fe86089c6eb11fb9b/tumblr_ohhnjyDJll1vm2xpgo1_500.gif",
        "https://78.media.tumblr.com/806c23dbcf9bde033e708c8679c63975/tumblr_inline_ohhtig3BpF1rz9r19_540.gif",
        "https://i.pinimg.com/originals/0f/48/1b/0f481bfc59229ce8127f2aba52bb8f4a.gif",
        "https://pa1.narvii.com/6276/4461c2a865973bddcc5f4e591a165e09275c7a2c_hq.gif",
        "https://78.media.tumblr.com/7e29c1e560c527de00a9f57bb7d941c3/tumblr_inline_ohi8745BbI1u9qbij_540.gif",
        "https://data.whicdn.com/images/271163043/original.gif",
        "https://78.media.tumblr.com/d00aba2e25ac11a11d9c5a770275dfc8/tumblr_orpdyc83FN1rtwid9o1_500.gif",
        "http://0.media.dorkly.cvcdn.com/33/43/cac85de1cfd2bc4e7bec36631b260156.gif",
        "https://i.pinimg.com/originals/22/8a/c9/228ac960b7c24ffb87374857fa6a0920.gif",
        "https://pa1.narvii.com/6333/8c254b88d099c03be84769075ecac875c5dbb4bb_hq.gif",
        "https://pa1.narvii.com/6449/c5383d0a548987d69aac06e8dc9b270219159b3f_hq.gif",
        "https://media1.tenor.com/images/100c453c2f411189b40e6931ff65a88b/tenor.gif?itemid=7210521",
        "https://i.pinimg.com/originals/e5/0e/c8/e50ec889ef64432e5d4648370014d272.gif",
        "https://78.media.tumblr.com/94f62f2fbca608f70a48e6c04c2dc27c/tumblr_orotkrEC4t1vbbkedo2_540.gif",
        "http://i0.kym-cdn.com/photos/images/original/001/266/481/075.gif",
        "https://data.whicdn.com/images/310192271/original.gif",
        "https://78.media.tumblr.com/064596e2fb0101675b89d79ac41141e0/tumblr_p8g2jmxCLD1qc9mvbo1_540.gif",
    ]
    let hugresult = Math.floor((Math.random() * hug.length));
    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} sam/a siebie przytulił/a...`)
            .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const hembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} przytulił/a ${message.mentions.members.first().user.username}! Jak słodko!`)
            .setImage(hug[hugresult])
        message.channel.send({
            embed: hembed
        })
        return;
    }
    const ghembed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle(`${message.author.username} sam/a siebie przytulił/a...`)
        .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
    message.channel.send({
        embed: ghembed
    })
	

}
	
	if (cmd.startsWith(prefix + 'slap')) {
    let slap = [
        "https://cdn.discordapp.com/attachments/468468353367932929/572460262829981719/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif",
        "https://cdn.discordapp.com/attachments/468468353367932929/572460221213966336/giphy_1.gif",
	"https://cdn.discordapp.com/attachments/468468353367932929/572460090674905088/379.gif",
	"https://cdn.discordapp.com/attachments/468468353367932929/572460310196256793/giphy.gif",
	 "https://i.gifer.com/VF8X.gif",
    ]
    let slapresult = Math.floor((Math.random() * slap.length));
    if (!args[0]) {
        const gsembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} sam/a siebie pacnął/eła...`)
            .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
        message.channel.send({
            embed: gsembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const sembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} pacnąć/ęła ${message.mentions.members.first().user.username}!`)
            .setImage(slap[slapresult])
        message.channel.send({
            embed: sembed
        })
        return;
    }
    const ghembed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle(`${message.author.username} sam/a siebie pacnął/eła...`)
        .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
    message.channel.send({
        embed: ghembed
    })

}
})

bot.login(process.env.BOT_TOKEN)
