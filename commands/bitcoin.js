const request = require('request');
exports.run = (client, message, args) => {
const options = {  
    url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};
request(options, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
    //message.channel.send(json['bpi']['USD']['rate']).catch(console.error);
    const embed = {
        "color": 16389353,
        "thumbnail": {
          "url": "https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png"
        },
        "fields": [
          {
            "name": "Bitcoin price (USD)",
            "value": json['bpi']['USD']['rate']
          },
          {
            "name": "Bitcoin price (EUR)",
            "value": json['bpi']['EUR']['rate']
          }
        ]
      };
      message.channel.send({ embed });    
});

}