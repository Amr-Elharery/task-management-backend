const { Router } = require('express');

const UserController = require('./user.controller');
const { authenticate } = require('../auth/auth.middleware');

const router = Router();
const userController = new UserController();

router.get('/me', authenticate, userController.getCurrentUser);

module.exports = router;
