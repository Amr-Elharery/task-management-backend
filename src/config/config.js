module.exports = {
  serverUrl: process.env.SERVER_URL,
  port: process.env.PORT || 8000,
  isDev: process.env.IS_DEV === 'true',
  dbUrl: process.env.DB_URL,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
