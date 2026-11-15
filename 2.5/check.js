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

const KEY = "techpath-tasks";
const userSaved = localStorage.getItem(KEY);
const listTexts = () => [...document.querySelectorAll("#tasks li")].map((li) => li.textContent);

check("loadTasks: ما فيه شيء محفوظ", () => {
  localStorage.removeItem(KEY);
  return loadTasks();
}, []);

check("loadTasks: يقرأ المحفوظ", () => {
  localStorage.setItem(KEY, JSON.stringify([{ text: "أ", done: true }]));
  return loadTasks();
}, [{ text: "أ", done: true }]);

check("addTask تضيف وتعرض", () => {
  tasks.splice(0);
  localStorage.removeItem(KEY);
  addTask("مراجعة الدرس");
  addTask("حل التمرين");
  return listTexts();
}, ["مراجعة الدرس", "حل التمرين"]);

check("addTask تحفظ في localStorage", () => JSON.parse(localStorage.getItem(KEY)), [
  { text: "مراجعة الدرس", done: false },
  { text: "حل التمرين", done: false },
]);

check("toggleTask تضيف الكلاس done", () => {
  toggleTask(0);
  return [...document.querySelectorAll("#tasks li")].map((li) => li.classList.contains("done"));
}, [true, false]);

check("remaining يحسب غير المنجزة", () => document.querySelector("#remaining").textContent, "المتبقي: 1");

check("render ما تكرر العناصر", () => {
  render();
  render();
  return document.querySelectorAll("#tasks li").length;
}, 2);

check("الضغط على مهمة يقلبها", () => {
  document.querySelector("#tasks li").click();
  return tasks[0].done;
}, false);

try {
  tasks.splice(0);
  if (userSaved === null) {
    localStorage.removeItem(KEY);
  } else {
    localStorage.setItem(KEY, userSaved);
    tasks.push(...JSON.parse(userSaved));
  }
  render();
} catch (error) {
  console.log("   تنظيف ملف التحقق ما اكتمل:", error.message);
}
report();
