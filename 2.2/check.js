const results = [];

function check(label, run, expected) {
  let actual;
  try {
    actual = run();
  } catch (error) {
    actual = `${error.name}: ${error.message}`;
  }
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  results.push(ok);
  console.log(`${ok ? "✓" : "✗"} ${label}`);
  if (!ok) {
    console.log("   المتوقع:", expected);
    console.log("   الناتج:", actual);
  }
}

function report() {
  const passed = results.filter(Boolean).length;
  const box = document.querySelector("#result");
  box.textContent = `${passed} / ${results.length}`;
  box.className = passed === results.length ? "pass" : "fail";
}

const listItems = () => [...document.querySelectorAll("#list li")].map((li) => li.textContent);

check("createItem ترجّع li بالنص", () => {
  const item = createItem("Dev Card");
  return [item.tagName, item.textContent];
}, ["LI", "Dev Card"]);

check("createItem ما تضيفه للصفحة", () => {
  const item = createItem("تجربة");
  return [item instanceof HTMLLIElement, document.querySelectorAll("#list li").length];
}, [true, 0]);

check("renderList تعرض العناصر", () => {
  renderList(["portfolio", "dev-card", "blog"]);
  return listItems();
}, ["portfolio", "dev-card", "blog"]);

check("renderList ما تكرر لو انستدعت مرتين", () => {
  renderList(["portfolio", "dev-card"]);
  renderList(["portfolio", "dev-card"]);
  return listItems();
}, ["portfolio", "dev-card"]);

check("removeFirst", () => {
  renderList(["أ", "ب", "ج"]);
  removeFirst();
  return listItems();
}, ["ب", "ج"]);

check("showMessage تعرض الوسوم كنص", () => {
  showMessage("<b>مرحبا</b>");
  const box = document.querySelector("#message");
  return [box.textContent, box.querySelector("b") === null];
}, ["<b>مرحبا</b>", true]);

renderList(["portfolio", "dev-card", "blog"]);
report();
