module.exports = async client => {
    // Make the bot "play the game" which is the help command with default prefix.
    client.user.setActivity("your waifu", {type: "WATCHING"});
    console.log("I am ready!");
  };