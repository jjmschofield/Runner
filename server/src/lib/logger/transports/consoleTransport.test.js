const winston = require('winston');
const underTest = require('./consoleTransport');

describe('src/lib/logger/transports/consoleTransport.js', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createConsoleTransport', () => {
    it('should return a console transport', () => {
      const expectedLogLevel = 'silly';
      const result = underTest.createConsoleTransport(expectedLogLevel);

      expect(result.constructor).toEqual(winston.transports.Console);
      expect(result.options.level).toEqual(expectedLogLevel);
      expect(result.options.colorize).toEqual(true);
    });
  });
});
