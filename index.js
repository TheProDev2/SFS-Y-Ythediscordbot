const Discord = require("discord.js");
const { Client, Attachment, MessageEmbed } = require("discord.js");
const bot = new Discord.Client();

const ms = require("ms");

const cheerio = require("cheerio");

const request = require("request");

const ytdl = require("ytdl-core");

const PREFIX = "&";

var version = "1.0";

bot.on("ready", () => {
  console.log("SFS Y-Y bot is online!");
  bot.user.setActivity("I'm not playing! (the prefix is: &)");
});

/* Member Count */
const serverStats = {
  serverID: "729338182528663714",
  totalUsersID: "730343531650220065",
  memberCountID: "730343640206934047",
  botCountID: "730343681751646209",
};

bot.on("guildMemberAdd", (member) => {
  if (member.guild.id !== serverStats.serverID) return;

  bot.channels.cache
    .get(serverStats.totalUsersID)
    .setName(`Total Users: ${member.guild.memberCount}`);
  bot.channels.cache
    .get(serverStats.memberCountID)
    .setName(
      `Members Count: ${
        member.guild.members.cache.filter((m) => !m.user.bot).size
      }`
    );
  bot.channels.cache
    .get(serverStats.botCountID)
    .setName(
      `Bot Count: ${member.guild.members.cache.filter((m) => m.user.bot).size}`
    );
});

bot.on("guildMemberRemove", (member) => {
  if (member.guild.id !== serverStats.serverID) return;

  bot.channels.cache
    .get(serverStats.totalUsersID)
    .setName(`Total Users: ${member.guild.memberCount}`);
  bot.channels.cache
    .get(serverStats.memberCountID)
    .setName(
      `Members Count: ${
        member.guild.members.cache.filter((m) => !m.user.bot).size
      }`
    );
  bot.channels.cache
    .get(serverStats.botCountID)
    .setName(
      `Bot Count: ${member.guild.members.cache.filter((m) => m.user.bot).size}`
    );
});

/* ------------------------------------------------------------------------------------------------------------------------------------------ */

/* Auto messages reply */

bot.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === "welcome"
  );
  if (!channel) return;

  channel.send(
    `Welcome to our server, ${member}, please read the rules in the rules channel`
  );
});

bot.on("message", (msg) => {
  if (msg.content === "Hi") {
    msg.reply("Hello!");
  }
});

bot.on("message", (msg) => {
  if (msg.content === "Hello") {
    msg.reply("Hello!");
  }
});

bot.on("message", (msg) => {
  if (msg.content === "שלום") {
    msg.reply("שלום!");
  }
});

bot.on("message", (msg) => {
  if (msg.content === "מה קורה") {
    msg.reply("הכל בסדר!");
  }
});

bot.on("message", (msg) => {
  if (msg.content === "ping" || msg.content === "Ping") {
    msg.reply("pong!");
  }
});

bot.on("message", (message) => {
  if (message.content === "inviteme") {
    message.channel.send(
      `Please invite me to your server, I make him fun!
      The link: https://discord.com/oauth2/authorize?client_id=729385591506206820&scope=bot&permissions=2146958847

      for help type &help.

      ||<{@everyone}>||`
    );
  }
});

/* -------------------------------------------------------------------- */

/* Verify command */
bot.on("message", (message) => {
  if (message.author.bot) return;
  if (
    message.content.toLowerCase() === "&verify" &&
    message.channel.id === "729994672847454218"
  ) {
    let role = message.guild.roles.cache.get("729597571156148274");

    if (role) {
      try {
        message.member.roles.add(role);
        message.channel.send(`${message.author.username} is verified!`);
        console.log("Role added!");
      } catch (err) {
        console.log(err);
      }
    }
  }
});

/* -------------------------------------------------------------------- */

