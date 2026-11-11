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

check("myName نص فيه اسم", () => typeof myName === "string" && myName.length > 0, true);
check("الضغط على الزر يكتب جملة فيها الاسم", () => {
  document.querySelector("#greet").click();
  return document.querySelector("#message").textContent.includes(myName);
}, true);
report();
