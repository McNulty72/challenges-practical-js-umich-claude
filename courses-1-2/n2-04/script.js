const inputTask = document.querySelector("#task");
const taskPriorities = document.querySelector(".radio-container");
const addTaskBtn = document.querySelector(".add-task");
let tasksCount = 0;
let tasksDoneCount = 0;

let taskPriority = "";
function getPriotity(event) {
  const priority = document.querySelector(
    'input[name="task-priority"]:checked',
  );
  if (!priority) return;
  taskPriority = priority.value;
  console.log(taskPriority);
}

function createNewElement(element, classes = []) {
  const newElement = document.createElement(element);
  if (classes.length) {
    classes.forEach((ele) => newElement.classList.add(ele));
  }
  return newElement;
}

function updateTasksCounts(newTasks = 0, tasksDone = 0) {
  tasksCount += newTasks;
  tasksDoneCount += tasksDone;
  const tasksCounts = document.querySelector(".tasks-count");
  tasksCounts.textContent = `${tasksDoneCount} / ${tasksCount} done`;
}

function manageTasks(event) {
  const target = event.target;
  const currentTarget = event.currentTarget;
  const taskSpan = currentTarget.querySelector(".task-description span");
  if (target === currentTarget.querySelector(".done-btn")) {
    taskSpan.classList.add("done");
    updateTasksCounts(0, 1);
  } else {
    updateTasksCounts(-1, taskSpan.classList.contains("done") ? -1 : 0);
    currentTarget.remove();
  }
}

const priorityClassesMap = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};
function addTask(eve) {
  eve.preventDefault();
  const task = inputTask.value;
  inputTask.value = "";
  if (!task.trim()) {
    inputTask.focus();
    return;
  }

  // Get tasks list
  const tasksList = document.querySelector(".tasks-list");

  // Create new task item
  const newTask = createNewElement("li", ["task-item"]);

  // Create task actions container and buttons
  const actionsContainer = createNewElement("div", ["task-actions"]);
  const doneBtn = createNewElement("button", ["done-btn"]);
  const deleteBtn = createNewElement("button", ["delete-btn"]);
  doneBtn.textContent = "\u2714";
  deleteBtn.textContent = "\u2718";
  actionsContainer.append(doneBtn);
  actionsContainer.append(deleteBtn);

  // Create priority container
  const priorityContainer = createNewElement("div", ["task-priority"]);
  const prioritySpan = createNewElement("span", [
    priorityClassesMap[taskPriority],
  ]);
  prioritySpan.textContent = taskPriority;
  priorityContainer.append(prioritySpan);

  // Create task description container
  const descriptionContainer = createNewElement("div", ["task-description"]);
  const descriptionSpan = createNewElement("span");
  descriptionSpan.textContent = task;
  descriptionContainer.append(descriptionSpan);

  // append task item parts
  newTask.append(actionsContainer);
  newTask.append(priorityContainer);
  newTask.append(descriptionContainer);

  // Append new task item to task list
  tasksList.append(newTask);

  // Update tasks count
  updateTasksCounts(1);

  // Add  EventListener
  newTask.addEventListener("click", manageTasks);
}

taskPriorities.addEventListener("click", getPriotity);
addTaskBtn.addEventListener("click", addTask);
