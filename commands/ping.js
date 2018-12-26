exports.run = (client, message, args) => {
    message.channel.send(":ping_pong: pong! " + message.author).catch(console.error);
}