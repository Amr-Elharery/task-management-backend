const express = require('express');
const { port, isDev, dbUrl } = require('./src/config/config');
const Logger = require('./src/shared/utils/logger');
const errorMiddleware = require('./src/shared/middlewares/error.middleware');
const { connectToDatabase } = require('./src/db/connect');
// Import routes
const authRoutes = require('./src/features/auth/auth.routes');
const userRoutes = require('./src/features/user/user.routes');
const tasksRoutes = require('./src/features/tasks/tasks.routes');

const app = express();

connectToDatabase(dbUrl);

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', tasksRoutes);

app.get('/', (_, res) => {
  res.json({
    message: 'Welcome to the Task Management API',
    Development: isDev,
  });
});

// Error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.log(`Server is running on http://localhost:${port}`);
});
