// Explicitly Destructure Allowed Fields in the Controller
const Task = require('../models/Tasks');
const Project = require('../models/Project'); // Needed to verify ownership

const createTask = async (req, res) => {
  try {
    // 1. Destructure only user-supplied content from req.body
    const { title, description, project, status } = req.body;

    // 2. Extract trusted user ID from token
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User identity missing from token' });
    }

    // 3. Verify the project exists AND belongs to the requesting user
    const existingProject = await Project.findOne({ _id: project, user: userId });
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    // 4. Create task with verified relations
    const newTask = await Task.create({
      title,
      description,
      status, // Optional: schema default ('not done') applies if omitted
      project,
      user: userId
    });

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

module.exports = { createTask };