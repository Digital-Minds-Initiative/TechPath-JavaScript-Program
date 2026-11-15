function setTitle(text) {
  document.querySelector("#title").textContent = text;
}

function countSkills() {
  return document.querySelectorAll("#skills li").length;
}

function highlightSkill(name) {
  const items = document.querySelectorAll("#skills li");
  items.forEach((item) => {
    if (item.textContent === name) {
      item.classList.add("active");
    }
  });
}

function setProfileLink(username) {
  const link = document.querySelector("#profile");
  link.setAttribute("href", `https://github.com/${username}`);
}

function getMode() {
  return document.querySelector("#theme").dataset.mode;
}
