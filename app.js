const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

bot.on("ready", async () =>{
  console.log(`${bot.user.username} is online! It's running on ${bot.guilds.size} servers!`);
  bot.user.setActivity("https://discord.gg/D8C9GXK <== Link Zaproszeniowy na serwer GamerStay", {type: "WATCHING"});
})

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
       
  if(cmd === `${prefix}avatar`) {
    let user = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)

    message.channel.send(embed)
  }

  
  
  
  
  if(cmd === `${prefix}zapytaj`){
  if(!args[1]) return message.reply("Zadaj pytanie!!!");
  let replies = ["Tak", "Nie", "Myślę, że tak", "Myślę, że nie", "idk", "domyśl się", "rusz głową", "kappa","nwm","Igor","( ͡° ͜ʖ ͡°)","xDDD","XD","XDDDD","WINIARY","( ͡ ͡° ͡°  ʖ ͡° ͡°)","ryż","płatki","maxus","maxus6","maxus69",
 "maxus69","maxus22","maxus24","maxus to dzban","myj ręce","Wypad","Nie odpowiem Ci na to pytanie, ponieważ nie ukończyłeś 18 roku życia","zboczeniec","pal gume","Jonek to właściciel","LOL","Fortnite to gówno za 0 zł","Tia","Oficjalny serwer discord GamerStay: https://discord.gg/D8C9GXK", "xd", "chyba u Ciebie w domu","pal wrotki","Tak, zaGadka to gówno","zaGadka to gówno","GamerStay to najlepszy serwer discord!!!",
 "kek","no chyba ty","Jonek","Matrix1773","Adlino","Diana","Akeno","AkeBo","Jenova",":retardthink:","MineCraft","Ennard","|Ennλrd|","nein","ogar","popatrz w prawo", "popatrz w lewo","popatrz za siebie","Jestem na Nie","Jestem na Tak","Jestem Neutralny","pij wodę","Pij wrotki",
 "MineCraft: Pocket Edition", "https://www.youtube.com/channel/UCSseDibgjR-UsktL3nzOK1w","WOW","Roblox","mhm","Kluczem","0.o","LaptopiX","Fortnight","oWo","Owo","onie","HMMMMMMMMMMM","hm","Placki","Lubię Placki","0w0","OrangeFoxy","EngiePL","Myszeczka","Klops","Klawiatura","Okniennica v2","Samochód", "Autokar","Illuminati","┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻" ];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#00e7ff")
  .addField("Pytanie", question)
  .addField("Odpowiedź", replies[result]);

  message.channel.send(ballembed)

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

 if(cmd === `${prefix}profil`) {
       let botembed = new Discord.RichEmbed()
                 .setTitle("Profil")
                 .setTimestamp(new Date())
                 .setColor("#4286f4")
                 .setThumbnail(`${message.author.avatarURL}`)
                 .addField("Nazwa Użytkownika", `${message.author.username}`, inline = true)
            return message.channel.send(botembed);
        }

 if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nie ma takiego użytkownika!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nie możesz zbanować tej osoby, ponieważ nie masz uprawnień!");
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
    if(!banChannel) return message.channel.send("Nie mogę znaleść danego kanału.");

    message.guild.member(bUser).kick(bReason);

    banChannel.send(banEmbed);

    return;
  }





  if(cmd === `${prefix}zglos`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie ma takiego użytkownika!")
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporty")
    .setColor("#00e7ff")
    .addField("Zgłoszony użytkownik", `${rUser}, ID użytkownika: ${rUser.id}`)
    .addField("Zgłoszony przez", `${message.author}. ID zgłaszającego: ${message.author.id}`)
    .addField("Godzina wysłania", message.createdAt)
    .addField("Na kanale", message.channel)
    .addField("Powód", reason);

    let reportschannel = message.guild.channels.find(`name`, "reporty");
    if(!reportschannel) return message.channel.send("Nie ma kanału od reportów");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);

    return;
  }


  if(cmd === `${prefix}report`){

    message.channel.send("Report został pomyślnie wysłany")
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie ma takiego użytkownika!")
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporty")
    .setColor("#00e7ff")
    .addField("Zgłoszony użytkownik", `${rUser}, ID użytkownika: ${rUser.id}`)
    .addField("Zgłoszony przez", `${message.author}. ID zgłaszającego: ${message.author.id}`)
    .addField("Godzina wysłania", message.createdAt)
    .addField("Na kanale", message.channel)
    .addField("Powód", reason)

    let reportschannel = message.guild.channels.find(`name`, "reporty");
    if(!reportschannel) return message.channel.send("Nie ma kanału od reportów");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);

    return;
  }



  if(cmd === `${prefix}serverinfo`){

    let serverembed = new Discord.RichEmbed()
    .setDescription("**Informacje serwera**", message.guild.name)
    .setColor("#00e7ff")
    .addField("Data stworzenia serwera", message.guild.createdAt)
    .addField("Data dołączenia na serwer", message.member.joinedAt)
    .addField("Założyciel serwera", message.guild.owner)
    .addField("ID Założyciela serwera", message.guild.owner.id)
    .addField("ID serwera", message.guild.id)
    .addField("Region serwera", message.guild.region)
    .addField("Wszystkich użytkowników jest", message.guild.memberCount)
    .addField("Poziom potwierdzenia konta", message.guild.verificationLevel)
    .addField("Duży serwer?", message.guild.large);


    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}logoserwera`){

    let embed = new Discord.RichEmbed()
.setImage(message.guild.displayAvatarURL);
  }



  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Bot powstał dnia 13.08.18.")
    .setColor("#00f4ff")
    .addField("Kagami", bot.user.username);

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}pomoc`){

    let helpembed = new Discord.RichEmbed()
    .setDescription("Komendy bota")
    .setColor("RANDOM")
    .addField("!report <nick> <powód>", "reportujesz osobę która łamie regulamin po czym administracja rozpatrza twoje zgłoszenie")
    .addField("!serverinfo", "informacje dotyczące serwera")
    .addField("!ban <nick> <powód>", "banujesz osobę. [Tylko dla Administracji]")
    .addField("!kick <nick> <powód>", "wyrzucasz osobę z serwera [Tylko dla Administracji]")
    .addField("!zapytaj <treść>", "pytasz się o coś bota, a on Ci odpowiada")
    .addField("!avatar <Nick>", "pokazuje avatar oznaczonej osoby")
    .addField("!wybierz <papier|kamień|nożyce>", "Działa to tak, że wpiszesz komendę to bot wybierze papier, kamień lub nożyce i napisze czy wygrałeś, czy przegrałeś.")
    .addField("!zapal", "zaczynasz palić gumę :3")
    .addField("!hug", "przytulasz oznaczoną osobę");

    return message.channel.send(helpembed);
  }
  
  if(cmd === `${prefix}wybierz`){
    var choice = args[0];
  if (choice == "papier" || choice == "p") {
    var numb = Math.floor(Math.random() * 100);
    if (numb <= 50) {
      var choice2 = "papier";
    } else if (numb > 50) {
      var choice2 = "kamień";
    } else {
      var choice2 = "nożyce";
    }
    if (choice2 == "nożyce") {
      var response = "Ja wybrałam **Nożyce**! :v: Przegrałeś!"
    } else if (choice2 == "papier") {
      var response = "Ja wybrałam **Papier**! :hand_splayed: Remis!"
    } else {
      var response = "Ja wybrałam **Kamień**! :punch: Wygrałeś!"
    }
    message.channel.send(response);
  } else if (choice == "kamień" || choice == "r") {
    var numb = Math.floor(Math.random() * 100);
    if (numb <= 50) {
      var choice2 = "papier";
    } else if (numb > 50) {
      var choice2 = "kamień";
    } else {
      var choice2 = "nożyce";
    }
    if (choice2 == "paper") {
      var response = "Ja wybrałam **Papier**! :hand_splayed: Przegrałeś"
    } else if (choice2 == "rock") {
      var response = "Ja wybrałam **Kamień**! :punch: Remis"
    } else {
      var response = "Ja wybrałam **Nożyce**! :v: Wygrałeś"
    }
    message.channel.send(response);
  } else if (choice == "nożyce" || choice == "s") {
    var numb = Math.floor(Math.random() * 100);
    if (numb <= 50) {
      var choice2 = "papier";
    } else if (numb > 50) {
      var choice2 = "kamień";
    } else {
      var choice2 = "nożyce";
    }
    if (choice2 == "kamień") {
      var response = "Ja wybrałam **Papier**! :hand_splayed: Wygrałeś!"
    } else if (choice2 == "nożyce") {
      var response = "Ja wybrałam **Nożyce**! :v: Remis"
    } else {
      var response = "Ja wybrałam **Kamień**! :punch: Przegrałeś!"
    }
    message.channel.send(response);
  } else {
    message.channel.send(`Musisz wpisać \`${prefix}wybierz \` <kamień|papier|nożyce>`);
  }
}
  
  if (cmd === `${prefix}slot`) {
	    var replys1 = [
	        ":gem: : :gem: : :gem: ",
	        ":lemon: : :lemon: : :lemon: ",
	        ":seven: : :seven: : :seven: ",
	        ":bell: : :bell: : :bell:",
	        ":cherries: : :cherries: : :cherries: ",
	        ":star: : :star: : :star: ",
	        ":gem: : :star: : :seven: ",
	        ":star: : :bell: : :bell:",
	        ":star: : :star: : :cherries: ",
	        ":gem: : :gem: : :cherries:",
	        ":gem: : :seven: : :seven: ",
	        ":star: : :bell: : :lemon: ",
	        ":star: : :star: : :cherries: ",
	        ":seven: : :star: : :star: ",
	        ":star: : :star: : :seven: ",
	        ":gem: : :gem: : :seven: "
	    ];
	    let reponse = (replys1[Math.floor(Math.random() * replys1.length)])

	    var replys2 = [
	        ":gem: : :gem: : :gem: ",
	        ":lemon: : :lemon: : :lemon: ",
	        ":seven: : :seven: : :seven: ",
	        ":bell: : :bell: : :bell:",
	        ":cherries: : :cherries: : :cherries: ",
	        ":gem: : :star: : :seven: ",
	        ":star: : :bell: : :bell:",
	        ":star: : :star: : :cherries: ",
	        ":gem: : :gem: : :cherries:",
	        ":gem: : :seven: : :seven: ",
	        ":star: : :bell: : :lemon: ",
	        ":star: : :star: : :cherries: ",
	        ":seven: : :star: : :star: ",
	        ":star: : :star: : :seven: ",
	        ":gem: : :gem: : :seven: ",
	        ":gem: : :cherries: : :cherries:",
	        ":gem: : :bell: : :star:"
	    ];
	    let reponse2 = (replys2[Math.floor(Math.random() * replys2.length)])
	    var replys3 = [
	        ":lemon: : :lemon: : :lemon: ",
	        ":bell: : :bell: : :bell:",
	        ":cherries: : :cherries: : :cherries: ",
	        ":star: : :star: : :star: ",
	        ":gem: : :star: : :seven: ",
	        ":star: : :bell: : :bell:",
	        ":star: : :star: : :cherries: ",
	        ":gem: : :gem: : :cherries:",
	        ":gem: : :seven: : :seven: ",
	        ":star: : :bell: : :lemon: ",
	        ":star: : :star: : :cherries: ",
	        ":seven: : :star: : :star: ",
	        ":star: : :star: : :seven: ",
	        ":gem: : :gem: : :seven: "
	    ];
	    let reponse3 = (replys3[Math.floor(Math.random() * replys3.length)])

	    const embed = new Discord.RichEmbed()
	        .setColor("#FE0101")
	        .setTitle(`**[ :slot_machine: @${message.author.tag} użył maszynę! :slot_machine: ]**`)
	        .addField("**-------------------**", "** **")
	        .addField(`${reponse} \n \n${reponse2}**<** \n \n${reponse3}`, `** **`)
	        .addField("**-------------------**", "** **")
	        .setDescription("** **")
	    message.channel.send(embed)
	}
    
if(cmd === `${prefix}trump`){	
	var replys = [
    "https://media.giphy.com/media/xTiTnHXbRoaZ1B1Mo8/giphy.gif",
          "https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif",
          "https://media.giphy.com/media/wJNGA01o1Zxp6/giphy.gif",
          "https://media.giphy.com/media/TIyJGNK325XGciFEnI/giphy.gif",
          "https://media.giphy.com/media/O1GhSbro4z4Dm/giphy.gif",

          ];
          let gif = (replys[Math.floor(Math.random() * replys.length)])
          var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setImage(gif)
          .setFooter('Trump')  
  
  message.channel.send(embed)
}
	
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
})

bot.login(process.env.BOT_TOKEN)
