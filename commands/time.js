exports.run = (client, message, args) => {
time = new Date().toUTCString();
    message.channel.send(time).catch(console.error);
}
