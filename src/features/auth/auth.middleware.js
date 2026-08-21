const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/config');
const AppError = require('../../shared/utils/app.error');

module.exports = {
  authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      let token = null;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      } else if (req.cookies?.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return next(new AppError('Authentication token is required.', 401));
      }

      const decoded = jwt.verify(token, jwtSecret);

      req.user = decoded;

      next();
    } catch (error) {
      return next(new AppError('Invalid or expired token.', 401));
    }
  },
};
