const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
exports.run = (client, message, args) => {
  let rawjson = fs.readFileSync("./toggle.json");
  let json = JSON.parse(rawjson);
  let rawtoggles = json.toggles;
  let toggles = rawtoggles.split(",");
  if (toggles.includes(message.guild.id) == false) {
    const options = {
      url: "https://nekos.moe/api/v1/random/image?nsfw=false",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };
    request(options, function(err, res, body) {
      let json = JSON.parse(body);
      //console.log(json);
      let nekourl = "https://nekos.moe/image/" + json["images"][0]["id"];

      message.channel.send(nekourl).catch(console.error);
    });
  } else {
    message.reply("that command is disabled in this server");
  }
};
