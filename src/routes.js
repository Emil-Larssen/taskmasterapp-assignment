const express = require('express');
const router = express.Router();
const { createTask } = require('./task');
module.exports = router;
const { saveTask, getAllTasks, deleteTask, updateTaskStatus } = require('./taskRepository');

router.get('/api/tasks', async (req, res) => {
    try{
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/api/tasks', async (req, res) => {
    try{
        if(typeof req.body?.text !== 'string')
            return res.status(400).json({message: 'A string must be supplied in the request body'})
        const task = createTask(req.body.text);
        await saveTask(task);
        res.sendStatus(201);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.delete('/api/tasks/:id', async (req, res) => {
    try{
        const deleted = await deleteTask(req.params.id);
        if(!deleted){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(204).end();
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

router.patch('/api/tasks/:id', async (req, res) => {
    try{
        await updateTaskStatus(req.params.id, req.body.completed);
        if(typeof req.body?.completed !== 'boolean')
            return res.status(400).json({message: 'completed must be a boolean'});
        res.status(200).end();
    } catch(error){
        res.status(500).json({message: error.message});
    }
})