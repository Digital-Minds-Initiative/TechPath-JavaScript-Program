function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total = total + i;
  }
  return total;
}

function countEven(n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      count++;
    }
  }
  return count;
}

function stars(n) {
  let result = "";
  for (let i = 1; i <= n; i++) {
    result = result + "★";
  }
  return result;
}

function firstSquareOver(limit) {
  let i = 1;
  while (i * i <= limit) {
    i++;
  }
  return i;
}
