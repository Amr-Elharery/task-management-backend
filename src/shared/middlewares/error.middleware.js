const Logger = require('../logger');

module.exports = (err, req, res, next) => {
  Logger.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};
