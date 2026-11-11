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

check("gradeFor(95)", () => gradeFor(95), "ممتاز");
check("gradeFor(90)", () => gradeFor(90), "ممتاز");
check("gradeFor(75)", () => gradeFor(75), "جيد");
check("gradeFor(70)", () => gradeFor(70), "جيد");
check("gradeFor(69)", () => gradeFor(69), "يحتاج مراجعة");
check("displayName مع اسم", () => displayName("سارة"), "سارة");
check("displayName مع نص فاضي", () => displayName(""), "زائر");
check("displayName مع null", () => displayName(null), "زائر");
check("starsOrZero(12)", () => starsOrZero(12), 12);
check("starsOrZero(0) يبقى صفر", () => starsOrZero(0), 0);
check("starsOrZero(null)", () => starsOrZero(null), 0);
check("starsOrZero(undefined)", () => starsOrZero(undefined), 0);
report();
