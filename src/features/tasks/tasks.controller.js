const TasksService = require('./tasks.service');
const taskService = new TasksService();

module.exports = class TasksController {
  async addTask(req, res, next) {
    try {
      const { title, description } = req.body;
      const userId = req.user.id;
      const newTask = {
        user: userId,
        title,
        description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
      };

      const task = await taskService.createTask(newTask);

      res.status(201).json({
        message: 'Task added successfully.',
        task: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const userId = req.user.id;
      const params = req.query;
      const tasks = await taskService.getAllTasks(userId, params);
      res.status(200).json({
        message: 'Tasks retrieved successfully.',
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId, userId);

      if (!task) {
        return next(new AppError('Task not found.', 404));
      }

      res.status(200).json({
        message: 'Task retrieved successfully.',
        task: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const taskData = req.body;
      const updatedTask = await taskService.updateTask(
        taskId,
        taskData,
        userId,
      );

      if (!updatedTask) {
        return next(new AppError('Task not found.', 404));
      }

      res.status(200).json({
        message: 'Task updated successfully.',
        task: updatedTask,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const deletedTask = await taskService.deleteTask(taskId, userId);

      if (!deletedTask) {
        return next(new AppError('Task not found.', 404));
      }

      res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};
