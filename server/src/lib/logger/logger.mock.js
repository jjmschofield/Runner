const LOG_EVENTS = require('./definitions/LOG_EVENTS');

module.exports = {
  createMockLogger: () => {
    const mockLogger = {
      log: {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        verbose: jest.fn(),
        debug: jest.fn(),
        silly: jest.fn(),
      },
      LOG_EVENTS,
    };

    jest.mock('./logger', () => {
      return mockLogger;
    });

    return mockLogger;
  },
};
