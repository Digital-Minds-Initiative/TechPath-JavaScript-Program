const scores = [80, 95, 70];

function average(list) {
  let sum = 0;
  for (let i = 0; i <= list.length; i++) {
    sum = sum + list[i];
  }
  return sum / list.length;
}

const result = averag(scores);
document.querySelector("#avg").textContent = result;
