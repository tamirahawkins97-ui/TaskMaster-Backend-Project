// Explicitly Destructure Allowed Fields in the Controller
//DEPENDANCIES 
const Project = require('../models/Projects');

// 1. CREATE A PROJECT
const createProject = async (req,res) => {
  try {
    const { name, description } = req.body || {};
    const userId = req.user?._id || req.user?.id;

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Project name is required.' });
    }
    if (typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ message: 'Project description is required.' });
    }
    if (!userId) {
      return res.status(401).json({ message: 'User identity missing from token.' });
    }

        const project = await Project.create({
      name: name.trim(),
            user: userId,
      description: description.trim()
        });

    return res.status(201).json({ project });
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    return res.status(statusCode).json({ message: 'Error creating project.', error: error.message });
    }

    // 2. GET ALL PROJECTS (Scoped strictly to logged-in user)
    const getProjects = async (req,res) => {
        try {
            const userId = req.user?._id || user?.id;
            // Only return projects where the 'user' matches the requester

            const projects = await Project.find({ user: userId });

             return res.status(200).json({projects});
        } catch(error){
            res.status(500).json({message: 'Error fetching all projects.', error: error.message});
        }
    }
};

// 2. GET ALL PROJECTS (Scoped strictly to logged-in user)
const getProjects = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    // Only return projects where the 'user' matches the requester
    const projects = await Project.find({ user: userId });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// 3. GET SINGLE PROJECT BY ID (With ownership check)
const getProjectById = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const project = await Project.findOne({ _id: req.params.id, user: userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// 4. UPDATE A PROJECT
const updateProject = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    // findOneAndUpdate with user check ensures they own it before updating
    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// 5. DELETE A PROJECT
const deleteProject = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const deletedProject = await Project.findOneAndDelete({
      _id: req.params.id,
      user: userId
    });

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};

