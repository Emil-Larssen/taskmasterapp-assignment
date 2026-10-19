const express = require('express');
const router = express.Router();
const { createTask } = require('./task');
module.exports = router;
const { saveTask, getAllTasks, deleteTask } = require('./taskRepository');

router.get('/api/tasks', async (req, res) => {
    try{
        const tasks = await getAllTasks();
        res.json(tasks).status(200);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/api/tasks', async (req, res) => {
    try{
        const task = createTask(req.body.text);
        await saveTask(task);
        res.sendStatus(201);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.delete('/api/tasks/:id', async (req, res) => {
    try{
        await deleteTask(req.params.id);
        res.status(204).end();
    } catch(error){
        res.status(500).json({message: error.message});
    }
})