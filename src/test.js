const { createTask } = require('./task');
const { saveTask, getAllTasks} = require('./taskRepository');

async function test() {
    const task1 = createTask("test task 1");
    console.log("Created task:", task1);
    await saveTask(task1);
    console.log("Task saved Successfully");
    const task2 = createTask("test task 2");
    console.log("Created task:", task2);
    await saveTask(task2);
    console.log("Task saved Successfully");

    const tasks = await getAllTasks();
    console.log("All tasks:", tasks);
}




test().catch(console.error);
