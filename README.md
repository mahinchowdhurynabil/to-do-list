📝 To-Do List App

A simple and practical To-Do List application built using **HTML, CSS, and JavaScript**.
This project was created to practice DOM manipulation, local storage handling, filtering logic, and UI state management.

## 🚀 Features

* Add new tasks with date and time
* Mark tasks as completed
* Delete tasks
* Filter tasks (All / Active / Completed)
* Set priority levels (High, Medium, Normal)
* Persistent storage using LocalStorage
* 🌙 Dark Mode toggle

## 💡 Dark Mode

The application supports a light and dark theme using CSS variables.
When dark mode is enabled, the app updates the root color variables dynamically without reloading the page.

## 🛠 Technologies Used

* HTML5
* CSS3 (Flexbox, CSS Variables)
* Vanilla JavaScript (ES6)
* LocalStorage API
* Font Awesome Icons

## 📂 How It Works

Tasks are stored as objects inside an array and saved in the browser’s LocalStorage.
Every time a task is added, deleted, or completed, the UI re-renders dynamically to reflect the updated state.

Each task object contains:

* Unique ID
* Task title
* Time and date
* Completion status
* Priority level

## 🎯 Learning Goals

This project helped practice:

* DOM creation and manipulation
* Event handling
* Array methods like `filter()`
* State-based rendering
* Theme switching using CSS variables

## 🔮 Future Improvements

* Add task editing
* Add drag-and-drop reordering
* Improve validation
* Modularize JavaScript code
* Add animations

Built as part of a structured front-end learning journey.
