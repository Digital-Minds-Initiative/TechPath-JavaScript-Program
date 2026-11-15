function createItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function renderList(items) {
  const list = document.querySelector("#list");
  list.replaceChildren();
  items.forEach((text) => {
    list.append(createItem(text));
  });
}

function removeFirst() {
  const first = document.querySelector("#list li");
  if (first) {
    first.remove();
  }
}

function showMessage(text) {
  document.querySelector("#message").textContent = text;
}
