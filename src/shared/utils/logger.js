const config = require('../../config/config');
const isDev = config.isDev;

class Logger {
  static log(message) {
    isDev && console.log(`[LOG] ${message}`);
  }

  static error(message) {
    isDev && console.error(`[ERROR] ${message}`);
  }

  static warn(message) {
    isDev && console.warn(`[WARN] ${message}`);
  }
}

module.exports = Logger;
