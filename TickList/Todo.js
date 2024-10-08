let tasks = [];
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const taskProgressBar = document.getElementById('task-progress-bar');
const taskProgressText = document.getElementById('task-progress');
const inspirationQuote = document.getElementById('inspiration-quote');
let h1 = document.getElementById("head");
let p = document.getElementById("p")

const quotes = [
    "Keep going, you're doing great!",
    "Every small step matters!",
    "Believe in yourself and all that you are!",
    "Success is the sum of small efforts!"
];

window.onload = function() {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        updateTaskList();
        updateProgress();
    }
};

document.getElementById('add-task').addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value;
    const taskCategory = document.getElementById('task-category').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDeadline = document.getElementById('task-deadline').value;

    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }

    const task = {
        name: taskName,
        category: taskCategory,
        priority: taskPriority,
        deadline: taskDeadline,
        completed: false,
        subtasks: [] // Subtasks array
    };

    tasks.push(task);
    updateTaskList();
    updateProgress();
    saveToLocalStorage();
});

function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.category.toLowerCase());

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
      <span>${task.name} - <strong>${task.priority} Priority</strong></span>
      <div>
        <button class="complete" onclick="completeTask(${index})">Complete</button>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
        <button class="add-subtask" onclick="addSubtask(${index})">Add Subtask</button>
      </div>
    `;

        // Display subtasks, if any
        if (task.subtasks.length > 0) {
            const subtaskContainer = document.createElement('div');
            subtaskContainer.classList.add('subtask-container');

            const subtaskList = document.createElement('ul');
            task.subtasks.forEach((subtask) => {
                const subLi = document.createElement('li');
                subLi.innerHTML = `<span>${subtask}</span>`;
                subtaskList.appendChild(subLi);
            });
            subtaskContainer.appendChild(subtaskList);
            li.appendChild(subtaskContainer);
        }

        taskList.appendChild(li);
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    updateTaskList();
    updateProgress();
    saveToLocalStorage();
    displayQuote();
}

function editTask(index) {
    const newTaskName = prompt("Edit task name:", tasks[index].name);
    if (newTaskName) {
        tasks[index].name = newTaskName;
        updateTaskList();
        saveToLocalStorage();
    }
}

function addSubtask(index) {
    const subtaskName = prompt("Enter subtask name:");
    if (subtaskName) {
        tasks[index].subtasks.push(subtaskName);
        updateTaskList();
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
    taskProgressBar.value = progress;
    taskProgressText.innerText = `${progress}%`;
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

    taskProgressBar.value = progress;
    taskProgressText.innerText = `${progress}%`;

    if (tasks.length === 0) {
        taskProgressBar.value = 0;
        taskProgressText.innerText = "0%";
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    updateProgress(); 
    saveToLocalStorage();
}

function displayQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    inspirationQuote.innerText = quotes[randomIndex];
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});
