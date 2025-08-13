const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Your Next.js app root
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // optional
};

module.exports = createJestConfig(customJestConfig);
