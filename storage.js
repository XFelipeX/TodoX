import { tasksList } from "./task.js";

function checkLocalTasks() {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  if (localTasks) {
    localTasks.forEach((task) => {
      tasks.push(task);
    });
  }
  window.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.name;
    tasksList.appendChild(li);
  });
}

window.onload = function () {
  checkLocalTasks();
};

export function addTasksOnLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasksOnLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks"));
}

export function clearTasksOnLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify([]));
}
