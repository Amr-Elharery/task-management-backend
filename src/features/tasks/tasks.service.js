const AppError = require('../../shared/utils/app.error');
const Task = require('./task.model');

module.exports = class TaskService {
  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  async getAllTasks(userId, params) {
    const query = { user: userId };

    // Apply filters based on query parameters
    if (params.status) {
      query.status = params.status;
    }
    if (params.priority) {
      query.priority = params.priority;
    }
    console.log('Query parameters:', query);

    return await Task.find(query);
  }

  async searchTasksByTitle(userId, title) {
    const query = {
      user: userId,
      title: { $regex: title, $options: 'i' }, // Case-insensitive search
    };
    return await Task.find(query);
  }

  async getTaskById(taskId, userId) {
    const task = await Task.findById(taskId);
    if (task.user.toString() !== userId) {
      throw new AppError('Unauthorized access to the task.', 403);
    }
    return task;
  }

  async updateTask(taskId, taskData, userId) {
    const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    if (task.user.toString() !== userId) {
      throw new AppError('Unauthorized access to the task.', 403);
    }
    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findById(taskId);
    if (task.user.toString() !== userId) {
      throw new AppError('Unauthorized access to the task.', 403);
    }
    return await Task.findByIdAndDelete(taskId);
  }
};
