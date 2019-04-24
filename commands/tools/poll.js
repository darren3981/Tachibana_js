const Discord = require("discord.js");

exports.run = (client, message, args, level) => {

  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('you have to give a question idiot')

  const embed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor(16389353)
  .setDescription(`${question}`)
  .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)

  message.channel.send({embed})
  .then(msg => {
    msg.react('👍')
    msg.react('👎')
    msg.react('🤷')
  })
  .catch(() => console.error('Emoji failed to react.'));

}