/* Report Command */

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "report":
      let User = message.mentions.users.first() || null;

      if (User == null) {
        return message.reply("You did not mention a user!");
      } else {
        let Reason = message.content.slice(PREFIX.length + 22 + 7) || null;
        if (Reason == null) {
          return message.reply("You did not specify reason for the report!");
        }
        let Avatar = User.displayAvatarURL();
        let Channel = message.guild.channels.cache.find(
          (ch) => ch.name === "reports"
        );

        if (!Channel)
          return message.reply(
            'There is no "reports" channel in this server, please connect the staff or staff+'
          );

        let Embed = new Discord.MessageEmbed()
          .setTitle("New report!")
          .setDescription(
            `The user \`${message.author.tag}\` has reported the user \`${User.tag}\`!`
          )
          .setColor("#ff0000")
          .setThumbnail(Avatar)
          .addFields(
            { name: "Mod ID", value: `${message.author.id}`, inline: true },
            { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
            { name: "Reported ID", value: `${User.id}`, inline: true },
            { name: "Reported Tag", value: `${User.tag}`, inline: true },
            { name: "Reason", value: `\`${Reason.slice(1)}\``, inline: true },
            {
              name: "Date (M/D/Y)",
              value: `${new Intl.DateTimeFormat("en-US").format(Date.now())}`,
              inline: true,
            }
          );

        Channel.send(Embed);
      }
      break;
  }
});
/* ------------------------------------------------------------------------------------------------------- */

/* Info Command */

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "myinfo":
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username}'s info`)
        .addFields(
          {
            name: "Username:",
            value: `${message.author.username}`,
            inline: true,
          },
          { name: "User's tag:", value: `${message.author.tag}`, inline: true },
          { name: "User's ID:", value: `${message.author.id}`, inline: true },
          {
            name: "User's last message:",
            value: `\`${message.author.lastMessage}\``,
            inline: true,
          }
        )

        .setTimestamp();

      message.channel.send(embed);
      break;

    case "info":
      let User = message.mentions.users.first() || null;
      let Avatar = User.displayAvatarURL();

      if (User == null) {
        message.reply("You need to @mention a user");
      } else {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${User.username}'s info`)
          .addFields(
            { name: "Username:", value: `${User.username}`, inline: true },
            { name: "User's tag:", value: `${User.tag}`, inline: true },
            { name: "User's ID:", value: `${User.id}`, inline: true },
            {
              name: "User's image:",
              value: `${Avatar}`,
              inline: true,
            }
          )

          .setTimestamp();

        message.channel.send(embed);
      }
      break;
  }
});

/* ------------------------------------------------------------------------------------------------------- */

bot.on("message", (msg) => {
  let wordArray = msg.content.split(" ");

  let filterWords = ["Stupid", "stupid", "Dumb", "dumb"];

  for (var i = 0; i < filterWords.length; i++) {
    if (wordArray.includes(filterWords[i])) {
      msg.delete();
      msg.channel.send(
        `Sorry ${msg.author.username}, on this server we don't use words like that!`
      );
      break;
    }
  }
});

