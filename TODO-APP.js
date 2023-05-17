const readline = require('readline');

// Task constructor
function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

// TodoList object
function TodoList() {
  this.tasks = [];

  // Add a new task
  this.addTask = function (description, dueDate, priority) {
    const task = new Task(description, dueDate, priority);
    this.tasks.push(task);
    console.log('Task added successfully.');
  };

  // List all tasks
  this.listAllTasks = function () {
    if (this.tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      console.log('All tasks:');
      this.tasks.forEach((task, index) => {
        console.log(`${index + 1}) ${task.description} - Due: ${task.dueDate} - Priority: ${task.priority} - Completed: ${task.completed}`);
      });
    }
  };

  // List completed tasks
  this.listCompletedTasks = function () {
    const completedTasks = this.tasks.filter((task) => task.completed);
    if (completedTasks.length === 0) {
      console.log('No completed tasks found.');
    } else {
      console.log('Completed tasks:');
      completedTasks.forEach((task, index) => {
        console.log(`${index + 1}) ${task.description} - Due: ${task.dueDate} - Priority: ${task.priority}`);
      });
    }
  };

  // Mark task as completed
  this.markTaskAsDone = function (index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true;
      console.log('Task marked as done.');
    } else {
      console.log('Invalid task index.');
    }
  };

  // Delete a task
  this.deleteTask = function (index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      console.log('Task deleted successfully.');
    } else {
      console.log('Invalid task index.');
    }
  };

  // Sort tasks by due date
  this.sortTasksByDueDate = function () {
    this.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    console.log('Tasks sorted by due date.');
  };

  // Sort tasks by priority
  this.sortTasksByPriority = function () {
    this.tasks.sort((a, b) => a.priority - b.priority);
    console.log('Tasks sorted by priority.');
  };

  // Clear all tasks
  this.clearAllTasks = function () {
    this.tasks = [];
    console.log('All tasks cleared.');
  };
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initialize todo list
const todoList = new TodoList();

// Print available actions
function printActions() {
  console.log('***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark a task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('***************************');
  console.log('What\'s your choice?');
}

// Handle user input
function handleUserInput(choice) {
  switch (choice) {
    case "1":
      rl.question("Enter task description: ", (description) => {
        rl.question("Enter task due date: ", (dueDate) => {
          rl.question("Enter task priority: ", (priority) => {
            todoList.addTask(description, dueDate, priority);
            printActions();
          });
        });
      });
      break;
    case "2":
      todoList.listAllTasks();
      printActions();
      break;
    case "3":
      todoList.listCompletedTasks();
      printActions();
      break;
    case "4":
      rl.question("Enter the index of the task to mark as done: ", (index) => {
        todoList.markTaskAsDone(index - 1);
        printActions();
      });
      break;
    case "5":
      rl.question("Enter the index of the task to delete: ", (index) => {
        todoList.deleteTask(index - 1);
        printActions();
      });
      break;
    case "6":
      todoList.sortTasksByDueDate();
      printActions();
      break;
    case "7":
      todoList.sortTasksByPriority();
      printActions();
      break;
    case "8":
      todoList.clearAllTasks();
      printActions();
      break;
    default:
      console.log("Invalid choice. Please try again.");
      printActions();
      break;
  }
}

// Start the application
printActions();
rl.on('line', (choice) => {
  handleUserInput(choice.trim());
});
