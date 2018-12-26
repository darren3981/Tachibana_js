const rp = require("request-promise");
const Discord = require("discord.js");
async function search(sname) {
  const search = {
    uri: "https://esi.evetech.net/latest/search",
    qs: {
      categories: "solar_system",
      search: sname,
      strict: false
    }
  };
  let response = rp(search);
  let data = JSON.parse(await response);
  return data.solar_system[0];
}
async function search2(sname2) {
  const search2 = {
    uri: "https://esi.evetech.net/latest/search",
    qs: {
      categories: "solar_system",
      search: sname2,
      strict: false
    }
  };
  let response = rp(search2);
  let data2 = JSON.parse(await response);
  return data2.solar_system[0];
}
async function search_name(systemid) {
  const sysid = {
    uri: "https://esi.evetech.net/latest/universe/systems/" + systemid
  };
  let response = rp(sysid);
  let sysname = JSON.parse(await response);
  return sysname.name;
}
async function search_name2(systemid2) {
  const sysid2 = {
    uri: "https://esi.evetech.net/latest/universe/systems/" + systemid2
  };
  let response = rp(sysid2);
  let sysname2 = JSON.parse(await response);
  return sysname2.name;
}
exports.run = async (client, message, args) => {
  if (!args[0]) return message.reply("you have to give two systems idiot");
  let [sname, sname2] = args;
  const systemid = await search(sname);
  const systemid2 = await search2(sname2);
  const sysname = await search_name(systemid);
  const sysname2 = await search_name2(systemid2);
  range_cap =
    "http://evemaps.dotlan.net/jump/Thanatos,545,S/" + sysname + ":" + sysname2;
  range_super =
    "http://evemaps.dotlan.net/jump/Nyx,545,S/" + sysname + ":" + sysname2;
  range_blops =
    "http://evemaps.dotlan.net/jump/Panther,545,S/" + sysname + ":" + sysname2;
  range_jf =
    "http://evemaps.dotlan.net/jump/Ark,545,S/" + sysname + ":" + sysname2;
  const embed = new Discord.RichEmbed()
    .setColor(16389353)
    .setTimestamp()
    .setFooter("requested by "+ message.author.username, message.author.displayAvatarURL)
    .setAuthor("Route from " + sysname + " to " + sysname2)
    .addField("Capital", range_cap)
    .addField("Supers", range_super)
    .addField("Blops", range_blops)
    .addField("JF", range_jf);
  message.channel.send({ embed });
};
