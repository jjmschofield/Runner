const path = require('path');
const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  collectCoverage: true,
  coverageDirectory: path.resolve(__dirname, './test/coverage'),
  coverageReporters: ['text', 'json', 'html', 'lcov'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/*.test.js',
    '!**/*.mock.js',
    '!jest.config.js',
    '!jest.coverage.config.js',
  ],
};
