const fs = require('node:fs/promises');
const path = require('node:path');
const filePath = path.join(__dirname,'data','tasks.json');
let writeQueue = Promise.resolve();

function enqueueWrite(operation) {
    const result = writeQueue.then(() => operation());
    writeQueue = result.catch(() => {});
    return result;
}

function saveTask(task) {
    return enqueueWrite(async () =>{
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tasks = JSON.parse(fileContent);
        tasks.push(task);
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2))
    });
}

async function getAllTasks() {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

function deleteTask(id) {
    return enqueueWrite(async () => {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tasks = JSON.parse(fileContent);
        if(!tasks.some(task => task.id === id))
            return false;
        const updatedTasks = tasks.filter(task => task.id !== id);
        await fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2))
        return true;
    });
}

function updateTaskStatus(id, completed) {
    return enqueueWrite(async () => {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tasks = JSON.parse(fileContent);
        const task = tasks.find(task => task.id === id);
        if(!task)
            return false;
        if(completed !== task.completed)
            task.completed = completed;
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
        return true;
    });
}

module.exports = { saveTask, getAllTasks, deleteTask, updateTaskStatus};
