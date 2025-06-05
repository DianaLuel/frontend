const tasks = [
  { id: 1, title: "Go Shooping 🛒", completed: false },
  { id: 2, title: "Study for Exam 📚", completed: true },
];

let filter = "all";

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? task.completed
      : !task.completed
  );

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li class="empty">📭 No tasks here!</li>';
    return;
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");

    const span = document.createElement("span");
    span.textContent = task.title;
    span.classList.add("task-title");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask(title) {
  if (!title.trim()) {
    alert("🚫 Task title cannot be empty!");
    return;
  }

  tasks.push({
    id: Date.now(),
    title: title.trim(),
    completed: false,
  });

  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index > -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function filterTasks(status) {
  filter = status;
  renderTasks();
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskInput = document.getElementById("taskInput");
  addTask(taskInput.value);
  taskInput.value = "";
});

document.getElementById("taskList").addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.getAttribute("data-id"));
  const task = tasks.find((t) => t.id === id);

  if (e.target.classList.contains("task-checkbox")) {
    toggleComplete(id);
  } else if (e.target.textContent === "🗑") {
    deleteTask(id);
  } else if (e.target.textContent === "✏️") {
    const span = li.querySelector(".task-title");
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.title;
    input.classList.add("edit-input");
    li.replaceChild(input, span);
    e.target.textContent = "💾"; // Save button
  } else if (e.target.textContent === "💾") {
    const input = li.querySelector(".edit-input");
    const newTitle = input.value.trim();
    if (!newTitle) {
      alert("🚫 Task title cannot be empty!");
      return;
    }
    task.title = newTitle;
    renderTasks();
  }
});

window.onload = renderTasks;
