const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

//  new task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.create({
        title,
        description,
        dueDate,
        priority,
    });

    if (task) {
        res.status(201).json(task);
    } else {
        res.status(400);
        throw new Error('Invalid task data');
    }
});

// all tasks
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

//  single task
const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        res.json(task);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.priority = req.body.priority || task.priority;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
