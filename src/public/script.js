async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    renderTasks(tasks);
}
function renderTasks(tasks) {
    const list = document.getElementById('task-list');
    list.replaceChildren();
    for (let i = 0; i < tasks.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = tasks[i].text;
        listItem.dataset.id = tasks[i].id;
        list.appendChild(listItem);
        const button = document.createElement('button');
        button.textContent = 'DELETE';
        button.addEventListener('click', () => {
            deleteTask(listItem.dataset.id);
        });
        listItem.appendChild(button);
    }
}
async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    loadTasks();
}

const form = document.getElementById('task-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = form.elements['task'].value;
    addTask(text);
})

async function addTask(text) {
    await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text}),
    });
    loadTasks();
}

loadTasks();