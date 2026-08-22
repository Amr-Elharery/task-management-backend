const { isDev } = require('../../config/config');
const AuthService = require('./auth.service');
const authService = new AuthService();
const setCookiesOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 60 * 60 * 1000,
};
const clearCookiesOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 0,
};

module.exports = class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.register(name, email, password);
      user.password = undefined; // Remove password from the response
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.cookie('token', token, setCookiesOptions);
      res.status(200).json({ message: 'Login successful.', user, token });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('token', clearCookiesOptions);
      res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      next(error);
    }
  }
};
