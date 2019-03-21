const rp = require("request-promise");
const Discord = require("discord.js");
async function search(name) {
  const search = {
    uri: "https://esi.evetech.net/latest/search",
    qs: {
      categories: "solar_system",
      search: name,
      strict: false
    }
  };
  let response = rp(search);
  let data = JSON.parse(await response);
  return data.solar_system[0];
}
async function search_name(systemid) {
  const sysid = {
    uri: "https://esi.evetech.net/latest/universe/systems/" + systemid
  };
  let response = rp(sysid);
  let sysname = JSON.parse(await response);
  return sysname.name;
}
exports.run = async (client, message, args) => {
  if (!args[0]) return message.reply("you have to name a system idiot");
  let name = args.slice(0).join(" ");
  const systemid = await search(name);
  const sysname = await search_name(systemid);
  range_cap = "http://evemaps.dotlan.net/range/Thanatos,5/" + sysname;
  range_super = "http://evemaps.dotlan.net/range/Nyx,5/" + sysname;
  range_blops = "http://evemaps.dotlan.net/range/Panther,5/" + sysname;
  range_jf = "http://evemaps.dotlan.net/range/Ark,5/" + sysname;
  const embed = new Discord.RichEmbed()
    .setColor(16389353)
    .setTimestamp()
    .setFooter("requested by "+ message.author.username, message.author.displayAvatarURL)
    .setAuthor("Ranges from " + sysname)
    .addField("Capital", range_cap)
    .addField("Supers", range_super)
    .addField("Blops", range_blops)
    .addField("JF", range_jf);
  message.channel.send({ embed });
};
