const fs = require("fs");
exports.run = (client, message, args) => {
  let [arg1] = args;
  if (!args[0]) {
    let possible_responses = [
      ":ocean::turtle::turtle: A turtle made it to the water!",
      ":skull_crossbones::turtle: :skull_crossbones: lmfao you let a turtle die idiot"
    ];
    let response = Math.floor(Math.random() * possible_responses.length);
    message.channel.send(possible_responses[response]).catch(console.error);
    if (response === 1) {
      let rawturtle = fs.readFileSync('./turtle.json');
      let turtle = JSON.parse(rawturtle);  
      let aturtle = turtle.turtle_dead;
      aturtle++;
      turtle.turtle_dead = aturtle
      fs.writeFileSync("./turtle.json", JSON.stringify(turtle));
    }
    if (response === 0) {
      let rawturtle = fs.readFileSync('./turtle.json');
      let turtle = JSON.parse(rawturtle);  
      let aturtle = turtle.turtle_alive;
      aturtle++;
      turtle.turtle_alive = aturtle
      fs.writeFileSync("./turtle.json", JSON.stringify(turtle));
    }
  }
  if (arg1 === "count") {
    let rawturtle = fs.readFileSync('./turtle.json');
    let turtle = JSON.parse(rawturtle);  
    message.channel.send(turtle.turtle_dead + " turtles have died since creation\n" + turtle.turtle_alive + " have made it to the ocean!").catch(console.error);
  }
};
