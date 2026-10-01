const express = require('express');
const router = express.Router({ mergeParams: true });
const taskItemRouter = express.Router();
const verifyToken = require('../utils/auth-middleware');
const {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskControllers');

router.use(verifyToken);
taskItemRouter.use(verifyToken);

router.get('/', getTasksByProject);
router.post('/', createTask);
taskItemRouter.put('/:taskId', updateTask);
taskItemRouter.delete('/:taskId', deleteTask);

router.taskItemRouter = taskItemRouter;
module.exports = router;