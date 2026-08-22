const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRounds } = require('../../config/config');
const UserService = require('../user/user.service');
const AppError = require('../../shared/utils/app.error');
const { jwtSecret, jwtExpiresIn } = require('../../config/config');

const userService = new UserService();

module.exports = class AuthService {
  async register(name, email, password) {
    await userService.checkExistingUser(email);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userService.createUser(name, email, hashedPassword);
    return user;
  }

  async login(email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    return { user, token };
  }
};
