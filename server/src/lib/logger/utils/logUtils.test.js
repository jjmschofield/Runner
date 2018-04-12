/* eslint-disable max-len */
const correlator = require('correlation-id');
const { LOG_EVENTS } = require('../logger');
const underTest = require('./logUtils');

describe('src/lib/logger/utils/logUtils.test.js', () => {
  let expectedLogEvent;
  let expectedMessageMatcher;
  let expectedMeta;
  const expectedServiceName = 'some service';

  beforeEach(() => {
    expectedLogEvent = LOG_EVENTS.ERROR.UNEXPECTED_ERROR;
    expectedMessageMatcher = expect.stringContaining(expectedLogEvent.id)
      && expect.stringContaining(expectedLogEvent.msg)
      && expect.stringContaining(expectedLogEvent.description);

    expectedMeta = {
      someProp: 'some value',
    };

    process.env.SERVICE_NAME = expectedServiceName;
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.SERVICE_NAME;
  });

  describe('winstonLogWrapper', () => {
    it('should call the provided log function', () => {
      const logFunction = jest.fn();
      underTest.winstonLogWrapper(logFunction, expectedLogEvent, expectedMeta);
      expect(logFunction)
        .toHaveBeenCalledWith(expectedMessageMatcher, expect.objectContaining(expectedMeta));
    });

    it('should add a service meta property to every log message', () => {
      const logFunction = jest.fn();
      underTest.winstonLogWrapper(logFunction, expectedLogEvent, expectedMeta);
      expect(logFunction)
        .toHaveBeenCalledWith(expectedMessageMatcher, expect.objectContaining({ _service: expectedServiceName }));
    });

    it('should add a timestamp to every log message', () => {
      const expectedTimestamp = 1234;
      const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(expectedTimestamp);

      const logFunction = jest.fn();
      underTest.winstonLogWrapper(logFunction, expectedLogEvent, expectedMeta);

      expect(dateNowSpy).toHaveBeenCalled();
      expect(logFunction)
        .toHaveBeenCalledWith(expectedMessageMatcher, expect.objectContaining({ _timestamp: expectedTimestamp }));
    });

    it('should add a correlation ID to every log message', () => {
      const expectedId = 'some-id';
      const correlatorGetIdSpy = jest.spyOn(correlator, 'getId').mockReturnValue(expectedId);

      const logFunction = jest.fn();

      correlator.withId(expectedId, () => {
        underTest.winstonLogWrapper(logFunction, expectedLogEvent, expectedMeta);
      });

      expect(logFunction)
        .toHaveBeenCalledWith(expectedMessageMatcher, expect.objectContaining({ _correlationId: expectedId }));
      expect(correlatorGetIdSpy).toHaveBeenCalled();
    });

    it('should attach the meta data as event data', () => {
      const logFunction = jest.fn();
      underTest.winstonLogWrapper(logFunction, expectedLogEvent, expectedMeta);

      expect(logFunction)
        .toHaveBeenCalledWith(expectedMessageMatcher, expect.objectContaining(expectedMeta));
    });

    describe('when the log payload includes an error', () => {
      const expectedError = new Error('Some message');
      let expectedErrorMeta;

      beforeEach(() => {
        expectedErrorMeta = {
          error: {
            message: expectedError.message,
            stack: expectedError.stack,
          },
        };
      });

      it('should parse the error to a serializable structure', () => {
        const logFunction = jest.fn();
        underTest.winstonLogWrapper(logFunction, expectedLogEvent, { error: expectedError });

        expect(logFunction)
          .toHaveBeenCalledWith(expectedMessageMatcher, expect.objectContaining(expectedErrorMeta));
      });
    });

    describe('when given a string and not a log event', () => {
      it('should log the string as the message', () => {
        const expectedMessage = 'some message';
        const logFunction = jest.fn();
        underTest.winstonLogWrapper(logFunction, expectedMessage, expectedMeta);
        expect(logFunction)
          .toHaveBeenCalledWith(expect.stringContaining(expectedMessage), expect.objectContaining(expectedMeta));
      });
    });
  });
});
