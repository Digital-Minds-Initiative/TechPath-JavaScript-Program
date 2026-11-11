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

const original = JSON.stringify(repos);
check("repoNames", () => repoNames(repos), ["portfolio", "dev-card", "todo-app", "weather"]);
check("popular", () => popular(repos), [{ name: "todo-app", stars: 75 }, { name: "weather", stars: 130 }]);
check("totalStars", () => totalStars(repos), 265);
check("totalStars لمصفوفة فاضية", () => totalStars([]), 0);
check("المصفوفة الأصلية ما تغيّرت", () => Array.isArray(popular(repos)) && JSON.stringify(repos) === original, true);
report();
