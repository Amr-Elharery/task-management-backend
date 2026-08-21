const User = require('./user.model');
const AppError = require('../../shared/utils/app.error');

module.exports = class UserService {
  async checkExistingUser(email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email is already in use.');
    }
  }
  async getUserByEmail(email) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }

  async createUser(name, email, password) {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return newUser;
  }

  async getUserById(id) {
    const user = await User.findById(id).select({ name: 1, email: 1, _id: 0 });
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    return user;
  }
};
