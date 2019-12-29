const input = require("./input");

// divide by three
// round down
// subtract 2
// add together

let finalFuel = input.reduce((a, b) => a + Math.floor(b / 3) - 2, 0);

console.log(finalFuel);