bot.on("message", (msg) => {
  let args = msg.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "clear":
      if (!msg.member.roles.cache.find((r) => r.name === "Staff"))
        return msg.channel.send(
          "You dont have the permisions to do this command."
        );
      if (!args[1]) return msg.reply("Error, please define second arg");
      msg.channel.bulkDelete(args[1]);
      break;

    case "joke":
      msg.reply(
        'A man is talking to God. The man: "God, how long is a million years?" God: "To me it is about a minute." The Man: "God, how much is a million dollars?" God: "To me it is a penny" The man: "God, may I have a penny?" God: "Wait a minute."'
      );
      break;

    case "help":
      const helperEmbed = new Discord.MessageEmbed()
        .setColor("#ff7600")
        .setAuthor("Made by TheProDev Official")
        .setTitle("Helper Embed")
        .addFields(
          { name: "Prefix", value: "The bot prefix is: &" },
          {
            name: "Commands",
            value: "The commands are in #bot-commands-info in the server",
          }
        )
        .setTimestamp()
        .setFooter("Hi bot, the fun bot!");

      msg.author.send(helperEmbed);
      break;

    case "commandshelp":
      const helperCommandsEmbed = new Discord.MessageEmbed()
        .setColor("#fffb00")
        .setAuthor("Made by TheProDev Official")
        .setTitle("This is my all commands:")
        .setDescription("My prefix is: &")
        .addFields(
          {
            name: "&help",
            value: "The bot is send to you private message with help.",
            inline: true,
          },
          {
            name: "&joke",
            value: "The bot will be send to you message with joke",
            inline: true,
          },
          {
            name: "&image",
            value: "The bot will be send to you rocket image",
            inline: true,
          },
          {
            name: "&hack @user",
            value: "THE BOT WILL HACK THE USER!",
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter("Hi bot here to help you!");

      msg.channel.send(helperCommandsEmbed);
      break;

    case "rateme":
      let number = Math.floor(Math.random() * 101);

      return msg.channel.send(
        `I would rate ${msg.author.username} a ` + number + "/100"
      );
      break;
  }
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.substring(PREFIX.length).split(" ");

  if (message.content.startsWith(`${PREFIX}play`)) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music"
      );

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "I don't have permissions to connect to the voice channel"
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "I don't have permissions to play music in the channel"
      );

    try {
      var connection = await voiceChannel.join();
    } catch (error) {
      console.log(
        `There was an error with connecting to the voice channel: ${error}`
      );
      return message.channel.send(
        `There was an error with connecting to the voice channel: ${error}`
      );
    }

    const dispatcher = connection
      .play(ytdl(args[1]))
      .on("finish", () => {
        voiceChannel.leave();
      })
      .on("error", (error) => {
        console.log(error);
      });
    dispatcher.setVolumeLogarithmic(5 / 5);
  } else if (message.content.startsWith(`${PREFIX}stop`)) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You need to be in a voice channel to stop the music"
      );
    message.member.voice.channel.leave();
    return undefined;
  }
});

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "hack":
      const userman = message.mentions.users.first();

      if (userman) {
        const member = message.guild.member(userman);

        if (member) {
          message.channel
            .send(
              `Hacking ${member}, the hack in progress
              ██ᴳᵒᵈ̷ঊ̷ৣ̷ʀ̷҉̷ѧ̷҉̷ɴ̷҉̷Ԁ̷҉̷ᴏ̷██`
            )
            .then((msg) => {
              setTimeout(function () {
                msg.edit("Just kidding!");
              }, 5000);
            });
        }
      } else {
        message.reply("Please mention a user like: &hack @user");
      }
      break;
  }
});

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "poll":
      const pollEmbed = new Discord.MessageEmbed()
        .setTitle("Server poll!")
        .setDescription("Only staff+ can use this command.");

      if (!args[1]) {
        message.channel.send(pollEmbed);
        return;
      }

      let myArgs = args.slice(1).join(" ");

      message.channel
        .send("📋 " + "**" + "Server Poll: " + myArgs + "**")
        .then((MessageReaction) => {
          MessageReaction.react("👍");
          MessageReaction.react("👎");
        });
      break;

    case "kick":
      const user = message.mentions.users.first();

      if (user) {
        const member = message.guild.member(user);

        if (member) {
          member
            .kick("You where kick for trolling!")
            .then(() => {
              message.reply(`Sucessfully kicked ${user.tag}`);
            })
            .catch((err) => {
              message.reply(`I was unbale to kick the member`);
              console.log(err);
            });
        } else {
          message.reply("That user isn't in this guild");
        }
      } else {
        message.reply("You need to specify a person!");
      }

      break;

    case "ban":
      const userman = message.mentions.users.first();

      if (userman) {
        const member = message.guild.member(userman);

        if (member) {
          member
            .ban({ ressino: "You ware bad!" })
            .then(() => {
              message.reply(`We banned the player: ${userman.tag}`);
            })
            .catch((err) => {
              message.reply(`I was unbale to ban the member`);
              console.log(err);
            });
        } else {
          message.reply("That user isn't in this guild");
        }
      } else {
        message.reply("You need to specify a person!");
      }

      break;

    case "image":
      image(message);

      break;
  }
});

function image(message) {
  var options = {
    url: "http://results.dogpile.com/serp?qc=images&q=" + "rocket",
    method: "GET",
    headers: {
      Accept: "text/html",
      "User-Agent": "Chrome",
    },
  };

  request(options, function (error, response, responseBody) {
    if (error) {
      return;
    }

    $ = cheerio.load(responseBody);

    var links = $(".image a.link");

    var urls = new Array(links.length)
      .fill(0)
      .map((v, i) => links.eq(i).attr("href"));

    console.log(urls);

    if (!urls.length) {
      return;
    }

    // Send result
    message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
  });
}

bot.login(process.env.token);
