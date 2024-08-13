const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompleted');

// Load tasks from localStorage on page load
window.addEventListener('load', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTaskToDOM(task.text, task.completed);
    });
});

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value;
        if (taskText !== '') {
            addTaskToDOM(taskText, false);
            saveTasks();
            taskInput.value = ''; // Clear the input field
        }
    }
});

// Function to add a task to the DOM
function addTaskToDOM(taskText, completed) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-text';
    if (completed) {
        span.style.textDecoration = 'line-through';
        span.style.color = '#888';
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit your task:', span.textContent);
        if (newTaskText !== null) {
            span.textContent = newTaskText;
            saveTasks();
        }
    });

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);
        saveTasks();
    });

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#888';
        } else {
            span.style.textDecoration = 'none';
            span.style.color = '#000';
        }
        saveTasks();
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(function(taskItem) {
        const checkbox = taskItem.querySelector('.task-checkbox');
        const span = taskItem.querySelector('.task-text');
        tasks.push({
            text: span.textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear completed tasks
clearCompletedButton.addEventListener('click', function() {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(function(task) {
        const checkbox = task.querySelector('.task-checkbox');
        if (checkbox.checked) {
            taskList.removeChild(task);
        }
    });
    saveTasks(); // Save after clearing completed tasks
});
