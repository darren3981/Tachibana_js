const Discord = require("discord.js");

let replies = [
  "That is a resounding no",
  "It is not looking likely",
  "Too hard to tell",
  "It is quite possible",
  "Definitely",
  "Shut up and stop breathing",
  "Why were you born again?",
  "Ur gay pwnd lol",
  "probs lol",
  "Yes",
  "No",
  "IDK",
  "Sure!",
  "Nah"
];

exports.run = (client, message, args) => {
  if (!args[0]) return message.reply("ask a question noob");

  let result = Math.floor(Math.random() * replies.length);
  let question = args.slice(0).join(" ");

  const embed = new Discord.RichEmbed()
    //.attachFiles(["./img/8ball.png"])
    .setColor(16389353)
    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/2000px-8_ball_icon.svg.png")//attachment://8ball.png
    .addField(message.author.username + " asked", question)
    .addField("Tachibana says", replies[result]);
  message.channel.send({ embed });
};
