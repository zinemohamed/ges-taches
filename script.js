class Task {
    constructor(id, title, description, completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getTasks() {
        return this.tasks;
    }
}

const taskManager = new TaskManager();

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const id = Date.now().toString();

    const task = new Task(id, title, description);
    taskManager.addTask(task);

    displayTasks();
    this.reset();
});

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    taskManager.getTasks().forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title}: ${task.description}</span>
            <div>
                <button class="complete" onclick="toggleCompletion('${task.id}')">✓</button>
                <button class="delete" onclick="deleteTask('${task.id}')">✗</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(taskId) {
    taskManager.deleteTask(taskId);
    displayTasks();
}

function toggleCompletion(taskId) {
    taskManager.toggleTaskCompletion(taskId);
    displayTasks();
}

document.addEventListener('DOMContentLoaded', displayTasks);
