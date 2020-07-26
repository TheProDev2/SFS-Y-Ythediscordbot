module.exports = {
  name: "DM",
  description: "This command is only for admins and owners/co-owners!",
  execute(message, args) {
    bot.on("message", (message) => {
      let args = message.content.substring(PREFIX.length).split(" ");
      switch (args[0]) {
        case "DM":
          if (!message.member.roles.cache.find((r) => r.name === "Admin"))
            return message.reply(
              "You dont have the permisions to use this command."
            );

          let user =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0]);

          if (!user)
            return message.reply(
              "You did not @mention a user, or you gave an invalid ID."
            );
          if (!args.slice(1).join(" "))
            return message.reply("You did not specify your message!");

          user
            .send(args.slice(1).join(" "))
            .catch(() => message.channel.send("That user could not be a DMed!"))
            .then(`Sent a message to ${user.tag}`);
          break;
      }
    });
  },
};
