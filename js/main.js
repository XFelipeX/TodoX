function startApp() {
  if (window.todox === undefined) {
    window.todox = {
      name: "TodoX",
      version: "1.0",
      tasks: [],
    };
  }
}

window.onload = function () {
  startApp();
};
