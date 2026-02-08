const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');
 
document.addEventListener('DOMContentLoaded', loadTaskList);


function addTask() {
	const taskText = taskInput.value.trim();
	if (taskText === "") return;
 
    createTaskListElement(taskText, false);
	saveTaskList();
 
	taskInput.value = "";
	taskInput.focus();
}


function createTaskListElement(taskText, isCompleted) {
	const label = document.createElement('label');
	label.className = 'task-list-item';
 
	label.innerHTML = `
    	<input type="checkbox" ${isCompleted ? 'checked' : ''}>
    	<span class="task-checkmark"></span>
        <span class="task-text">${taskText}</span>
    	<button class="task-delete-btn">✖</button>
	`;


	const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList(); 
    });

    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', () => {
        label.remove();
        saveTaskList(); 
	});
 
    taskList.appendChild(label);
}

function saveTaskList() {
	const myTaskList = [];
    document.querySelectorAll('.task-list-item').forEach(item => {
        myTaskList.push({
        	text: item.querySelector('.task-text').innerText,
        	completed: item.querySelector('input').checked
    	});
	});
	// Перетворюємо масив об'єктів у рядок JSON
	localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}

function loadTaskList() {
	const staticTaskList = document.querySelectorAll('.task-list-item');
    staticTaskList.forEach(item => {
    	item.remove();
	});
 
	// Додаємр у список завдань всі завдання з LocalStorage
    const savedTaskList = localStorage.getItem('myTaskList');
	if (savedTaskList) {
    	const myTaskList = JSON.parse(savedTaskList);
        myTaskList.forEach(myTaskList => {
            createTaskListElement(myTaskList.text, myTaskList.completed);
    	});
	}
}


function attachTaskListEvents(label) {
	const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', () => {
        label.remove();
        saveTaskList();
	});
	const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList();
	});
}

taskAddBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
    	addTask();
	}
});
 

