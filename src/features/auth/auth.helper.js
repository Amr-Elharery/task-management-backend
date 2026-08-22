module.exports = {
  emailValidator(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  passwordValidator(password) {
    // Password must be at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&]).{8,}$/;
    return passwordRegex.test(password);
  },
};
