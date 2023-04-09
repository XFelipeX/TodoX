import { addTasksOnLocalStorage, clearTasksOnLocalStorage } from "./storage.js";
import { generateUUID } from "./util.js";
const newTaskBtn = document.querySelector(".tasks-btn-new-task");
const addTaskBtn = document.querySelector(".btn-add-task");
const tasksList = document.querySelector(".tasks-list");
const backModals = document.querySelectorAll('[class^="back"]');
const clearTasksBtn = document.querySelector("#clear-tasks");
const deleteTasksBtn = document.querySelector("#delete-tasks");

class Task {
  constructor(name) {
    this.id = generateUUID();
    this.name = name;
    this.topics = [];
  }
}

deleteTasksBtn.addEventListener("click", deleteAllTasks);
addTaskBtn.addEventListener("click", addNewTask);

function deleteAllTasks() {
  clearTasksOnLocalStorage();
  tasksList.innerHTML = "";
  document.querySelector(".back-delete-tasks").classList.add("hidden");
}

function addEventsToOpenModals() {
  newTaskBtn.addEventListener("click", function () {
    document.querySelector(".back-new-task").classList.remove("hidden");
  });

  clearTasksBtn.addEventListener("click", function () {
    document.querySelector(".back-delete-tasks").classList.remove("hidden");
  });
}

function addNewTask() {
  const input = document.querySelector("#task");
  if (input.value == "") return;
  let task = new Task(input.value);
  // HTML element
  const newTaskEle = document.createElement("li");
  newTaskEle.innerText = input.value;
  newTaskEle.setAttribute("id", task.id);
  tasksList.appendChild(newTaskEle);

  // List of objects
  window.todox.tasks.push(task);

  // localstorage
  addTasksOnLocalStorage(window.todox);

  // reset
  input.value = "";
  document.querySelector(".back-new-task").classList.add("hidden");
}

function addEventOnBackModals() {
  backModals.forEach((back) => {
    back.addEventListener("click", function (event) {
      const classNameTarget = event.target.className.toString();
      const backClass = Array.from(back.classList).filter((value) =>
        value.toString().includes("back")
      );
      if (classNameTarget === backClass.toString()) {
        back.classList.add("hidden");
      }
    });
  });
}

addEventOnBackModals();
addEventsToOpenModals();
