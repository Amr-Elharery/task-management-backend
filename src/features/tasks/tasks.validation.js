const AppError = require('../../shared/utils/app.error');
const { STATUSES, PRIORITIES } = require('./tasks.enums');
const {
  formatTitle,
  formatDescription,
  validateStatus,
  validatePriority,
  validateDueDate,
} = require('./tasks.helper');

module.exports = {
  validateCreateTask(req, res, next) {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !description || !status || !priority || !dueDate) {
      return next(new AppError('All fields are required.', 400));
    }

    try {
      req.body.title = formateTitle(title);
      req.body.description = formateDescription(description);

      validateStatus(status);
      validatePriority(priority);
      validateDueDate(dueDate);

      next();
    } catch (error) {
      next(error);
    }
  },

  validateQueryParams(req, res, next) {
    const { status, priority } = req.query;

    try {
      validateStatus(status);
      validatePriority(priority);

      next();
    } catch (error) {
      next(error);
    }
  },

  validateUpdateTask(req, res, next) {
    const { title, description, status, priority, dueDate } = req.body;

    try {
      if (title) req.body.title = formatTitle(title);
      if (description) req.body.description = formatDescription(description);
      if (status) validateStatus(status);
      if (priority) validatePriority(priority);
      if (dueDate) validateDueDate(dueDate);

      next();
    } catch (error) {
      next(error);
    }
  },
};
