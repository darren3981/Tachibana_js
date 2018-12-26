const opencage = require('opencage-api-client');
const DarkSky = require('dark-sky')
const config = require("../config.json");
const darksky = new DarkSky(config.darkkey);

exports.run = (client, message, args) => {
    if(!args[0]) return message.reply("give a location idiot");
    let location = args.slice(0).join(" ");

    async function weather(){
        await opencage.geocode({q: location}).then(data => {
          //console.log(JSON.stringify(data));
          if (data.status.code == 200) {
            if (data.results.length > 0) {
              place = data.results[0];
            }
          } 
        })
        //console.log(place.geometry);
        await darksky
            .coordinates(place.geometry)
            .units('us')
            .language('en')
            .exclude()
            .get()
            .then(weather => {
                forecast = weather;
                //console.log(weather);
            }
                )
            .catch(console.log)// end of darksky

        const embed = {
            "title": place.formatted,
            "description": forecast.currently.summary + ' | ' + forecast.daily.summary,
            "url": "https://discordapp.com",
            "color": 16389353,
            "footer": {
              "icon_url": "https://darksky.net/images/darkskylogo.png",
              "text": "Powered by DarkSky: https://darksky.net/poweredby/"
            },
            "thumbnail": {
                "url": "https://darksky.net/images/darkskylogo.png"
            },
            "fields": [
              {
                "name": "Current Temperature:",
                "value": forecast.currently.temperature.toString(),
                "inline": true
              },
              {
                "name": "Feels Like:",
                "value": forecast.currently.apparentTemperature.toString(),
                "inline": true
              },
              {
                "name": "Chance of Precipitation:",
                "value": (forecast.currently.precipProbability * 100).toString() + "%",
                "inline": true
              },
              {
                "name": "Type of Precipitation:",
                "value": forecast.currently.precipType ? forecast.currently.precipType : "N/A",//forecast.currently.precipType,
                "inline": true
              },
              {
                "name": "Humidity:",
                "value": (forecast.currently.humidity * 100).toString() + "%",
                "inline": true
              },
              {
                "name": "Wind Speed:",
                "value": (forecast.currently.windSpeed).toString() + "mph",
                "inline": true
              },
              {
                "name": "Alerts:",
                "value": forecast.alerts ? forecast.alerts[0].title : "N/A"
              }


            ] 
          };
          message.channel.send({ embed });        
        //message.channel.send(JSON.stringify(place.geometry)).catch(console.error);
        }//bracket ending weather()
        weather();     
}//bracket ending exports.run