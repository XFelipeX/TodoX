import { calcNewPercent, taskIdToModal } from './task.js';
import { generateUUID } from './util.js';

const btnAddTopic = document.querySelector('#btn-add-topic');
const listOfTopics = document.querySelector('.modal-tv-topics');
const progressBar = document.querySelector('.modal-tv-task-progress');
const percentModalTaskView = document.querySelector('.modal-tv-percent span');

class Topic {
  constructor(name) {
    this.id = generateUUID();
    this.name = name;
    this.done = false;
  }
}

btnAddTopic.addEventListener('click', addTopic);

function addTopic() {
  let taskIndex = window.todox.tasks.findIndex(
    (task) => task.id === taskIdToModal,
  );
  const name = document.querySelector('#create-topic').value;
  if (name === '') return;
  let topic = new Topic(name);
  window.todox.tasks[taskIndex].topics.push(topic);
  addTopicOnHtml(topic);
  percentModalTaskView.innerText = calcNewPercent(taskIdToModal);
  progressBar.setAttribute('value', calcNewPercent(taskIdToModal));
  document.querySelector('#create-topic').value = '';
}

export function addTopicOnHtml(topic) {
  let li = document.createElement('li');
  let label = document.createElement('label');
  let input = document.createElement('input');
  input.setAttribute('id', topic.id);
  input.setAttribute('name', topic.id);
  input.setAttribute('type', 'checkbox');
  input.checked = topic.done;
  label.setAttribute('for', topic.id);
  label.innerText = topic.name;
  li.classList.add('modal-tv-topics-topic');
  li.appendChild(label);
  li.appendChild(input);
  input.addEventListener('click', function () {
    changeStateTopic(topic);
  });
  const newPercent = calcNewPercent(taskIdToModal);
  const taskLi = document.getElementById(taskIdToModal);
  const percentOnInitialScreen = taskLi.querySelector('.tasks-list-percent');
  percentOnInitialScreen.innerText = newPercent + '%';
  listOfTopics.appendChild(li);
}

function changeStateTopic(topic) {
  let taskIndex = window.todox.tasks.findIndex(
    (task) => task.id === taskIdToModal,
  );
  let topicIndex = window.todox.tasks[taskIndex].topics.findIndex(
    (ele) => ele.id === topic.id,
  );

  window.todox.tasks[taskIndex].topics[topicIndex].done = !topic.done;

  // update percent
  const newPercent = calcNewPercent(taskIdToModal);
  progressBar.setAttribute('value', newPercent);
  percentModalTaskView.innerText = newPercent;
  const taskLi = document.getElementById(taskIdToModal);
  const percentOnInitialScreen = taskLi.querySelector('.tasks-list-percent');
  percentOnInitialScreen.innerText = newPercent + '%';
}
