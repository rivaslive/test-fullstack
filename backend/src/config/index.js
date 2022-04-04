const isProd = process.env.NODE_ENV === 'production';

const saltRounds = process.env.APP_SALT_ROUNDS || 10;

const config = {
  isProd: isProd,
  saltRounds,
  port: process.env.APP_PORT || 8080,
  database: {
    uri: process.env.APP_DATABASE_URL,
    options: {
      logging: process.env.APP_DATABASE_LOGGING === 'true'
    },
  },
  users: {
    admin: {
      firstName: 'Admin',
      lastName: 'Librarian',
      email: 'admin@example.com',
      password: 'admin',
      role: 'librarian',
    },
    student: {
      firstName: 'Student',
      lastName: 'User',
      email: 'student@example.com',
    },
  },
};

export default config;
