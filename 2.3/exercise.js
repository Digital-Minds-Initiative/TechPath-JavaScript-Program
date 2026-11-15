function setupCounter() {
  const button = document.querySelector("#add");
  const count = document.querySelector("#count");
  button.addEventListener("click", () => {
    count.textContent = Number(count.textContent) + 1;
  });
}

function setupPreview() {
  const nameInput = document.querySelector("#name");
  const preview = document.querySelector("#preview");
  nameInput.addEventListener("input", () => {
    preview.textContent = nameInput.value;
  });
}

function setupEscape() {
  const nameInput = document.querySelector("#name");
  const preview = document.querySelector("#preview");
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nameInput.value = "";
      preview.textContent = "";
    }
  });
}

function setupColors() {
  const colors = document.querySelector("#colors");
  const chosen = document.querySelector("#chosen");
  colors.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    chosen.textContent = button.dataset.color;
  });
}

function setupLink() {
  const link = document.querySelector("#more");
  const message = document.querySelector("#link-message");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    message.textContent = "قريبًا";
  });
}
