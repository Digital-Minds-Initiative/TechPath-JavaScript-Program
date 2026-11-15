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
  let fail = false;
  fakeServer((url, options) => {
    if (fail) return jsonResponse({}, 500);
    let data = null;
    try { data = JSON.parse(options.body); } catch {}
    return jsonResponse({ ...data, id: 101 }, 201);
  });

  await check("createPost ترجع رد الخادم", () => createPost("أول منشور", "تجربة").then((p) => p.id), 101);
  const last = () => calls.at(-1) || { options: {} };
  await check("الرابط", () => last().url, "https://jsonplaceholder.typicode.com/posts");
  await check("method", () => last().options.method, "POST");
  await check("Content-Type", () => {
    const headers = new Headers(last().options.headers);
    return headers.get("Content-Type");
  }, "application/json");
  await check("body نص JSON صحيح", () => JSON.parse(last().options.body), { title: "أول منشور", body: "تجربة", userId: 1 });
  await check("ترمي خطأ مع 500", () => { fail = true; return createPost("x", "y"); }, "Error: HTTP 500");

  window.fetch = realFetch;
  report();
})();
