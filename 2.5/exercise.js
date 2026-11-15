const STORAGE_KEY = "techpath-tasks";

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? [] : JSON.parse(saved);
}

const tasks = loadTasks();

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const list = document.querySelector("#tasks");
  const remaining = document.querySelector("#remaining");

  list.replaceChildren();
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.textContent = task.text;
    item.dataset.index = index;
    if (task.done) {
      item.classList.add("done");
    }
    list.append(item);
  });

  const left = tasks.filter((task) => !task.done).length;
  remaining.textContent = `المتبقي: ${left}`;
}

function addTask(text) {
  tasks.push({ text, done: false });
  saveTasks();
  render();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  render();
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
