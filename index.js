const Discord = require('discord.js');
const client = new Discord.Client();
const CronJob = require('cron').CronJob;
const query = require("source-server-query");
//var config = require("./config.json");
const fs = require("fs");


let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);
var change_json = false;

//=======================================//
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var guild = client.guilds.cache.get(config.discord_server_id);
    if (!guild) return console.log('Unable to find guild. Check config.json');

    for (let key in config.servers) {
        var server = config.servers[key];

        if (config.showname) {
            if (server.channel_name == "") {
                change_json = true;
                guild.channels.create('channel_name', {
                    type: 'voice',
                    permissionOverwrites: [{
                        id: guild.roles.everyone.id,
                        deny: ['CONNECT'],
                    }],
                }).then(result => {
                    config.servers[key].channel_name = result.id
                });

            }
        }
        if (config.showmap) {
            if (server.channel_map == "") {
                change_json = true;
                guild.channels.create('channel_map', {
                    type: 'voice',
                    permissionOverwrites: [{
                        id: guild.roles.everyone.id,
                        deny: ['CONNECT'],
                    }],
                }).then(result => {
                    config.servers[key].channel_map = result.id
                });

            }
        }
        if (config.showgamemode) {
            if (server.channel_gamemode == "") {
                change_json = true;
                guild.channels.create('channel_gamemode', {
                    type: 'voice',
                    permissionOverwrites: [{
                        id: guild.roles.everyone.id,
                        deny: ['CONNECT'],
                    }],
                }).then(result => {
                    config.servers[key].channel_gamemode = result.id
                });

            }
        }
        if (config.showplayers) {
            if (server.channel_players == "") {
                change_json = true;
                guild.channels.create('channel_players', {
                    type: 'voice',
                    permissionOverwrites: [{
                        id: guild.roles.everyone.id,
                        deny: ['CONNECT'],
                    }],
                }).then(result => {
                    config.servers[key].channel_players = result.id
                });

            }
        }
    }
    if (change_json) {
        setTimeout(function() {
            fs.writeFile("config.json", JSON.stringify(config, null, 2), function(err) {
                if (err) throw err;
                console.log("Settings SAVED");
                job.start();
            });

        }, 3000);
    } else {
       job.start();
    }

});

function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, () => args[i++]);
}

async function update_server_info(server, info) {
    console.log('Updating channels info');
    //must add extra check here
    try {
        if (config.showname) {
            var channel = client.channels.cache.get(server.channel_name);
            channel.setName(parse(config.text_name, info.name));
        }
        if (config.text_map) {
            var channel = client.channels.cache.get(server.channel_map);
            channel.setName(parse(config.text_map, info.map));
        }
        if (config.showgamemode) {
            var channel = client.channels.cache.get(server.channel_gamemode);
            channel.setName(parse(config.text_gamemode, info.game));
        }
        if (config.showplayers) {
            var channel = client.channels.cache.get(server.channel_players)
            channel.setName(parse(config.text_players, info.playersnum, info.maxplayers));
        }
        console.log("done");
    } catch (err) {
        console.log(err);
    }

}
var job = new CronJob('* * * * *', function() {
    
        for (let server of config.servers) {
            let ip = server.ip;
            let port = server.port;
            console.log('Starting quering server ' + ip + ':' + port);
            query
                .info(ip, port, config.query_timeout)
                .then(info => {
                    update_server_info(server, info)
                }) //success

                .catch(console.log); //error


        }

    

}, null, true, 'Europe/Warsaw');
