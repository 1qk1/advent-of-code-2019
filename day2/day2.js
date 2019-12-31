// Intcode program

// [opcode, readpos, readpos, storepos]
// opcodes 1 = add, 2 = multiply 99 finish and should halt

// [1,10,20,30] = read the values at positions 10 and 20, add those values,
// and then overwrite the value at position 30 with their sum.

// Once you're done processing an opcode, move to the next one by stepping forward 4 positions.

let input = require("./input");
const intCode = () => {
  for (let i = 0; i < input.length / 4; i++) {
    const indices = [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3];
    switch (input[indices[0]]) {
      case 1:
        input[input[indices[3]]] =
          input[input[indices[1]]] + input[input[indices[2]]];
        break;
      case 2:
        input[input[indices[3]]] =
          input[input[indices[1]]] * input[input[indices[2]]];
        break;
      default:
        return;
    }
  }
};

intCode();

console.log(input);
