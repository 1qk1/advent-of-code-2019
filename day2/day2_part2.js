// Intcode program

// [instructionm, parameter, parameter, parameter]
// [opcode, noun, verb, storepos]
// opcodes 1 = add, 2 = multiply 99 finish and should halt

// [1,10,20,30] = read the values at positions 10 and 20, add those values,
// and then overwrite the value at position 30 with their sum.

// Once you're done processing an opcode, move to the next one by stepping forward 4 positions.

// part 2:

// replace position 1 and 2 with numbers and reexecute the code program

let input = require("./input");

const intCode = input => {
  // i (The address of the current instruction) is called instruction pointer
  for (let i = 0; i < input.length - 1; i += 4) {
    const indices = [i, i + 1, i + 2, i + 3];
    switch (input[indices[0]]) {
      case 1:
        input[input[indices[3]]] =
          input[input[indices[1]]] + input[input[indices[2]]];
        break;
      case 2:
        input[input[indices[3]]] =
          input[input[indices[1]]] * input[input[indices[2]]];
        break;
      default: {
        break;
      }
    }
  }
  return input;
};

const part2 = () => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let arr = input.slice();
      arr[1] = i;
      arr[2] = j;
      let res = intCode(arr)[0];
      if (res === 19690720) {
        console.log(100 * i + j);
      }
    }
  }
};

part2();
