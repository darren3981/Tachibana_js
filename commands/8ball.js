exports.run = (client, message, args) => {

    if(!args[0]) return message.reply("ask a question noob");
    let replies = [
        'That is a resounding no',
        'It is not looking likely',
        'Too hard to tell',
        'It is quite possible',
        'Definitely',
        "Shut up and stop breathing",
        "Why were you born again?",
        "Ur gay pwnd lol",
        "probs lol",
        "Yes",
        "No",
        "IDK",
        "Sure!",
        "Nah"
    ];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    const embed = {
        "color": 16389353,
        "thumbnail": {
          "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/2000px-8_ball_icon.svg.png"
        },
        "fields": [
          {
            "name": message.author.username + " asked",
            "value": question
          },
          {
            "name": "Tachibana says",
            "value": replies[result]
          }
        ]
      };
      message.channel.send({ embed });
}