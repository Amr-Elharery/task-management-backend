const AppError = require('../../shared/utils/app.error');

module.exports = {
  validateRegisterInput(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new AppError('Name, email, and password are required.', 400));
    }
    next();
  },
  validateLoginInput(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Email and password are required.', 400));
    }
    next();
  },
};
