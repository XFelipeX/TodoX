import { tasksList } from "./task.js";

function checkLocalTasks() {
  const todox = JSON.parse(localStorage.getItem("todox"));
  if (todox) {
    window.todox = todox;
    window.todox.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerText = task.name;
      tasksList.appendChild(li);
    });
  }
}

window.onload = function () {
  checkLocalTasks();
};

export function addTasksOnLocalStorage(todox) {
  window.todox = todox;
  localStorage.setItem("todox", JSON.stringify(window.todox));
}

export function getTasksOnLocalStorage() {
  return JSON.parse(localStorage.getItem("todox"));
}

export function clearTasksOnLocalStorage() {
  localStorage.setItem("todox", null);
}
