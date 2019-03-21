const opencage = require("opencage-api-client");
const DarkSky = require("dark-sky");
const config = require("../../config.json");
const darksky = new DarkSky(config.darkkey);
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!args[0]) return message.reply("give a location idiot");
  let location = args.slice(0).join(" ");

  async function weather() {
    await opencage.geocode({ q: location }).then(data => {
      //geolocate call
      if (data.status.code == 200) {
        if (data.results.length > 0) {
          place = data.results[0];
        }
      }
    });
    await darksky //weather api call
      .coordinates(place.geometry)
      .units("auto")
      .language("en")
      .exclude()
      .get()
      .then(weather => {
        forecast = weather;
      })
      .catch(console.log);
    const embed = new Discord.RichEmbed()
      .setColor(16389353)
      .setTimestamp()
      .setFooter(
        "requested by " + message.author.username + " | Powered by Dark Sky",
        message.author.displayAvatarURL
      )
      .setThumbnail("https://darksky.net/images/darkskylogo.png")
      .setTitle(place.formatted)
      .setDescription(
        forecast.currently.summary + " | " + forecast.daily.summary
      )
      .addField(
        "Current Temperature:",
        forecast.currently.temperature.toString(),
        true
      )
      .addField(
        "Feels Like:",
        forecast.currently.apparentTemperature.toString(),
        true
      )
      .addField(
        "Chance of Precipitation:",
        (forecast.currently.precipProbability * 100).toString() + "%",
        true
      )
      .addField(
        "Type of Precipitation:",
        forecast.currently.precipType ? forecast.currently.precipType : "N/A",
        true
      )
      .addField(
        "Humidity:",
        (forecast.currently.humidity * 100).toString() + "%",
        true
      )
      .addField("Wind Speed:", forecast.currently.windSpeed.toString(), true)
      .addField(
        "Alerts:",
        forecast.alerts
          ? "[" + forecast.alerts[0].title + "](" + forecast.alerts[0].uri + ")"
          : "N/A",
        true
      );
    message.channel.send({ embed });
  }
  weather();
};
