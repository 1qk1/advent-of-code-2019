const input = require("./input");

// divide by three
// round down
// subtract 2
// add together
// until mass <= 0

const getFuel = mass => Math.floor(mass / 3) - 2;

// returns an array of the calculated fuel including the extra fuel for each module
const calculateRecursively = (fuelValue, arr = []) => {
  const fuel = getFuel(fuelValue);
  if (fuel <= 0) {
    return arr;
  } else {
    arr.push(fuel);
    return calculateRecursively(fuel, arr);
  }
};

// returns the calculated fuel as a number
const calculateFuel = val =>
  calculateRecursively(val).reduce((a, b) => a + b, 0);

let finalFuel = input.reduce((a, b) => a + calculateFuel(b), 0);

console.log(finalFuel);
