// d = | x1 - y1 | + | x2 - y2 |

// tasks:
// for each wire, have an array of points it crosses ✓
// find the points they intersect ✓
// return the one with the least distance ✓

const input = require("./input");

const fs = require("fs");

const addPoint = (points, newPoint) => {
  // will get a newPoint like R43 ✓
  // will add a new array in the array of points with the new point coordinates ✓
  // will return the points ✓
  const lastPoint = points.length > 0 ? points[points.length - 1] : [0, 0];
  const value = parseInt(newPoint.substring(1));
  let point;
  switch (newPoint[0]) {
    case "L":
      point = [lastPoint[0] - value, lastPoint[1]];
      break;
    case "R":
      point = [lastPoint[0] + value, lastPoint[1]];
      break;
    case "U":
      point = [lastPoint[0], lastPoint[1] + value];
      break;
    case "D":
      point = [lastPoint[0], lastPoint[1] - value];
      break;
    default:
      break;
  }
  return [...points, point];
};

const getPoints = wire => {
  // will loop through the list of inputs (L64 etc) and will use the ✓
  // addPoint function to make the list of points ✓
  const points = wire.reduce(addPoint, []);
  return points;
};

function intersect([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return [x, y];
}

const calculateDistance = () => {
  // will call getPoints in each wire to get the points ✓
  // will find the points where they intersect and ✓
  // will calculate the distance for each one from the center ✓
  // will return the least distance ✓
  let leastDistance;
  const points = input.map(getPoints);
  const smallerArrayIndex = points[0].length > points[1].length ? 1 : 0;
  const largerArrayIndex = Math.abs(smallerArrayIndex - 1);
  for (let i = 0; i < points[smallerArrayIndex].length - 1; i++) {
    for (let j = 0; j < points[largerArrayIndex].length - 1; j++) {
      const line1 = points[smallerArrayIndex];
      const line2 = points[largerArrayIndex];
      const intersection = intersect(
        line1[i],
        line1[i + 1],
        line2[j],
        line2[j + 1]
      );
      if (intersection !== false) {
        const dist = Math.abs(intersection[0]) + Math.abs(intersection[1]);
        if (leastDistance > dist || leastDistance === undefined) {
          leastDistance = dist;
        }
      }
    }
  }
  return leastDistance;
};

console.log(calculateDistance());
