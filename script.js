// Get references to the main input field, controls, and display areas.
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const statusMessage = document.getElementById("statusMessage");
const emptyState = document.getElementById("emptyState");

const STORAGE_KEY = "task-manager-tasks";
let statusTimer;

// Builds a task element for the list.
function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = taskText;

    listItem.appendChild(taskSpan);
    return listItem;
}

// Returns the current tasks as an array of strings.
function getTasks() {
    return Array.from(document.querySelectorAll(".task-text")).map(function (task) {
        return task.textContent;
    });
}

// Saves the current task list in local storage.
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getTasks()));
}

// Updates the small task counter shown above the list.
function updateTaskCount() {
    const totalTasks = document.querySelectorAll(".task-item").length;
    taskCount.textContent = `${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`;
}

// Shows or hides the empty-state message.
function updateEmptyState() {
    const hasTasks = document.querySelectorAll(".task-item").length > 0;
    emptyState.classList.toggle("is-hidden", hasTasks);
}

// Shows an inline feedback message below the controls.
function showStatus(message, type) {
    clearTimeout(statusTimer);
    statusMessage.textContent = message;
    statusMessage.className = "status-message is-visible";

    if (type === "error") {
        statusMessage.classList.add("is-error");
    } else {
        statusMessage.classList.add("is-success");
    }

    statusTimer = setTimeout(function () {
        statusMessage.textContent = "";
        statusMessage.className = "status-message";
    }, 3000);
}

// Refreshes small UI details that depend on the current task list.
function refreshTaskUI() {
    updateTaskCount();
    updateEmptyState();
}

// Adds a new task to the list using the current input value.
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        showStatus("Please enter a task before adding it.", "error");
        return;
    }

    const duplicateTaskExists = getTasks().some(function (task) {
        return task.toLowerCase() === taskText.toLowerCase();
    });

    if (duplicateTaskExists) {
        showStatus("That task already exists. Enter a different task name.", "error");
        return;
    }

    taskList.appendChild(createTaskElement(taskText));
    saveTasks();
    refreshTaskUI();

    console.log(`Added task: ${taskText}`);
    logTasksToConsole();
    showStatus(`Added "${taskText}".`, "success");

    taskInput.value = "";
    taskInput.focus();
}

// Removes all tasks from the page and storage.
function clearAllTasks() {
    if (getTasks().length === 0) {
        showStatus("There are no tasks to clear.", "error");
        return;
    }

    taskList.innerHTML = "";
    saveTasks();
    refreshTaskUI();

    console.log("All tasks cleared.");
    logTasksToConsole();
    showStatus("Cleared all tasks.", "success");
    taskInput.focus();
}

// Deletes the first task whose text exactly matches the typed input.
function deleteTask() {
    const taskText = taskInput.value.trim().toLowerCase();

    if (taskText === "") {
        showStatus("Please enter the task name you want to delete.", "error");
        return;
    }

    const tasks = document.querySelectorAll(".task-item");
    let deletedTaskLabel = "";

    tasks.forEach(function (task) {
        const taskLabel = task.querySelector(".task-text");

        if (deletedTaskLabel === "" && taskLabel.textContent.toLowerCase() === taskText) {
            deletedTaskLabel = taskLabel.textContent;
            task.remove();
        }
    });

    if (deletedTaskLabel === "") {
        showStatus("Task not found. Check the name and try again.", "error");
        return;
    }

    saveTasks();
    refreshTaskUI();

    console.log(`Deleted task: ${deletedTaskLabel}`);
    logTasksToConsole();
    showStatus(`Deleted "${deletedTaskLabel}".`, "success");

    taskInput.value = "";
    taskInput.focus();
}

// Prints the full current task list to the browser console.
function logTasksToConsole() {
    const tasks = document.querySelectorAll(".task-text");

    console.clear();
    console.log("Current Tasks:");

    if (tasks.length === 0) {
        console.log("No tasks available.");
        return;
    }

    tasks.forEach(function (task, index) {
        console.log(`${index + 1}. ${task.textContent}`);
    });
}

// Loads any saved tasks from previous visits.
function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
        refreshTaskUI();
        return;
    }

    try {
        const parsedTasks = JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
            refreshTaskUI();
            return;
        }

        parsedTasks.forEach(function (taskText) {
            if (typeof taskText === "string" && taskText.trim() !== "") {
                taskList.appendChild(createTaskElement(taskText));
            }
        });
    } catch (error) {
        console.error("Could not load saved tasks.", error);
    }

    refreshTaskUI();
    logTasksToConsole();
}

// Connect the buttons to their behaviors.
addTaskBtn.addEventListener("click", addTask);
deleteTaskBtn.addEventListener("click", deleteTask);
clearAllBtn.addEventListener("click", clearAllTasks);

// Allow the Enter key to add a task quickly from the keyboard.
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load saved tasks and initialize the app state.
loadTasks();
