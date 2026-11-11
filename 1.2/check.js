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

check("introduce", () => introduce("مازن", 3), "أنا مازن، في السنة 3");
check("introduce بقيم ثانية", () => introduce("سارة", 2), "أنا سارة، في السنة 2");
check("addStrings ترجع رقم", () => addStrings("5", "3"), 8);
check("addStrings مع أرقام أكبر", () => addStrings("40", "2"), 42);
check("describe رقم", () => describe(42), "number");
check("describe نص", () => describe("هلا"), "string");
check("describe قيمة منطقية", () => describe(true), "boolean");
report();
