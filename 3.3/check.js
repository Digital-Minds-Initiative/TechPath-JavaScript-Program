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
  const status = document.querySelector("#status");
  const nameBox = document.querySelector("#name");
  fakeServer((url) => {
    if (url.endsWith("/users/octocat")) return jsonResponse({ login: "octocat", name: "The Octocat" });
    if (url.endsWith("/users/noname")) return jsonResponse({ login: "noname", name: null });
    if (url.endsWith("/users/offline")) throw new TypeError("Failed to fetch");
    if (url.endsWith("/broken")) return jsonResponse({}, 500);
    return jsonResponse({ message: "Not Found" }, 404);
  });

  await check("getJSON ترجع البيانات", () => getJSON("https://api.github.com/users/octocat").then((u) => u.login), "octocat");
  await check("getJSON ترمي خطأ مع 500", () => getJSON("https://example.test/broken"), "Error: HTTP 500");

  await check("showUser: رسالة التحميل قبل الرد", async () => {
    const pending = showUser("octocat");
    const text = status.textContent;
    await pending;
    return text;
  }, "جاري التحميل...");
  await check("showUser: النجاح", () => [status.textContent, nameBox.textContent], ["", "The Octocat"]);
  await check("showUser: name فاضي يعرض login", async () => {
    await showUser("noname");
    return nameBox.textContent;
  }, "noname");
  await check("showUser: 404", async () => {
    await showUser("no-such-user-123");
    return [status.textContent, nameBox.textContent];
  }, ["ما لقينا حساب بهذا الاسم", ""]);
  await check("showUser: انقطاع الاتصال", async () => {
    await showUser("offline");
    return [status.textContent, nameBox.textContent];
  }, ["تعذّر الاتصال، تأكد من الإنترنت وجرّب مرة ثانية", ""]);

  window.fetch = realFetch;
  report();
})();
