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

check("fullName", () => fullName("مازن", "الغامدي"), "مازن الغامدي");
check("isEven(4)", () => isEven(4), true);
check("isEven(7)", () => isEven(7), false);
check("isEven مكتوبة كدالة سهمية", () => typeof isEven === "function" && !("prototype" in isEven), true);
check("applyTwice مع رقم", () => applyTwice((n) => n + 3, 1), 7);
check("applyTwice مع نص", () => applyTwice((s) => s + "!", "هلا"), "هلا!!");
report();
