const UserService = require('./user.service');
const userService = new UserService();

module.exports = class UserController {
  async getCurrentUser(req, res, next) {
    try {
      const id = req.user.id;
      const user = await userService.getUserById(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
};
