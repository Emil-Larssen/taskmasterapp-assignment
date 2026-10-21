async function loadTasks() {
    const response = await fetch('/api/tasks');

    if (response.ok) {
        const tasks = await response.json();
        renderTasks(tasks);
        }
}
function renderTasks(tasks) {
    const list = document.getElementById('task-list');
    list.replaceChildren();
    for (let i = 0; i < tasks.length; i++) {
        const listItem = document.createElement('li');
        listItem.dataset.id = tasks[i].id;
        listItem.textContent = 'Task Description: ' + tasks[i].text;
        listItem.appendChild(document.createElement('br'));
        listItem.append('Completed? ' + tasks[i].completed);
        list.appendChild(listItem);
        listItem.appendChild(document.createElement('br'));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.addEventListener('click', () => {
            deleteTask(listItem.dataset.id);
        });
        listItem.appendChild(deleteButton);

        const completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.checked = tasks[i].completed;
        const label = document.createElement('label');
        label.textContent = 'Completed: ';
        label.appendChild(completedCheckbox);
        listItem.appendChild(label);
        completedCheckbox.addEventListener('change', () => {
            updateTaskStatus(tasks[i].id, completedCheckbox.checked);
        })
        listItem.appendChild(completedCheckbox);
        list.appendChild(document.createElement('br'));

    }
}
async function deleteTask(id) {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    if(response.ok)
        await loadTasks();
}

const form = document.getElementById('task-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = form.elements['task'].value;
    addTask(text);
})

async function addTask(text) {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text}),
    });
    if(response.ok)
        await loadTasks();
}

async function updateTaskStatus(id, completed) {
    const response = await fetch(`/api/tasks/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed})
    });
    if(response.ok)
        await loadTasks();
}

loadTasks();