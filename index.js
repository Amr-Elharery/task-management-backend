const express = require('express');
const config = require('./src/config/config');
const Logger = require('./src/shared/logger');

const app = express();
const port = config.port;
const isDev = config.isDev;

app.get('/', (_, res) => {
  res.json({
    message: 'Welcome to the Task Management API',
    Development: isDev,
  });
});

app.listen(port, () => {
  Logger.log(`Server is running on http://localhost:${port}`);
});
