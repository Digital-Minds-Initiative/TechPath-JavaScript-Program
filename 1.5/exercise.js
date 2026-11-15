function fullName(first, last) {
  return `${first} ${last}`;
}

const isEven = (n) => n % 2 === 0;

function applyTwice(fn, value) {
  return fn(fn(value));
}
