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

check("summary", () => summary(user), "سارة: 120 متابع");
check("withCity تضيف المدينة", () => withCity(user, "جدة").city, "جدة");
check("withCity تحتفظ بالباقي", () => withCity(user, "جدة").followers, 120);
check("withCity ترجع كائن جديد", () => {
  const result = withCity(user, "جدة");
  return typeof result === "object" && result !== null && result !== user;
}, true);
check("الكائن الأصلي ما تغيّر", () => withCity(user, "جدة")?.city === "جدة" && !("city" in user), true);
check("toJSONText", () => toJSONText({ a: 1, b: [2, 3] }), '{"a":1,"b":[2,3]}');
check("fromJSONText", () => fromJSONText('{"a":1,"b":[2,3]}'), { a: 1, b: [2, 3] });
report();
