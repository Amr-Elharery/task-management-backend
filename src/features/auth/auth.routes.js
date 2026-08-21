const { Router } = require('express');
const AuthController = require('./auth.controller');
const { authenticate } = require('./auth.middleware');
const {
  validateLoginInput,
  validateRegisterInput,
} = require('./auth.validation');

const router = Router();
const authController = new AuthController();

router.post('/register', validateRegisterInput, authController.register);
router.post('/login', validateLoginInput, authController.login);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
