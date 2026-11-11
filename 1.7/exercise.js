const repos = [
  { name: "portfolio", stars: 12 },
  { name: "dev-card", stars: 48 },
  { name: "weather", stars: 130 },
];

function totalStars(list) {
  let total = 0;
  for (const repo of list) {
    total = total + repo.stars;
  }
  return total;
}

const output = document.querySelector("#total-output");
output.textContent = totalStars(repos);
