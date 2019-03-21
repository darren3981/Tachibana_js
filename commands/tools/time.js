var moment = require("moment");
exports.run = (client, message, args) => {
time = moment().utc().format("dddd, MMMM Do YYYY, H:mm:ss")
    message.channel.send(time).catch(console.error);
}
