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

/* خادم وهمي: يستبدل fetch عشان التحقق يشتغل بدون إنترنت */
const realFetch = window.fetch;
const calls = [];
function fakeServer(handler) {
  window.fetch = async (input, options = {}) => {
    calls.push({ url: String(input), options });
    return handler(String(input), options);
  };
}
function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

(async () => {
  await check("predictOrder", () => predictOrder(), ["a", "c", "b", "d"]);

  const realSetTimeout = window.setTimeout;
  let captured = null;
  window.setTimeout = (fn, ms) => {
    captured = { fn, ms };
    return 0;
  };
  let ran = 0;
  await check("later تسجّل الدالة وما تشغّلها على طول", () => {
    later(() => ran++);
    return [ran, captured !== null];
  }, [0, true]);
  window.setTimeout = realSetTimeout;
  await check("later تستخدم setTimeout بـ 2000", () => captured && captured.ms, 2000);
  await check("later تعطي setTimeout الدالة نفسها", () => {
    if (captured && typeof captured.fn === "function") captured.fn();
    return ran;
  }, 1);

  report();
})();
