const rp = require("request-promise");
async function history() { 
    const search = {
      uri: "https://history.muffinlabs.com/date",
    };
    let response = rp(search);
    let data = JSON.parse(await response);
    facts = data.data.Events;
    let rand = Math.floor((Math.random() * facts.length));
    let fact = facts[rand]
    return(fact);
  }
  exports.run = async (client, message, args) => {
    let fact = await history();
    message.channel.send(fact.text + " (" + fact.year + ")").catch(console.error);
  };