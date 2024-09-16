const addTaskBtn = document.querySelector('.app__button--add-task');
const addTaskForm = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const tasksContainer = document.querySelector('.app__section-task-list');
const inProgressTaskDescription = document.querySelector('.app__section-active-task-description');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;
let selectedTaskLi = null;

function updateTasks () {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `;

    const paragraph = document.createElement('p');
    paragraph.textContent = task.description;
    paragraph.classList.add('app__section-task-list-item-description');

    const button = document.createElement('button');
    button.classList.add('app_button-edit');
    const buttonImage = document.createElement('img');
    buttonImage.setAttribute('src', '/images/edit.png');
    button.append(buttonImage);

    button.onclick = () => {
        const newTaskDescription = prompt("Whats is your task's new description?");
        console.log(newTaskDescription.trim())
        if (newTaskDescription.trim() !== '') {
            paragraph.textContent = newTaskDescription;
            task.description = newTaskDescription;
            updateTasks();
        }
    }

    li.append(svg);
    li.append(paragraph);
    li.append(button);

    if (task.completed) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', true);
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(element => {
                    element.classList.remove('app__section-task-list-item-active')
                })
    
            if (selectedTask == task) {
                inProgressTaskDescription.textContent = '';
                selectedTask = null;
                selectedTaskLi = null;
                return;
            }
            selectedTask = task;
            selectedTaskLi = li;
            inProgressTaskDescription.textContent = task.description;
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

addTaskBtn.addEventListener('click', () => {
    addTaskForm.classList.toggle('hidden');
})

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = {
        description: textarea.value
    }
    tasks.push(task);
    const taskElement = createTaskElement(task);
    tasksContainer.append(taskElement);

    updateTasks();

    textarea.value = '';
    addTaskForm.classList.add('hidden');
})

tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    tasksContainer.append(taskElement);
});

document.addEventListener('CompletedFocus', () => {
    if (selectedTask && selectedTaskLi) {
        selectedTaskLi.classList.remove('app__section-task-list-item-active');
        selectedTaskLi.classList.add('app__section-task-list-item-complete');
        selectedTaskLi.querySelector('button').setAttribute('disabled', true);
        selectedTask.completed = true;
        updateTasks();
    }
});