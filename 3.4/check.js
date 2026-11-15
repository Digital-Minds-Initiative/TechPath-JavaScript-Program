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
  await check("buildReposUrl", () => buildReposUrl("octocat"), "https://api.github.com/users/octocat/repos?per_page=100&sort=updated");
  await check("buildReposUrl مع حروف خاصة", () => buildReposUrl("a b"), "https://api.github.com/users/a%20b/repos?per_page=100&sort=updated");

  const repos = [
    { name: "a", stargazers_count: 5, fork: false },
    { name: "b", stargazers_count: 50, fork: true },
    { name: "c", stargazers_count: 20, fork: false },
    { name: "d", stargazers_count: 0, fork: false },
    { name: "e", stargazers_count: 9, fork: false },
  ];
  await check("topRepos(repos, 3)", () => topRepos(repos, 3).map((r) => r.name), ["c", "e", "a"]);
  await check("topRepos مع count أكبر من العدد", () => topRepos(repos, 10).length, 4);

  const res = (status, remaining) => new Response("{}", { status, headers: { "x-ratelimit-remaining": remaining } });
  await check("isRateLimited: 403 و 0", () => isRateLimited(res(403, "0")), true);
  await check("isRateLimited: 429 و 0", () => isRateLimited(res(429, "0")), true);
  await check("isRateLimited: 403 وباقي طلبات", () => isRateLimited(res(403, "12")), false);
  await check("isRateLimited: 200", () => isRateLimited(res(200, "59")), false);

  report();
})();
