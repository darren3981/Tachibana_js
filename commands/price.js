const rp = require("request-promise");
const Discord = require("discord.js");
async function search(name) {
  const search = {
    uri: "https://esi.evetech.net/latest/search",
    qs: {
      categories: "inventory_type",
      search: name,
      strict: true
    }
  };
  let response = rp(search);
  let data = JSON.parse(await response);
  return data.inventory_type[0];
}
async function prices(item_id) {
  const options = {
    uri: "https://esi.evetech.net/latest/markets/10000002/orders/",
    qs: {
      order_type: "sell",
      type_id: item_id,
      strict: true
    }
  };
  let response = rp(options);
  let data2 = JSON.parse(await response);
  const poop = data2.map(data2 => data2.price);
  const minprice = Math.min(...poop);
  return minprice;
}
async function iteminfo(item_id) {
  const search = {
    uri: "https://esi.evetech.net/latest/universe/types/" + item_id
  };
  let response = rp(search);
  let data = JSON.parse(await response);
  return data.name;
}
exports.run = async (client, message, args) => {
  if (!args[0]) return message.reply("you have to name an item idiot");
  let name = args.slice(0).join(" ");
  try {
    const item_id = await search(name);
    const price = await prices(item_id);
    const itemname = await iteminfo(item_id);
    const embed = new Discord.RichEmbed()
      .setColor(16389353)
      .setTimestamp()
      .setFooter(
        "requested by " + message.author.username,
        message.author.displayAvatarURL
      )
      .setAuthor(itemname)
      .setThumbnail(
        "http://imageserver.eveonline.com/Type/" + item_id + "_64.png"
      )
      .addField("Current:", price.toLocaleString() + " isk", false);
    message.channel.send({ embed });
  } catch (error) {
    console.log(error);
    message.channel.send("item doesn't exist or you can't spell (lol)");
  }
};
