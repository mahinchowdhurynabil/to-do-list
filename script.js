const inputText = document.querySelector(".task-input");
const inputBtn = document.querySelector(".btn");
const taskList = document.querySelector(".task-list");

const dateEl = document.querySelector(".date-input");
const timeEl = document.querySelector(".time-input");
const toggleMode = document.querySelector(".toggle-mode");

toggleMode.onclick = function () {
  const moon = document.querySelector(".moon");
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    moon.classList.remove(`fa-moon`);
    moon.classList.add(`fa-sun`);
  } else {
    moon.classList.remove(`fa-sun`);
    moon.classList.add(`fa-moon`);
  }
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
dateEl.placeholder = `${day}/${month}/${year}`;

let currentTime = "";
setInterval(() => {
  const now = new Date();
  let hour = String(now.getHours()).padStart(2, "0");
  let min = String(now.getMinutes()).padStart(2, "0");

  let period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  currentTime = `${hour}:${min} ${period}`;
  timeEl.placeholder = `${hour}:${min} ${period}`;
}, 1000);

const allEl = document.querySelector(".all");
const activeEl = document.querySelector(".active");
const completeEl = document.querySelector(".complete");

allEl.addEventListener("click", () => {
  currentFilter = "all";
  setActiveTab(allEl);
  updateView();
});

activeEl.addEventListener("click", () => {
  currentFilter = "active";
  setActiveTab(activeEl);
  updateView();
});

completeEl.addEventListener("click", () => {
  currentFilter = "completed";
  setActiveTab(completeEl);
  updateView();
});

let currentFilter = "all";

function updateView() {
  let filteredTasks;

  if (currentFilter === "all") {
    filteredTasks = taskObj;
  } else if (currentFilter === "active") {
    filteredTasks = taskObj.filter((task) => !task.completed);
  } else {
    filteredTasks = taskObj.filter((task) => task.completed);
  }

  renderTask(filteredTasks);
}

function setActiveTab(selectedTab) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("onair");
  });
  selectedTab.classList.add("onair");
}

inputBtn.addEventListener("click", () => {
  getTask();

  localStorage.setItem("tasks", JSON.stringify(taskObj));
  updateView();
});

let inputTask;

inputText.addEventListener("keyup", (e) => {
  inputTask = e.target.value;

  if (e.key === "Enter") {
    getTask();
    updateView();
  }
});

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskObj = storedTasks;

function renderTask(render) {
  inputText.value = "";
  taskList.innerHTML = "";

  render.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    taskList.appendChild(taskEl);

    const inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    taskEl.appendChild(inputEl);
    inputEl.checked = task.completed;

    const showPriority = document.createElement("div");
    showPriority.classList.add("show-priority");
    taskEl.appendChild(showPriority);

    if (task.priorityLevel === "high") {
      showPriority.style.backgroundColor = "#fd605f";
    } else if (task.priorityLevel === "medium") {
      showPriority.style.backgroundColor = "#f9cb65";
    } else if (task.priorityLevel === "normal") {
      showPriority.style.backgroundColor = "#02b993";
    }

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskEl.appendChild(taskInfo);

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskInfo.appendChild(taskTitle);
    taskTitle.innerText = task.task;

    const taskTime = document.createElement("p");
    taskTime.classList.add("task-time");
    taskInfo.appendChild(taskTime);
    taskTime.innerText = task.taskTime;

    const taskAction = document.createElement("div");
    taskAction.classList.add("task-action");
    taskEl.appendChild(taskAction);

    const iconEl = document.createElement("i");
    iconEl.classList.add("fa-solid", "fa-check", "task-complete");
    taskAction.appendChild(iconEl);
    iconEl.addEventListener("click", () => {
      const realTask = taskObj.find((t) => t.id === task.id);
      realTask.completed = !realTask.completed;

      localStorage.setItem("tasks", JSON.stringify(taskObj));
      updateView();
    });

    if (task.completed) {
      taskEl.classList.add("green");
    }

    const iconE2 = document.createElement("i");
    iconE2.classList.add("fa-solid", "fa-trash", "task-delete");
    taskAction.appendChild(iconE2);
    iconE2.addEventListener("click", () => {
      const realIndex = taskObj.findIndex((t) => t.id === task.id);
      taskObj.splice(realIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(taskObj));
      updateView();
    });
  });

  const taskNumber = document.querySelector(".task-number");
  taskNumber.innerText = `${taskObj.length} task`;

  const completedTaskNum = document.querySelector(".completed-task");
  const completedCount = taskObj.filter((task) => task.completed).length;
  completedTaskNum.innerText = `${completedCount} completed`;
}

const highPriority = document.querySelector(".high");
const mediumPriority = document.querySelector(".medium");
const normalPriority = document.querySelector(".normal");

highPriority.addEventListener("click", () => {
  pritorityLevel = "high";
  setPriority(pritorityLevel);
});

mediumPriority.addEventListener("click", () => {
  pritorityLevel = "medium";
  setPriority(pritorityLevel);
});

normalPriority.addEventListener("click", () => {
  pritorityLevel = "normal";
  setPriority(pritorityLevel);
});

let pritorityLevel = "normal";
function setPriority(pritorityLevel) {
  let cricleEl = document.querySelectorAll(".circle");
  cricleEl.forEach((circle) => {
    circle.classList.remove("activePryo");
  });

  document.querySelector(`.${pritorityLevel}`).classList.add("activePryo");
}

setPriority(pritorityLevel);

function getTask() {
  const newTask = {
    id: Date.now(),
    task: inputTask,
    taskTime: `${currentTime} ${day}/${month}/${year}`,
    completed: false,
    priorityLevel: pritorityLevel,
  };

  taskObj.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskObj));
}

updateView();
