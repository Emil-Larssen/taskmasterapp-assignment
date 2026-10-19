const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname,'data','tasks.json');

async function saveTask(task) {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const tasks = JSON.parse(fileContent);
    tasks.push(task);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2))
}

async function getAllTasks() {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

async function deleteTask(id) {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const tasks = JSON.parse(fileContent);
    const updatedTasks = tasks.filter(task => task.id !== id);
    await fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2));
}

module.exports = { saveTask, getAllTasks, deleteTask };
