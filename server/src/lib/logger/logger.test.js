/* eslint-disable max-len,global-require */
const winstonSpy = require('winston-spy');
const { createConsoleTransportMock } = require('./transports/consoleTransport.mock');
const { createMockTransportHelpers } = require('./utils/transportUtils.mock');

describe('src/lib/logger/logger.js', () => {
  const expectedLogLevel = 'silly';
  const mockLog = jest.fn();
  const mockTransportHelpers = createMockTransportHelpers();
  const mockConsoleTransport = createConsoleTransportMock();

  process.env.logLevel = expectedLogLevel;

  const underTest = require('./logger');

  beforeAll(() => {
    underTest.logger.add(winstonSpy, {
      spy: mockLog,
      level: 'silly',
    });
  });


  afterAll(() => {
    delete process.env.logLevel;
  });

  describe('logger', () => {
    it('should add a console transport', () => {
      expect(mockTransportHelpers.addTransportSync)
        .toHaveBeenCalledWith(underTest.logger, mockConsoleTransport.createConsoleTransport, expectedLogLevel);
    });
  });

  describe('log', () => {
    let expectedLogEvent;
    let expectedMessageMatcher;
    let expectedMeta;

    afterEach(() => {
      jest.resetAllMocks();
    });

    beforeEach(() => {
      expectedLogEvent = underTest.LOG_EVENTS.ERROR.UNEXPECTED_ERROR;
      expectedMessageMatcher = expect.stringContaining(expectedLogEvent.id)
        && expect.stringContaining(expectedLogEvent.msg)
        && expect.stringContaining(expectedLogEvent.description);

      expectedMeta = {
        someProp: 'some value',
      };
    });

    describe('error', () => {
      it('should log an error', () => {
        underTest.log.error(expectedLogEvent, expectedMeta);
        expect(mockLog)
          .toHaveBeenCalledWith('error', expectedMessageMatcher, expect.objectContaining(expectedMeta));
      });
    });

    describe('warn', () => {
      it('should log a warn', () => {
        underTest.log.warn(expectedLogEvent, expectedMeta);
        expect(mockLog)
          .toHaveBeenCalledWith('warn', expectedMessageMatcher, expect.objectContaining(expectedMeta));
      });
    });

    describe('info', () => {
      it('should log an info', () => {
        underTest.log.info(expectedLogEvent, expectedMeta);
        expect(mockLog)
          .toHaveBeenCalledWith('info', expectedMessageMatcher, expect.objectContaining(expectedMeta));
      });
    });

    describe('debug', () => {
      it('should log a debug', () => {
        underTest.log.debug(expectedLogEvent, expectedMeta);
        expect(mockLog)
          .toHaveBeenCalledWith('debug', expectedMessageMatcher, expect.objectContaining(expectedMeta));
      });
    });

    describe('verbose', () => {
      it('should log a verbose', () => {
        underTest.log.verbose(expectedLogEvent, expectedMeta);
        expect(mockLog)
          .toHaveBeenCalledWith('verbose', expectedMessageMatcher, expect.objectContaining(expectedMeta));
      });
    });

    describe('silly', () => {
      it('should log a silly', () => {
        underTest.log.silly(expectedLogEvent, expectedMeta);
        expect(mockLog)
          .toHaveBeenCalledWith('silly', expectedMessageMatcher, expect.objectContaining(expectedMeta));
      });
    });
  });
});
