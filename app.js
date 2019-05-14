const Discord = require("discord.js")
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const botconfig = require("./botconfig.json");
const fs = require("fs")
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});
// k0z4k bot
bot.commands = new Discord.Collection()

bot.on("ready", async () =>{
  console.log(`${bot.user.username} is online! It's running on ${bot.guilds.size} servers!`);
  bot.user.setActivity("!pomoc", {type: "WATCHING"});
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

	if (message.content === "!zaspamuj") { 
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
      var interval = setInterval (function () {
        message.channel.send("=== ŚCIANA SPAMU ===")
      }, 1 * 1); 
    }
	
	// json files
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	

	  if(cmd === `${prefix}administracja`){
    let admembed = new Discord.RichEmbed()
    .setDescription("**Administracja Serwera GamerStay**")
    .setColor("RANDOM")
    .setTimestamp(new Date())
.addField("Obecna ilość osób w administracji: **9**")
    .addField("HeadAdministratorzy", "<@329694416472375298>,\n <@306150715678654464>,\n <@348468240520970260>,\n <@301263420471246848>.")
    .addField("Administratorzy", "Aktualnie brak.")
    .addField("Moderatorzy", "<@336755369667723276>")
    .addField("Helperzy", "<@436567594460512267>")
    .addField("Chcesz dołączyć do Administracji GamerStay?", "Napisz podanie na <#469943798038790146> <:laf:470890277431934978>")
    return message.channel.send(admembed);
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
	
	
	
	if(cmd === `${prefix}nadaj-rolę`){
	let role = message.guild.roles.find(role => role.name === args[0]);
// Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
		if(!role) return message.channel.send("Poprawne użycie: !nadaj-rolę <nazwa roli> <nick>.")
let member = message.mentions.members.first();

// or the person who made the command: let member = message.member;

// Add the role!
member.addRole(role).catch(console.error)
		message.channel.send("Pomyślnie dodano rolę oznaczonemu użytkownikowi");

// Remove a role!
member.removeRole(role).catch(console.error)
		message.channel.send("Pomyślnie zabrano rolę oznaczonemu użytkownikowi");
	}
	if(cmd === `${prefix}hajs`){
	 let bal = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if (bal === null) bal = 0;

    message.channel.send('Posiadasz `' + bal + '` IQ')
//lol
		
	}
	if(cmd === `${prefix}dodaj-hajs`){
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.reply('Nie masz uprawnień do używania tej komendy.')
    }

    if (!args[0]) return message.reply('podaj liczbę hajsu.')
    if (isNaN(args[0])) return message.reply('That was not a valid number!')

    let user = message.mentions.users.first() || message.author
    message.channel.send('Successfully added ' + args[0] + ' to ' + user)
    db.add(`money_${message.guild.id}_${message.author.id}`, args[0])

}

     if(cmd === `${prefix}sklep`){
    let embed = new Discord.RichEmbed()
    .setTitle(`Sklep GamerStay!`)
    .setDescription('**Wpisz !kup <item>, aby coś zakupić.**')
    .addField(`Mądrala`, '`1000 IQ`\nDaje rolę Mądrala.')
    .addField(`VIP`, '`10000 IQ`\nDaje rolę VIP.')
    .addField(`Gra na Steam`, '`20000 IQ`\nGra na Steam.') // can add up to 25(I believe)
    .setColor("RANDOM") 

    message.channel.send(embed)


     
}
	if(cmd === `${prefix}rola`) {
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);
    if (!role) role = message.member.highestRole;


    let embed = new Discord.RichEmbed()
        .setColor(role.hexColor)
        .setTitle(`Rola: ${role.name}`)
        .addField('Liczba użytkowników w roli', role.members.size, true)
        .addField('Hex roli', role.hexColor, true)
        .addField('Data stworzenia roli', role.createdAt.toDateString(), true)
            .addField('Możliwa do wzmianki', role.mentionable.toString(), true)
        .addField('Pozycja w rolach (od dołu)', role.position .toString(), true)
        .addField('ID roli', role.id, true)
    .addField('Permisje roli', role.permissions, true);
    return message.channel.send(embed)
}
	
	if(cmd === `${prefix}emoji`) {
    let emoji = message.guild.emojis.get(args[0]) || message.guild.emojis.find(emoji => emoji.name === args[0]);
    if (!emoji) emoji = message.channel.send("Musisz podać jakąś emotkę! Pamiętaj, aby nie dawać dwukropka.");


    let embed = new Discord.RichEmbed()
        .setColor("#873873")
        .setTitle(`Emoji: <:${emoji.name}:${emoji.id}>`)
        .addField('Animowana?', emoji.animated, true)
        .addField('Nazwa emotki', emoji.name, true)
        .addField('Data stworzenia emotki', emoji.createdAt.toDateString(), true)
            .addField('Na serwerze', emoji.guild.toString(), true)
        .addField('ID emoji', emoji.id.toString(), true)
    .addField('Posiada dwukropki?', emoji.requiresColons, true)
    .addField('URL', emoji.url, true);
    return message.channel.send(embed)
}

	if(cmd === `${prefix}purge`) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 50)
      return message.reply("Proszę podać liczbę od 2 do 50.");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Nie mogę wykonać polecenia, ponieważ: ${error}`));
  }
	
if(cmd === `${prefix}wiadomość`){
let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if (!dUser) return message.channel.send("Nie ma takiego użytkownika!")
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Nie masz uprawnień do używania tej komendy.")
let dMessage = args.join(" ").slice(22);
if(dMessage.length < 1) return message.reply('Musisz napisać coś w wiadomości!')

dUser.send(`${dMessage}`)

}
	
	if(cmd === `${prefix}ustaw-awatar`) {
    let messageArray = message.content.split(" ");
    let command = messageArray[0]
    const args = messageArray.slice(1);
    let botmessage = args.join(" ");
    if(message.author.id !== '329694416472375298') return message.reply("Tylko <@329694416472375298> może użyć tej komendy!");


    let image = message.attachments.first().url;


    bot.user.setAvatar(image);

    let iEmbed = new Discord.RichEmbed()
        .setAuthor('✅ Photo altered successfully')
        .setColor('#1E90FF')
        .addField("Your message 1", "your message 2")
    message.channel.send(iEmbed)
}

  if (cmd === `${prefix}rangi`){
    message.channel.send("Możliwe rangi do dodania sobie: \n ?anime,\n ?css,\n ?eventy,\n ?furry,\n ?giveaway,\n ?html,\n ?metalowiec,\n ?nsfw,\n ?programowanie,\n ?python,\n ?qotd,\n ?tyralnia.");
  }
	 if (cmd === `${prefix}weryfikacja`){
    message.channel.send("**Jak poprawnie się zweryfikować?** \n**Krok 1.**\nPopatrz na ten obrazek: https://cdn.discordapp.com/attachments/527242378336010250/556935546098810890/weryfikacja2.PNG ^^.\n**Krok 2.** Zaznacz pod wiadomością na obrazku **2 RAZY** reakcję <:Dude:518909814248701993>.\n**Krok 3.** Ciesz się dostępem do całej części serwera!");
	 }
		
	if (cmd ===`${prefix}propozycja`){   //if command is suggest
		let user = message.author;
const channel = message.guild.channels.find(ch => ch.name === '✦》propozycje');  //finds the channel named suggestions 
		const gchannel = message.guild.channels.find(ch => ch.name === '✦》główny-chat');
		
		
let proembed = new Discord.RichEmbed()
.setDescription('**Propozycja od użytkownika:**\n\n' +              args.join(' '))
    .setColor("#00ffd4")
.setTimestamp(new Date())
.setFooter(`${user.username}#${user.discriminator}`)
                  .setThumbnail(`${user.avatarURL}`)
		     
		     channel.send(proembed)
		.then(function (msg) {
            msg.react("✅");
            msg.react("❎"); // You can only add two reacts
      ({timeout: 1000});
            })
		gchannel.send("[AUTOMATYCZNA WIADOMOŚĆ] Na <#495654275276472340> pojawiła się nowa propozycja.")
}     //Closes the if (command === 'suggest'){ 
	
	if (cmd ===`${prefix}propozycjatest`){   //if command is suggest
		let user = message.author;
const channel = message.guild.channels.find(ch => ch.name === 'testy');  //finds the channel named suggestions 
		const gchannel = message.guild.channels.find(ch => ch.name === 'ogólny');
		gchannel.startTyping(3);
		
let proembed = new Discord.RichEmbed()
.setDescription('**Propozycja od użytkownika:**\n\n' +              args.join(' '))
    .setColor("#00ffd4")
.setTimestamp(new Date())
.setFooter(`${user.username}#${user.discriminator}`)
                  .setThumbnail(`${user.avatarURL}`)
		     
		     channel.send(proembed)
		.then(function (msg) {
            msg.react("✅");
            msg.react("❎"); // You can only add two reacts
      ({timeout: 1000});
            })
		gchannel.send("[AUTOMATYCZNA WIADOMOŚĆ] BOIS obczajcie nową propozycję na <#495654037757362188>.");
}     //Closes the if (command === 'suggest'){ 
			     
	if(cmd === `${prefix}przypnij`){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej komendy.");
		 const pinMessage = message.pin;
message.channel.send(pinMessage)
		.then(function (msg) {
            msg.pin(pinMessage);
      ({timeout: 1000});
            })
	}
		
		
	if (cmd === `${prefix}mrr`){
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do używania tej k0z4k komendy.");
    message.channel.send("Imperator <@287999995230027787> sprawił, że <@351722490487373834> jest i będzie szczęśliwa!");
  }

  if(cmd === `${prefix}avatar`) {
    let user = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`)
    .setImage(user.displayAvatarURL)

    message.channel.send(embed)
  }

	
 
    // Create Embed
    let embed = new Discord.RichEmbed()
        .setColor("#ffffff") //To change color do .setcolor("#fffff")
        .setFooter('Aby zagłosować wystarczy wybrać odpowiednią reakcję.')
        .setDescription(args.join(' '))
	.setTitle(`Ankieta od użytkownika ${message.author.username}`);
        
    if(cmd === `${prefix}ankieta`)
	    message.channel.send(embed)
        .then(function (msg) {
            msg.react("❎");
            msg.react("✅"); // You can only add two reacts
            message.delete({timeout: 1000});
            }).catch(function(error) {
            console.log(error);
        });
	
	 // Create Embed
    let embedd = new Discord.RichEmbed()
        .setColor("#ffffff") //To change color do .setcolor("#fffff")
        .setFooter('Jest to głosowanie o przyjęcie nowej osoby do Administracji.')
        .setDescription(args.join(' '))
	.setTitle(`Ankieta od użytkownika ${message.author.username}`);
        
    if(cmd === `${prefix}adm-ankieta`)
	    message.channel.send(embedd)
        .then(function (msg) {
            msg.react("❎");
            msg.react("✅"); // You can only add two reacts
            message.delete({timeout: 1000});
            }).catch(function(error) {
            console.log(error);
        });
	
	 let embeddd = new Discord.RichEmbed()
        .setColor("#ffffff") //To change color do .setcolor("#fffff")
        .setFooter('Jeśli jesteś na TAK, daj reakcje - 😂, a jeśli jesteś na NIE, daj reakcje - :kotek:')
        .setDescription(args.join(' '))
	.setTitle(`Ankieta od użytkownika ${message.author.username}`);
        
    if(cmd === `${prefix}ankieta2`)
	    message.channel.send(embeddd)
        .then(function (msg) {
            msg.react("528574941725982728");
            msg.react("😂"); // You can only add two reacts
            message.delete({timeout: 1000});
            }).catch(function(error) {
            console.log(error);
        });
	
	 if(cmd === `${prefix}profil`) {
		 
let user = message.mentions.users.first() || message.author;
		 let channel = message.mentions.users.first() || message.author;
		 let gra = user.presence.game;
		 if(gra === null) gra = "aktualnie nie jest w grze";
       let embed = new Discord.RichEmbed()
                 .setTitle("Profil")
                 .setTimestamp(new Date())
                 .setColor("#4286f4")
                 .setThumbnail(`${user.avatarURL}`)
                 .addField("Nazwa Użytkownika", `${user.username}#${user.discriminator} (ID: ${user.id})` , inline = true)
                 .addField("Utworzono dnia", `${user.createdAt}`)      
       .addField("Status", `${user.presence.status}, w grze **${gra}**`)
                        .addField("Najnowsza wiadomość", `${user.lastMessage} (ID: ${channel.lastMessageID})`);
	
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
	if(cmd === `${prefix}gay`){
// lll
	    let gay = Math.round(Math.random() * 100);

    let gayembed = new Discord.RichEmbed()
        .setColor("#f442d4")
        .setTitle(`:gay_pride_flag: **${message.author.username} jest w ${gay}% gejem!** :gay_pride_flag:`);
    return message.channel.send(gayembed);
};
	
	
	  if(cmd === `${prefix}zakończmójżywotpls`) {
    let user = message.author;
    let embed = new Discord.RichEmbed()
.addField("Swój żywot właśnie zakończył", message.author)
	  message.channel.send(embed)
	  }
	if(cmd === `${prefix}ping`) {
    	message.channel.send("Pong!");
	}
	
		if(cmd === `${prefix}giveaway`) {
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie masz uprawnień do korzystania z tej komendy.");
    	message.channel.send("<@&476766899611369483> aby wziąć udział należy zareagować reakcją 🎉.")
		}
  if(cmd === `${prefix}zapytaj`){
  if(!args[1]) return message.reply("Zadaj pytanie!!!");
  let replies = ["Tak", "Nie", "Myślę, że tak", "Myślę, że nie", "idk", "domyśl się", "rusz głową", "kappa","nwm","Igor","( ͡° ͜ʖ ͡°)","xDDD","XD","XDDDD","WINIARY","( ͡ ͡° ͡°  ʖ ͡° ͡°)","ryż","płatki","maxus","maxus6","maxus69",
 "maxus69","maxus22","maxus24","maxus to dzban","myj ręce","Wypad","Nie odpowiem Ci na to pytanie, ponieważ nie ukończyłeś 18 roku życia","zboczeniec","pal gume","Jonek to właściciel","LOL","Fortnite to gówno za 0 zł","Tia","Oficjalny serwer discord GamerStay: https://discord.gg/D8C9GXK", "xd", "chyba u Ciebie w domu","pal wrotki","GamerStay to najlepszy serwer discord!!!",
 "kek","no chyba ty","Jonek","Matrix1773","Adlino","Diana","Akeno","AkeBo","Jenova",":retardthink:","MineCraft","Ennard","|Ennλrd|","nein","ogar","popatrz w prawo", "popatrz w lewo","popatrz za siebie","Jestem na Nie","Jestem na Tak","Jestem Neutralny","pij wodę","Pij wrotki",
 "MineCraft: Pocket Edition","WOW","Roblox","mhm","Kluczem","0.o","LaptopiX","Fortnight","oWo","Owo","onie","HMMMMMMMMMMM","hm","Placki","Lubię Placki","0w0","OrangeFoxy","EngiePL","Myszeczka","Klops","Klawiatura","Okniennica v2","Samochód", "Autokar","Illuminati","┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻" ];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setTimestamp(new Date())
  .setColor("#00e7ff")
  .addField("Pytanie", question)
  .addField("Odpowiedź", replies[result])
.addField("------------------", "Pamiętaj że bot losuje odpowiedzi i nie wie nawet co piszesz");
  message.channel.send(ballembed)

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

if(cmd === `${prefix}kik`){

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
	  
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie ma takiego użytkownika!")
    let reason = args.join(" ").slice(22);
	  let kanal = message.channel

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporty.")
    .setColor("#00e7ff")
    .addField("Zgłoszony użytkownik:", `${rUser}, ID użytkownika: ${rUser.id}.`)
    .addField("Zgłoszony przez:", `${message.author}, ID zgłaszającego: ${message.author.id}.`)
    .addField("Godzina wysłania:", message.createdAt)
    .addField("Na kanale:", message.channel)
    .addField("Powód:", reason)

    let reportschannel = message.guild.channels.find(`name`, "reporty");
    if(!reportschannel) return message.channel.send("Nie ma kanału od reportów.");

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
    .addField("Data stworzenia serwera", message.guild.createdAt)
    .addField("Data dołączenia na serwer", message.member.joinedAt)
    .addField("Założyciel serwera", message.guild.owner)
    .addField("ID Założyciela serwera", message.guild.owner.id)
    .addField("ID serwera", message.guild.id)
    .addField("Region serwera", message.guild.region)
    .addField("Liczba użytkowników", message.guild.memberCount)
    .addField("Poziom potwierdzenia konta", message.guild.verificationLevel)
    .addField("Liczba banów", message.bans.size)
    .setThumbnail(`${message.author.avatarURL}`);


    return message.channel.send(serverembed);

  }
	
  if(cmd === `${prefix}logoserwera`){

    let embed = new Discord.RichEmbed()
.setImage(message.guild.displayAvatarURL);
  }



  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Informacje na temat bota.")
    .setColor("#00f4ff")
.addField("Informacje", "Liczba komend: 34\nWersja bota: 1.2.0\nZajebistość: 62%\nData utworzenia bota: 13.08.18");
    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}pomoc`){

    let helpembed = new Discord.RichEmbed()
    .setDescription("Komendy bota.")
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .addField("!administracja", "Spis administracji serwera.")
    .addField("!ankieta <treść>","Tworzysz publiczną ankietę.")
    .addField("!avatar <nick>", "Pokazuje avatar oznaczonej osoby.")
    .addField("!botinfo", "Informacje o serwerowym bocie.")
    .addField("!dobranoc", "Bot pisze 'Dobranoc :3'.")
    .addField("!dzień-dobry", "Bot pisze 'Dzień Dobry'.")
    .addField("!gay", "Bot pokazuje Ci w ilu procentach jesteś gejem.")
    .addField("!hug <nick>", "Przytulasz oznaczoną osobę.")
    .addField("!najnowsza-wiadomość <nick>", "Możesz zobaczyć najnowszą wiadomość oznaczonej osoby.")
    .addField("!pomoc-admin","Lista komend dla administracji.")
    .addField("~~!profil~~ Aktualnie komenda niedostępna.","~~Pokazuje informacje o użytkowniku.~~")
    .addField("!rangi", "Lista ról, które można sobie samemu dodać.")
    .addField("!report <nick> <powód>", "Reportujesz osobę która łamie regulamin po czym administracja rozpatrza twoje zgłoszenie.")
    .addField("!rola <nazwa roli>", "Informacje na temat danej roli.")
    .addField("!serverinfo", "Informacje dotyczące serwera.")
    .addField("!slot", "Losujesz sobie, jeśli trafisz trzy :seven:, to coś się stanie.")
    .addField("!weryfikacja", "Informacja jak się poprawnie zweryfikować.")
    .addField("!wybierz <papier|kamień|nożyce>", "Działa to tak, że wpiszesz komendę, to bot wybierze papier, kamień lub nożyce i napisze czy wygrałeś, czy przegrałeś czy zremisowałeś.")
    .addField("!zapal", "Zaczynasz palić gumę.")
    .addField("!zapytaj <treść>", "Pytasz się o coś bota, a on Ci odpowiada.");

  
	
return message.channel.send(helpembed);
	   
  }
  if(cmd === `${prefix}pomoc-admin`){
    let helpaembed = new Discord.RichEmbed()
    .setDescription("Komendy administracyjne bota.")
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .addField("!ban <nick> <powód>", "Banujesz oznaczonego użytkownika.")
 .addField("!kick <nick> <powód>", "Wyrzucasz oznaczonego użytkownika.")
 .addField("!mrr", "Nani.")
     .addField("!pisz-wiecznie", "Bot będzie pisał na kanale wiadomość, dopóki nie wyłączy się tego komendą !zatrzymaj-pisanie.")
    .addField("!przypnij <treść>", "Robi to samo co !say, ale dodatkowo przypina wiadomość.")
 .addField("!purge <ilość>", "Usuwasz od 2 do 50 najnowszych wiadomości.")
 .addField("!say <treść>", "Wysyłasz wiadomość używając bota.")
 .addField("!ustaw-awatar <link>", "Ustawiasz botowi dowolny awatar.")
 .addField("!wiadomość <nick>", "Wysyłasz oznaczonemu użytkownikowi wiadomość na PW.")
	   .addField("!zaspamuj", "Bot zacznie spamić na kanale.")
     .addField("!zatrzymaj-pisanie", "Zatrzymuje pisanie bota.");
    
    return message.channel.send(helpaembed);
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
		if(cmd === `${prefix}dzień-dobry`){
	  message.channel.send('D').then(async msg => {
  setTimeout(() => {
    msg.edit('Dz');
  }, 750);
  setTimeout(() => {
    msg.edit('Dzi ');
  }, 1500);
  setTimeout(() => {
    msg.edit('Dzie ');
  }, 2250);
  setTimeout(() => {
    msg.edit('Dzień ');
  }, 3000);
  setTimeout(() => {
    msg.edit('Dzień D');
  }, 3750);
  setTimeout(() => {
    msg.edit('Dzień Do');
  }, 4500);
  setTimeout(() => {
    msg.edit('Dzień Dob ');
  }, 5250);
  setTimeout(() => {
    msg.edit(`Dzień Dobr`);
  }, 6000);
	  setTimeout(() => {
		  msg.edit(`Dzień Dobry`);
	  }, 6750);
});
};
	
	if(cmd === `${prefix}dobranoc`){
	  message.channel.send('D').then(async msg => {
  setTimeout(() => {
    msg.edit('Do');
  }, 750);
  setTimeout(() => {
    msg.edit('Dob ');
  }, 1500);
  setTimeout(() => {
    msg.edit('Dobr');
  }, 2250);
  setTimeout(() => {
    msg.edit('Dobra ');
  }, 3000);
  setTimeout(() => {
    msg.edit('Dobran');
  }, 3750);
  setTimeout(() => {
    msg.edit('Dobrano');
  }, 4500);
  setTimeout(() => {
    msg.edit('Dobranoc ');
  }, 5250);
  setTimeout(() => {
    msg.edit(`Dobranoc :`);
  }, 6000);
	  setTimeout(() => {
		  msg.edit(`Dobranoc :3`);
	  }, 6750);
});
};
	const yourID = ""; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!createrolemessage"
let initialMessage = `**Zareaguj pod wiadomością, aby otrzymać rolę!**`;
const roles = ["Dziweczyna", "Chłopak"];
const reactions = ["💻", "🖌"];
const botToken = ""; /*You'll have to set this yourself; read more
                     here https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token*/

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }  
	});

	
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
