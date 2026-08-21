const { Router } = require('express');
const TasksController = require('./tasks.controller');
const { authenticate } = require('../auth/auth.middleware');
const {
  validateCreateTask,
  validateQueryParams,
  validateUpdateTask,
} = require('./tasks.validation');

const router = Router();
const taskController = new TasksController();

router.post('/', authenticate, validateCreateTask, taskController.addTask);
router.get('/', authenticate, validateQueryParams, taskController.getTasks);
router.get('/search', authenticate, taskController.searchTasksByTitle);
router.get('/:id', authenticate, taskController.getTaskById);
router.put('/:id', authenticate, validateUpdateTask, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;
