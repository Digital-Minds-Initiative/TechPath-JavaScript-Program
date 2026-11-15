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

check("sumTo(4)", () => sumTo(4), 10);
check("sumTo(1)", () => sumTo(1), 1);
check("sumTo(0)", () => sumTo(0), 0);
check("sumTo(100)", () => sumTo(100), 5050);
check("countEven(10)", () => countEven(10), 5);
check("countEven(7)", () => countEven(7), 3);
check("countEven(1)", () => countEven(1), 0);
check("stars(3)", () => stars(3), "★★★");
check("stars(1)", () => stars(1), "★");
check("stars(0) نص فاضي", () => stars(0), "");
check("firstSquareOver(50)", () => firstSquareOver(50), 8);
check("firstSquareOver(64) لازم أكبر مو يساوي", () => firstSquareOver(64), 9);
check("firstSquareOver(0)", () => firstSquareOver(0), 1);
report();
