import { calcNewPercent } from './task.js';

const tasksList = document.querySelector('.tasks-list');

function checkLocalTasks() {
  const todox = JSON.parse(localStorage.getItem('todox'));
  if (todox) {
    window.todox = todox;
    window.todox.tasks.forEach((task) => {
      const li = document.createElement('li');
      const percent = document.createElement('span');
      percent.classList.add('tasks-list-percent');
      percent.innerText = calcNewPercent(task.id) + '%';
      li.innerText = task.name;
      li.setAttribute('id', task.id);
      li.appendChild(percent);
      tasksList.appendChild(li);
    });
  }
}

checkLocalTasks();

export function addTasksOnLocalStorage(todox) {
  window.todox = todox;
  localStorage.setItem('todox', JSON.stringify(window.todox));
}

export function getTasksOnLocalStorage() {
  return JSON.parse(localStorage.getItem('todox'));
}

export function clearTasksOnLocalStorage() {
  localStorage.setItem('todox', null);
  window.todox.tasks = [];
}

window.addEventListener('beforeunload', function () {
  addTasksOnLocalStorage(window.todox);
});
