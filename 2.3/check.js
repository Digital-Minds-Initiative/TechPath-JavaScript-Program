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

const nameInput = document.querySelector("#name");
const typeInto = (input, value) => {
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

check("setupCounter: ثلاث ضغطات", () => {
  setupCounter();
  const button = document.querySelector("#add");
  button.click();
  button.click();
  button.click();
  return document.querySelector("#count").textContent;
}, "3");

check("setupPreview", () => {
  setupPreview();
  typeInto(nameInput, "مازن");
  return document.querySelector("#preview").textContent;
}, "مازن");

check("setupEscape", () => {
  setupEscape();
  typeInto(nameInput, "سارة");
  nameInput.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  return [nameInput.value, document.querySelector("#preview").textContent];
}, ["", ""]);

check("setupColors: الضغط على النص داخل الزر", () => {
  setupColors();
  document.querySelector("#colors span").click();
  return document.querySelector("#chosen").textContent;
}, "أحمر");

check("setupColors: زر انضاف بعد المستمع", () => {
  const button = document.createElement("button");
  button.dataset.color = "أخضر";
  button.textContent = "أخضر";
  document.querySelector("#colors").append(button);
  button.click();
  return document.querySelector("#chosen").textContent;
}, "أخضر");

check("setupLink يمنع الانتقال", () => {
  setupLink();
  let preventedByYou = false;
  const guard = (event) => {
    preventedByYou = event.defaultPrevented;
    event.preventDefault();
  };
  document.addEventListener("click", guard);
  document.querySelector("#more").dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  document.removeEventListener("click", guard);
  return [preventedByYou, document.querySelector("#link-message").textContent];
}, [true, "قريبًا"]);

report();
