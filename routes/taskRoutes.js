//DEPENDANCIES 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({ mergeParams: true });
const taskItemRouter = express.Router();
const verifyToken = require('../utils/auth-middleware');
const Project = require('../models/Projects');
const Task = require('../models/Tasks');

router.use(verifyToken);
taskItemRouter.use(verifyToken);
//DEPENDANCIES 

//I.N.D.U.C.E.S

router.get('/', async(req,res) =>{
    try {
        const { projectId } = req.params;
        const userId = req.user?._id || req.user?.id;
        if (!userId || !projectId) {
            return res.status(401).send("Unable to fetch tasks. Invalid user identity. Please log in and try again.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Unable to fetch tasks. Please try again later.");
    }
});
//Index - Get all tasks for a specific project. This also requires an ownership check on the parent project.

// All routes in this file must be nested inside its parent Projects.
    //: /api/projects/:projectId/tasks OR /api/projects/:projectId/tasks/:taskId depending on if a route needs to access a specific task within a specific project. 


//New - Generate a form for the creation of a new task.  

//Delete - Delete a single task. This requires the same complex authorization check as the update route.
taskItemRouter.delete('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user?._id || req.user?.id;

    if (!mongoose.isValidObjectId(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID.' });
    }
    if (!userId) {
        return res.status(401).json({ message: 'User identity missing from token.' });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        if (project.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not own this project.' });
        }

        await task.deleteOne();
        return res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Unable to delete task.' });
    }
});

// Request example:
// PUT http://localhost:<PORT>/api/projects/<projectId>/tasks/<taskId>
// Headers: Authorization: Bearer <JWT>, Content-Type: application/json
// JSON body: { "title": "Updated title", "description": "Updated details", "status": "in progress" }
// Allowed status values: "not done", "in progress", "complete".
// The route requires a valid JWT and only updates title, description, and status.

router.put('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user?._id || req.user?.id;

    if (!mongoose.isValidObjectId(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID.' });
    }
    if (!userId) {
        return res.status(401).json({ message: 'User identity missing from token.' });
    }

    try {
        // Load the task and its parent project before checking project ownership.
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        if (project.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not own this project.' });
        }

        // Copy only editable fields; clients cannot change task ownership or its project.
        const updates = req.body || {};
        for (const field of ['title', 'description', 'status']) {
            if (Object.hasOwn(updates, field)) {
                task[field] = updates[field];
            }
        }

        const updatedTask = await task.save();
        // Success returns HTTP 200 with the updated task as JSON.
        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        return res.status(statusCode).json({ message: 'Unable to update task.' });
    }
});

//Create - Create a new task for a specific project. Before creating the task, you must verify that the logged-in user owns the project specified by :projectId.
router.post('/', async(req,res)=>{
    try{
        const {projectId} = req.params;
        const {title, description, project, status, } = req.body;
        const userId = req.user?._id || req.user?.id;
        
        if (!userId) {
            return res.status(401).send("Unable to create task. Invalid user identity. Please log in and try again.");
        }
        const existingProject = await Project.findById(projectId);
        if (!existingProject || existingProject.user.toString() !== userId) {
            return res.status(404).send("Unable to create task. Project not found or unauthorized.");
        }
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).send("Unable to create task. Please try again later.");
    }
     
});
//Edit -

//Show -

router.taskItemRouter = taskItemRouter;
module.exports = router;