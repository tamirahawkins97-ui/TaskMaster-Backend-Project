const mongoose = require('mongoose');
const Task = require('../models/Tasks');
const Project = require('../models/Projects');

const getUserId = (req) => req.user?._id || req.user?.id;
const isValidId = (id) => mongoose.isValidObjectId(id);
const getErrorStatus = (error) =>
  error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500;

const getTasksByProject = async (req, res) => {
  const userId = getUserId(req);
  const { projectId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: 'User identity missing from token.' });
  }
  if (!isValidId(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID.' });
  }

  try {
    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const tasks = await Task.find({ project: project._id });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    return res.status(getErrorStatus(error)).json({ message: 'Unable to fetch tasks.' });
  }
};

const createTask = async (req, res) => {
  const userId = getUserId(req);
  const { projectId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: 'User identity missing from token.' });
  }
  if (!isValidId(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID.' });
  }

  try {
    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const { title, description, status } = req.body || {};
    const task = await Task.create({
      title,
      description,
      status,
      project: project._id,
      user: userId
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(getErrorStatus(error)).json({ message: 'Unable to create task.' });
  }
};

const updateTask = async (req, res) => {
  const userId = getUserId(req);
  const { taskId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: 'User identity missing from token.' });
  }
  if (!isValidId(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID.' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    const project = await Project.findOne({ _id: task.project, user: userId });
    if (!project) {
      return res.status(404).json({ message: 'Task not found or unauthorized.' });
    }

    const updates = req.body || {};
    for (const field of ['title', 'description', 'status']) {
      if (Object.hasOwn(updates, field)) {
        task[field] = updates[field];
      }
    }

    return res.status(200).json(await task.save());
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(getErrorStatus(error)).json({ message: 'Unable to update task.' });
  }
};

const deleteTask = async (req, res) => {
  const userId = getUserId(req);
  const { taskId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: 'User identity missing from token.' });
  }
  if (!isValidId(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID.' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    const project = await Project.findOne({ _id: task.project, user: userId });
    if (!project) {
      return res.status(404).json({ message: 'Task not found or unauthorized.' });
    }

    await task.deleteOne();
    return res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Unable to delete task.' });
  }
};

module.exports = { getTasksByProject, createTask, updateTask, deleteTask };