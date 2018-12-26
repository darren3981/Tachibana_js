const request = require('request');
exports.run = (client, message, args) => {
    const options = {  
        url: 'https://nekos.moe/api/v1/random/image?nsfw=false',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    request(options, function(err, res, body) {  
        let json = JSON.parse(body);
        //console.log(json);
        let nekourl = 'https://nekos.moe/image/' + json['images'][0]['id'];

    message.channel.send(nekourl).catch(console.error);
    })
}