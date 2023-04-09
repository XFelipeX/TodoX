import { addTasksOnLocalStorage, clearTasksOnLocalStorage } from "./storage.js";
const backModal = document.querySelector(".back-new-task");
const newTaskBtn = document.querySelector(".btn-new-task");
const addTaskBtn = document.querySelector(".btn-add");
const tasksList = document.querySelector(".tasks-list");

window.todox = {
  name: "TodoX",
  version: "1.0",
  tasks: [],
};

window.tasks = [];

newTaskBtn.addEventListener("click", function () {
  backModal.classList.remove("hidden");
});

backModal.addEventListener("click", function (event) {
  const classNameTarget = event.target.className.toString();
  if (classNameTarget === "back-new-task") {
    backModal.classList.add("hidden");
  }
});

addTaskBtn.addEventListener("click", addNewTask);

function addNewTask() {
  const input = document.querySelector("#task");
  if (input.value == "") return;
  // HTML element
  const newTaskEle = document.createElement("li");
  newTaskEle.innerText = input.value;
  tasksList.appendChild(newTaskEle);

  // List of objects
  window.todox.tasks.push(new Task(input.value));

  // localstorage
  addTasksOnLocalStorage(window.todox);

  // reset
  input.value = "";
  backModal.classList.add("hidden");
}

class Task {
  constructor(name) {
    this.name = name;
  }
}

const backDeleteTasks = document.querySelector(".back-delete-tasks");
const clearTasksBtn = document.querySelector("#clear-tasks");

backDeleteTasks.addEventListener("click", function (event) {
  const classNameTarget = event.target.className.toString();
  if (classNameTarget === "back-delete-tasks") {
    backDeleteTasks.classList.add("hidden");
  }
});

clearTasksBtn.addEventListener("click", function () {
  backDeleteTasks.classList.remove("hidden");
});

const deleteTasksBtn = document.querySelector("#delete-tasks");

deleteTasksBtn.addEventListener("click", function () {
  clearTasksOnLocalStorage();
  tasksList.innerHTML = "";
  backDeleteTasks.classList.add("hidden");
});

export { tasksList };
