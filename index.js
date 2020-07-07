const Discord = require('discord.js');
const { Client, Attachment } = require('discord.js');
const bot = new Discord.Client();

const ms = require('ms')

const cheerio = require('cheerio');

const request = require('request');

const PREFIX = '&';

var version = '1.0';

bot.on('ready', () => {
    console.log("SFS Y-Y bot is online!");
})

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if (!channel) return;

    channel.send(`Welcome to our server, ${member}, please read the rules in the rules channel`);
});

bot.on('message', msg => {
    if (msg.content === 'Hi') {
        msg.reply('Hello!');
    }
})

bot.on('message', msg => {
    if (msg.content === 'Hello') {
        msg.reply('Hello!');
    }
})

bot.on('message', msg => {
    if (msg.content === 'שלום') {
        msg.reply('שלום!');
    }
})

bot.on('message', msg => {
    if (msg.content === 'היי') {
        msg.reply('שלום!');
    }
})

bot.on('message', msg => {
    if (msg.content === 'מה קורה') {
        msg.reply('הכל בסדר!');
    }
})

bot.on('message', msg => {
    if (msg.content === 'ping' || msg.content === 'Ping') {
        msg.reply('pong!');
    }
})

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'clear':
            if (!msg.member.roles.cache.find(r => r.name === "Staff")) return msg.channel.send('You dont have the permisions to do this command.')
            if (!args[1]) return msg.reply("Error, please define second arg")
            msg.channel.bulkDelete(args[1]);
            break;

        case 'joke':
            msg.reply('A man is talking to God. The man: "God, how long is a million years?" God: "To me it is about a minute." The Man: "God, how much is a million dollars?" God: "To me it is a penny" The man: "God, may I have a penny?" God: "Wait a minute."');
            break;
    }
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {

        case 'poll':

            if (!msg.member.roles.cache.find(r => r.name === "Staff")) return msg.channel.send('You dont have the permisions to do this command.')

            const Embed = new Discord.MessageEmbed()
                .setColor(0x00BDFF)
                .setTitle("Initiate Poll")
                .setDescription("v!poll to initiate a simple yes or no poll")

            if (!args[1]) {
                message.channel.send(Embed);
            }

            let msgArgs = args.slice(1).join(" ");

            message.channel.send("📋 " + "**" + msgArgs + "**").then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
                message.delete({ timeout: 1000 }).catch(console.error);
            });

            break;

        case 'kick':

            if (!msg.member.roles.cache.find(r => r.name === "Staff")) return msg.channel.send('You dont have the permisions to do this command.')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('You where kick for trolling!').then(() => {
                        message.reply(`Sucessfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply(`I was unbale to kick the member`);
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn't in this guild");
                }
            } else {
                message.reply("You need to specify a person!")
            }

            break;

        case 'ban':

            if (!msg.member.roles.cache.find(r => r.name === "Staff")) return msg.channel.send('You dont have the permisions to do this command.')

            const userman = message.mentions.users.first();

            if (userman) {
                const member = message.guild.member(userman);

                if (member) {
                    member.ban({ ressino: 'You ware bad!' }).then(() => {
                        message.reply(`We banned the player: ${userman.tag}`);
                    }).catch(err => {
                        message.reply(`I was unbale to ban the member`);
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn't in this guild");
                }
            } else {
                message.reply("You need to specify a person!")
            }

            break;

        case 'image':
            image(message);

            break
    }
});

function image(message) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "rocket",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };





    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }


        $ = cheerio.load(responseBody);


        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        console.log(urls);

        if (!urls.length) {

            return;
        }

        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}

bot.login(process.env.token);