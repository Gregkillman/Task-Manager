# Tasky

A lightweight browser-based task manager built with plain HTML, CSS, and JavaScript.

Tasky is designed to keep task management simple: type a task name, add it to the list, delete a task by typing its exact name, or clear the full list in one click. The project uses no frameworks, no build tools, and no dependencies, which makes it easy to understand, extend, and deploy.

## Overview

This project is a small front-end application focused on core DOM manipulation and user interaction. It demonstrates how to:

- capture user input
- create and remove DOM elements dynamically
- wire interface controls to JavaScript functions
- keep styling organized with clean, component-like CSS
- log application state to the browser console for visibility during development

## Features

- Add tasks from the input field
- Delete a task by entering its name and clicking **Delete Task**
- Clear all tasks with one action
- Responsive layout that works on desktop and mobile widths
- Console logging of the current task list for debugging and learning purposes
- Zero dependencies and no setup required

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```text
Tasky/
├── index.html   # App structure and UI elements
├── style.css    # Layout, colors, spacing, and component styling
├── script.js    # App logic and DOM interactions
└── README.md    # Project documentation
```

## How It Works

### Add a task

1. Type a task name into the input field.
2. Click **Add Task** or press **Enter**.
3. The app creates a new list item and displays it in the task list.

### Delete a task

1. Type the exact task name into the input field.
2. Click **Delete Task**.
3. The app searches the current list and removes the first exact match.

### Clear all tasks

1. Click **Clear All**.
2. Every task is removed from the list immediately.

## Running the Project

No installation is required.

### Option 1: Open directly in the browser

Open `index.html` in any modern browser.

### Option 2: Use VS Code Live Server

If you use the Live Server extension in VS Code, start the page from the project folder for a smoother local development workflow.

## How To Use This Project

Once the page is open in your browser, you can manage tasks from the single input box and the three buttons at the top of the app.

### Add a new task

1. Click the input field that says `Enter a task`.
2. Type the name of the task you want to track.
3. Click **Add Task** or press **Enter**.
4. Your task will appear in the list below.

### Delete an existing task

1. Type the task name into the same input field.
2. Click **Delete Task**.
3. If the name matches an existing task, the first matching task is removed.

Note: task deletion matches the full task name, but it ignores uppercase and lowercase differences. For example, `Homework` and `homework` are treated as the same task when deleting.

### Clear the full list

1. Click **Clear All**.
2. Every task is removed from the page immediately.

### What to expect while using it

- Empty input will show an alert instead of adding or deleting a task.
- Tasks are only stored in the current browser session.
- Refreshing the page clears the list because this version does not use local storage yet.
- The browser console shows the current task list after each change, which is useful for learning and debugging.

## Core Logic Summary

The JavaScript file is organized around a few small functions:

- `addTask()` validates the input, creates a new task element, and appends it to the list
- `deleteTask()` searches for a task with matching text and removes the first match
- `clearAllTasks()` empties the entire task list
- `logTasksToConsole()` prints the current task state to the browser console

This keeps the app easy to read and makes each behavior straightforward to modify.

## UI Notes

The interface uses a warm, minimal card layout with:

- a centered container
- flexible button wrapping for smaller screens
- clear action colors for add, delete, and clear actions
- simple task cards for readable output

## Current Limitations

This version is intentionally simple. Right now it does not:

- save tasks after a page refresh
- support partial-name deletion
- prevent duplicate task names
- allow editing completed or existing tasks
- show inline success or error messages in the page itself

## Recommended Next Improvements

Here are the most useful upgrades if you want to take the project further:

1. Add local storage so tasks persist after refresh.
2. Allow partial or fuzzy search when deleting tasks.
3. Add edit and complete task actions.
4. Show user feedback in the UI instead of only using alerts.
5. Add task categories, due dates, or priority labels.
6. Improve keyboard behavior so Enter can support both add and delete modes.

## Why This Project Is Useful

Tasky is a strong beginner-to-intermediate practice project because it covers the fundamentals of front-end development without hiding anything behind a framework. It is especially useful for learning:

- DOM selection and manipulation
- event handling
- form interaction patterns
- dynamic rendering with JavaScript
- basic UI structure and styling

## Authoring Notes

The codebase is intentionally small and readable, which makes it a good portfolio starter project or classroom exercise. The comments inside the source files explain the role of each section so the project can also serve as a reference while learning.

## License

This project is currently unlicensed. If you plan to publish it publicly, add a license such as MIT.
