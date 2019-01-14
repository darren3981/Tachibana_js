const rp = require("request-promise");
const Discord = require("discord.js");
async function plex() {
  const  request= {
    uri: "https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=sell&page=1&type_id=44992",
  };
  let response = rp(request);
  let data = JSON.parse(await response);
  const aprice = data.map(data => data.price);
  const minprice = Math.min(...aprice);
  return minprice;
}
exports.run = async (client, message, args) => {
  let amount = args.slice(0).join(" ");
  if (amount == 0) amount = 500;
    const plexprice = await plex();
    const embed = new Discord.RichEmbed()
    .setColor(16389353)
    .setFooter("requested by "+ message.author.username, message.author.displayAvatarURL)
    .setTimestamp()
    .setThumbnail("https://web.ccpgamescdn.com/secure/images/plex/plex-icon-110.png")
    .setAuthor("Plex Price")
    .addField("current price of plex:",plexprice.toLocaleString())
    .addField("current price of plex x" + amount + ":",(plexprice * amount).toLocaleString())
    message.channel.send({ embed });
}