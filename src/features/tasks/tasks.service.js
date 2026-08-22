const AppError = require('../../shared/utils/app.error');
const Task = require('./task.model');

module.exports = class TaskService {
  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }
  async getAllTasks(userId, params) {
    const { page = 1, limit = 10, status, priority, search } = params;

    const query = {
      user: userId,
    };

    // Filters
    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: 'i',
      };
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const skip = (pageNumber - 1) * limitNumber;

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNumber),

      Task.countDocuments(query),
    ]);

    return {
      tasks,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
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
