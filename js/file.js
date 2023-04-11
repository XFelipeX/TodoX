import { calcNewPercent, showTaskModal } from './task.js';
import { getCurrentDate } from './util.js';
const tasksList = document.querySelector('.tasks-list');

document.querySelector('#export-tasks').addEventListener('click', generateJson);

// Export json file
function generateJson() {
  let dados = window.todox;
  if (dados.tasks.length === 0) return;
  let json = JSON.stringify(dados);
  let blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  let link = document.getElementById('export-tasks');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', 'TASKS-' + getCurrentDate() + '.json');
}

// Import json file
window.importTasks = function () {
  // Read file
  const reader = new FileReader();
  reader.onload = function (event) {
    let result = JSON.parse(event.target.result);
    if (result && result.name == 'TodoX') {
      window.todox = result;
      // Import
      tasksList.innerHTML = '';
      window.todox.tasks.forEach((task) => {
        let li = document.createElement('li');
        const percent = document.createElement('span');
        percent.classList.add('tasks-list-percent');
        percent.innerText = calcNewPercent(task.id) + '%';
        li.innerText = task.name;
        li.setAttribute('id', task.id);
        li.addEventListener('click', function () {
          showTaskModal(li.getAttribute('id'));
        });
        li.appendChild(percent);
        tasksList.appendChild(li);
      });
    } else {
      alert(
        'Files are supported only if they are generated by the TodoX application',
      );
    }
  };
  reader.readAsText(document.getElementById('import-tasks').files[0]);
  document.getElementById('import-tasks').value = '';
};
