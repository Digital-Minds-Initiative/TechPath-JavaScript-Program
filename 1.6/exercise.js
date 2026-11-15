const repos = [
  { name: "portfolio", stars: 12 },
  { name: "dev-card", stars: 48 },
  { name: "todo-app", stars: 75 },
  { name: "weather", stars: 130 },
];

function repoNames(list) {
  return list.map((repo) => repo.name);
}

function popular(list) {
  return list.filter((repo) => repo.stars > 50);
}

function totalStars(list) {
  return list.reduce((sum, repo) => sum + repo.stars, 0);
}
