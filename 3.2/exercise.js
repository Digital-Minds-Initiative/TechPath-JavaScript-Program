async function getUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();
  return user;
}

async function getStatus(url) {
  const response = await fetch(url);
  return response.status;
}
