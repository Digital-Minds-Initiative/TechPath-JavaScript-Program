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

check("setTitle", () => {
  setTitle("مشاريعي");
  return document.querySelector("#title").textContent;
}, "مشاريعي");

check("countSkills", () => countSkills(), 3);

check("highlightSkill تضيف active للعنصر الصحيح", () => {
  highlightSkill("CSS");
  return [...document.querySelectorAll("#skills li")].map((li) => li.classList.contains("active"));
}, [false, true, false]);

check("setProfileLink", () => {
  setProfileLink("octocat");
  return document.querySelector("#profile").getAttribute("href");
}, "https://github.com/octocat");

check("getMode", () => getMode(), "dark");

report();
