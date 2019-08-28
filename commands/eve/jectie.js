const rp = require("request-promise");
const Discord = require("discord.js");
async function injector() {
  const request = {
    uri:
      "https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=sell&page=1&type_id=40520"
  };
  let response = rp(request);
  let data = JSON.parse(await response);
  const aprice = data.map(data => data.price);
  const minprice = Math.min(...aprice);
  return minprice;
}
exports.run = async (client, message, args) => {
  let amount = args.slice(0).join(" ");
  if (amount == 0) amount = 1;
  const injectorPrice = await injector();
  const embed = new Discord.RichEmbed()
    .setColor(16389353)
    .setFooter(
      "requested by " + message.author.username,
      message.author.displayAvatarURL
    )
    .setTimestamp()
    .setThumbnail("http://imageserver.eveonline.com/Type/40520_64.png")
    .setAuthor("Injector Price")
    .addField(
      "current price of injector x" + amount + ":",
      (injectorPrice * amount).toLocaleString()
    );
  message.channel.send({ embed });
};
