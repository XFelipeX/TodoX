import { addTopicOnHtml } from './Topic.js';
import { clearTasksOnLocalStorage } from './storage.js';
import { generateUUID } from './util.js';
const newTaskBtn = document.querySelector('.tasks-btn-new-task');
const addTaskBtn = document.querySelector('.btn-add-task');
const tasksList = document.querySelector('.tasks-list');
const backModals = document.querySelectorAll('[class^="back"]');
const clearTasksBtn = document.querySelector('#clear-tasks');
const deleteTasksBtn = document.querySelector('#delete-tasks');
const percentModalTaskView = document.querySelector('.modal-tv-percent span');
let taskIdToModal = null;

class Task {
  constructor(name) {
    this.id = generateUUID();
    this.name = name;
    this.topics = [];
    this.percent = 0;
  }
}

deleteTasksBtn.addEventListener('click', deleteAllTasks);
addTaskBtn.addEventListener('click', addNewTask);

function deleteAllTasks() {
  clearTasksOnLocalStorage();
  tasksList.innerHTML = '';
  document.querySelector('.back-delete-tasks').classList.add('hidden');
}

function addEventsToOpenModals() {
  newTaskBtn.addEventListener('click', function () {
    document.querySelector('.back-new-task').classList.remove('hidden');
  });

  clearTasksBtn.addEventListener('click', function () {
    document.querySelector('.back-delete-tasks').classList.remove('hidden');
  });
}

function addNewTask() {
  const input = document.querySelector('#task');
  if (input.value == '') return;
  let task = new Task(input.value);
  // HTML element
  const li = document.createElement('li');
  const percent = document.createElement('span');
  percent.classList.add('tasks-list-percent');
  percent.innerText = task.percent + '%';
  li.innerText = input.value;
  li.setAttribute('id', task.id);
  // modal to see topics of the task
  li.addEventListener('click', function () {
    showTaskModal(li.getAttribute('id'));
  });
  li.appendChild(percent);
  tasksList.appendChild(li);

  // List of tasks
  window.todox.tasks.push(task);

  // reset
  input.value = '';
  document.querySelector('.back-new-task').classList.add('hidden');
}

export function showTaskModal(taskId) {
  let task = window.todox.tasks.filter((value) => value.id === taskId)[0];
  taskIdToModal = task.id;
  // update info
  document.querySelector('.modal-tv-header-taskname').innerText = task.name;
  document
    .querySelector('.modal-tv-task-progress')
    .setAttribute('value', task.percent);
  document.querySelector('.modal-tv-percent > span').innerText = task.percent;
  document.querySelector('.modal-tv-topics').innerHTML = '';
  task.topics.forEach((topic) => {
    addTopicOnHtml(topic);
  });
  percentModalTaskView.innerText = calcNewPercent(task.id);

  // show modal
  document.querySelector('.back-task-view').classList.remove('hidden');
}

function addEventOnBackModals() {
  backModals.forEach((back) => {
    back.addEventListener('click', function (event) {
      const classNameTarget = event.target.className.toString();
      const backClass = Array.from(back.classList).filter((value) =>
        value.toString().includes('back'),
      );
      if (classNameTarget === backClass.toString()) {
        back.classList.add('hidden');
      }
    });
  });

  // event to open task modal
  document.querySelectorAll('.tasks-list li').forEach((li) => {
    li.addEventListener('click', function () {
      showTaskModal(li.getAttribute('id'));
    });
  });
}

export function calcNewPercent(taskId) {
  let task = window.todox.tasks.find((t) => t.id === taskId);
  let total = task.topics.length;
  if (total === 0) return 0;
  let done = task.topics.filter((topic) => topic.done === true).length;

  let percent = (done / total) * 100;
  return percent.toFixed(0);
}

addEventOnBackModals();
addEventsToOpenModals();

export { taskIdToModal };
