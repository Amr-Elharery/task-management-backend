const AppError = require('../../shared/utils/app.error');
const { STATUSES, PRIORITIES } = require('./tasks.enums');

module.exports = {
  validateStatus(status) {
    if (status && !STATUSES.includes(status)) {
      throw new AppError(
        `Invalid status. Allowed values: ${STATUSES.join(', ')}`,
        400,
      );
    }
  },

  validatePriority(priority) {
    if (priority && !PRIORITIES.includes(priority)) {
      throw new AppError(
        `Invalid priority. Allowed values: ${PRIORITIES.join(', ')}`,
        400,
      );
    }
  },

  validateDueDate(dueDate) {
    const parsedDueDate = new Date(dueDate);

    if (Number.isNaN(parsedDueDate.getTime())) {
      throw new AppError('Invalid due date.', 400);
    }

    if (parsedDueDate < new Date()) {
      throw new AppError('Due date cannot be in the past.', 400);
    }
  },

  formatTitle(title) {
    if (typeof title !== 'string') {
      throw new AppError('Title must be a string.', 400);
    }

    return title.trim();
  },

  formatDescription(description) {
    if (typeof description !== 'string') {
      throw new AppError('Description must be a string.', 400);
    }

    return description.trim();
  },
};
