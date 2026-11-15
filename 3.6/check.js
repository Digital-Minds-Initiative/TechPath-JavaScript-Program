const results = [];

async function check(label, run, expected) {
  let actual;
  try {
    actual = await run();
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


let mod = {};
try {
  mod = await import("./exercise.js");
} catch (error) {
  console.log("   ما قدرنا نحمّل exercise.js:", error.message);
}

await check("formatStars عليها export", () => typeof mod.formatStars, "function");
await check("formatStars(48)", () => mod.formatStars(48), "48 ★");
await check("API_BASE", () => mod.API_BASE, "https://api.github.com");
await new Promise((resolve) => setTimeout(resolve, 100));
await check("main.js يعرض النتيجة في #stars", () => document.querySelector("#stars").textContent, "48 ★");
report();
