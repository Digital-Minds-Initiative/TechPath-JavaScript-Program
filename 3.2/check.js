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
  fakeServer((url) => {
    if (url === "https://api.github.com/users/octocat") {
      return jsonResponse({ login: "octocat", name: "The Octocat" });
    }
    if (url.endsWith("/missing")) return jsonResponse({ message: "Not Found" }, 404);
    return jsonResponse({}, 200);
  });

  await check("getUser ترجع الكائن", async () => {
    const user = await getUser("octocat");
    return user && user.name;
  }, "The Octocat");
  await check("getUser تطلب الرابط الصحيح", () => calls.at(-1)?.url, "https://api.github.com/users/octocat");
  await check("getStatus: 200", () => getStatus("https://example.test/ok"), 200);
  await check("getStatus: 404", () => getStatus("https://example.test/missing"), 404);

  window.fetch = realFetch;
  report();
})();
