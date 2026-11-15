function buildReposUrl(username) {
  return `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
}

function topRepos(repos, count) {
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

function isRateLimited(response) {
  const limited = response.status === 403 || response.status === 429;
  return limited && response.headers.get("x-ratelimit-remaining") === "0";
}
