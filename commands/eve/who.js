const rp = require("request-promise");
const Discord = require("discord.js");
async function search(name) {
  //search info

  const search = {
    uri: "https://esi.evetech.net/latest/search",
    qs: {
      categories: "character",
      search: name,
      strict: true
    }
  };
  let response = rp(search);
  let data = JSON.parse(await response);
  return data.character[0];
}
async function char_info(char_id) {
  //call char info with char_info()

  const search2 = {
    uri: "https://esi.evetech.net/latest/characters/" + char_id
  };
  let response = rp(search2);
  let data2 = JSON.parse(await response);
  return data2;
}
async function corp_info(character) {
  //call corp info with corp_info()

  let corp_id = character.corporation_id;
  const corp_search = {
    uri: "https://esi.evetech.net/latest/corporations/" + corp_id
  };
  let response = rp(corp_search);
  let corp_info = JSON.parse(await response);
  return corp_info;
}
async function a_info(character) {
  //call alliance info with a_info()
  try {
    let a_id = character.alliance_id;
    const a_search = {
      uri: "https://esi.evetech.net/latest/alliances/" + a_id
    };
    let response = rp(a_search);
    let a_info = JSON.parse(await response);
    return a_info;
  } catch (error) {
    //console.log(error);
  }
}
async function zstats(char_id) {
  //call char info with char_info()

  const zsearch = {
    uri: "https://zkillboard.com/api/stats/characterID/" + char_id + "/"
  };
  let response = rp(zsearch);
  let zstats = JSON.parse(await response);
  return zstats;
}
exports.run = async (client, message, args) => {
  if (!args[0]) return message.reply("you have to name a character idiot");
  let name = args.slice(0).join(" ");
  try {
    const char_id = await search(name);
    const character = await char_info(char_id);
    const corp_return = await corp_info(character);
    const a_return = await a_info(character);
    const zinfo = await zstats(char_id)
    zlink = "https://zkillboard.com/character/" + char_id;
    evewholink = "https://evewho.com/pilot/" + encodeURIComponent(character.name)
    // embed
    const embed = new Discord.RichEmbed()
      .setColor(16389353)
      .setTimestamp()
      .setFooter(
        "requested by " + message.author.username,
        message.author.displayAvatarURL
      )
      .setAuthor(character.name)
      .setThumbnail(
        "http://imageserver.eveonline.com/Character/" + char_id + "_128.jpg"
      )
      .addField(
        "Corporation:",
        corp_return.name + " (" + corp_return.ticker + ")",
        false
      )
      .addField(
        "Alliance:",
        a_return
          ? a_return.name + " (" + a_return.ticker + ")"
          : "Character is not in an Alliance",
        false
      )
      .addField("K/D:", zinfo.shipsDestroyed + " / " + zinfo.shipsLost, false)
      .addField("Links:", "[zkill](" + zlink + ")" + "\n [evewho](" + evewholink + ")", false);
    message.channel.send({ embed });
  } catch (error) {
    console.log(error)
    message.channel.send("character doesn't exist or you can't spell (lol)");
    //client.users.get('104780607883599872').send('someone broke who');
  }
};
