const STORAGE_KEY = "techpath-tasks";

function loadTasks() {
  // اكتب هنا
}

const tasks = loadTasks();

function saveTasks() {
  // اكتب هنا
}

function render() {
  const list = document.querySelector("#tasks");
  const remaining = document.querySelector("#remaining");
  // اكتب هنا
  // تذكر: كل li يحتاج data-index برقم المهمة
}

function addTask(text) {
  // اكتب هنا
}

function toggleTask(index) {
  // اكتب هنا
}

/* الأحداث جاهزة، لا تعدّلها */

const form = document.querySelector("#task-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = new FormData(form).get("task").trim();
  if (text === "") return;
  addTask(text);
  form.reset();
});

document.querySelector("#tasks").addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  toggleTask(Number(item.dataset.index));
});

render();
