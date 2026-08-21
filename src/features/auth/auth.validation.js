const AppError = require('../../shared/utils/app.error');
const { emailValidator } = require('./auth.helper');

module.exports = {
  validateRegisterInput(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new AppError('Name, email, and password are required.', 400));
    }
    if (!emailValidator(email)) {
      return next(new AppError('Invalid email format.', 400));
    }
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.password = password.trim();

    next();
  },
  validateLoginInput(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Email and password are required.', 400));
    }
    if (!emailValidator(email)) {
      return next(new AppError('Invalid email format.', 400));
    }
    req.body.email = email.trim().toLowerCase();
    req.body.password = password.trim();
    next();
  },
};
