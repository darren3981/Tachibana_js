const Discord = require("discord.js");
exports.run = (client, message, args) => {
  let [arg1] = args;
  if (arg1 === "eve") {
    const embed = new Discord.RichEmbed()
      .setTitle("Eve commands!")
      .setDescription("the bot command is (t.)")
      .setColor(16389353)
      .setThumbnail("https://i.imgur.com/doBAnRN.png")
      .setTimestamp()
      .addField(
        "who",
        "displays corp and alliance of character provided",
        false
      )
      .addField(
        "players",
        "displays current players logged on to EVE:Online",
        false
      )
      .addField("plex", "displays the current value of plex", false)
      .addField(
        "price",
        "displays current lowest jita price for given item",
        false
      )
      .addField("range", "displays dotlan range links from given system", false)
      .addField(
        "route",
        "generates dotlan jump route for the two provided systems",
        false
      );
    message.channel.send({ embed });
  }
  if (arg1 === "fun") {
    const embed = new Discord.RichEmbed()
      .setTitle("Fun commands!")
      .setDescription("the bot command is (t.)")
      .setColor(16389353)
      .setThumbnail("https://i.imgur.com/doBAnRN.png")
      .setFooter("requested by "+ message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .addField("8ball", "invoke the great wisdom of Tachibana", false)
      .addField("catgirl", "posts a cute catgirl! Modifiers: nsfw", true)
      .addField(
        "history",
        "displays a random history fact that happened on the current date",
        false
      )
      .addField("ping", "pongs you back", false)
      .addField("turtle", "help the turtle get to the water!", false);
    message.channel.send({ embed });
  }
  if (arg1 === "tools") {
    const embed = new Discord.RichEmbed()
      .setTitle("Tool commands!")
      .setDescription("the bot command is (t.)")
      .setColor(16389353)
      .setThumbnail("https://i.imgur.com/doBAnRN.png")
      .setFooter("requested by "+ message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .addField(
        "bitcoin",
        "displays the current value of bitcoin in USD and EUR",
        false
      )
      .addField(
        "math",
        "does math based on the given funtion after the command (current functions multiply, divide, square, cube)",
        false
      )
      .addField(
        "poll",
        "creats a quick poll using discords message reactions",
        false
      )
      .addField("time", "displays the current time in utc and cst", false)
      .addField(
        "weather",
        "displays the current weather for the given location",
        false
      );
    message.channel.send({ embed });
  }
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setTitle("Welcome to the Help command!")
      .setDescription("the bot command is (t.)")
      .setColor(16389353)
      .setThumbnail("https://i.imgur.com/doBAnRN.png")
      .setFooter("requested by "+ message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .addField(
        "How to navigate the help command",
        "use the modifiers on the end of help to navigate the help commands",
        false
      )
      .addField("eve", "displays eve related commands", false)
      .addField("fun", "displays the fun related commands", false)
      .addField("tools", "displays the useful commands", false);
    message.channel.send({ embed });
  }
};
