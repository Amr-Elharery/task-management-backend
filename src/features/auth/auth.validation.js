const AppError = require('../../shared/utils/app.error');
const { emailValidator, passwordValidator } = require('./auth.helper');

module.exports = {
  validateRegisterInput(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new AppError('Name, email, and password are required.', 400));
    }
    if (!emailValidator(email)) {
      return next(new AppError('Invalid email format.', 400));
    }
    if (!passwordValidator(password)) {
      return next(
        new AppError(
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
          400,
        ),
      );
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
