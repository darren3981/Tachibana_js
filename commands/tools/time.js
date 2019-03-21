var moment = require("moment");
exports.run = (client, message, args) => {
time = moment().utc().format("dddd, MMMM Do YYYY, h:mm:ss a")
    message.channel.send(time).catch(console.error);
}
