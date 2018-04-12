process.env.JEST_JUNIT_OUTPUT = 'test/reports/junit-results.xml';

module.exports = {
  verbose: true,
  testRegex: 'src(.*)\\.test.js',
  projects: ['dist'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/public/',
  ],
  testResultsProcessor: 'jest-junit',
};
