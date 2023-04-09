import { tasksList } from "./task.js";

// Export json file
function generateJson() {
  var dados = tasks;
  var json = JSON.stringify(dados);
  var blob = new Blob([json], { type: "application/json;charset=utf-8" });
  var link = document.getElementById("export-tasks");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "TASKS-" + getCurrentDate() + ".json");
  console.log();
}

function getCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay() + 2;
  if (day <= 9) day = "0" + day;
  if (month <= 9) month = "0" + month;
  return day + "." + month + "." + year;
}

document.querySelector("#export-tasks").addEventListener("click", generateJson);

// Import json file
window.importTasks = function () {
  // Read file
  const reader = new FileReader();
  reader.onload = function (event) {
    tasks = JSON.parse(event.target.result);
    // Import
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerText = task.name;
      tasksList.appendChild(li);
      // localstorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  };
  reader.readAsText(document.getElementById("import-tasks").files[0]);
  document.getElementById("import-tasks").value = "";
};
