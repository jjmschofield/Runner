/* eslint-disable global-require */
const { createMockLogger } = require('../logger.mock');
const { createNextMock, createResponseMock, createRequestMock } = require('../../express/mocks/express.mock');
const { createMockOnFinished } = require('../../express/mocks/on-finished.mock.js');

describe('src/lib/logger/middleware/requestLoggers.js', () => {
  const mockOnFinished = createMockOnFinished();
  const mockLogger = createMockLogger();
  const underTest = require('./requestLoggersMiddleware');

  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = createRequestMock();
    mockRes = createResponseMock();
    mockNext = createNextMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('logRequestStart', () => {
    const expectedLogPayload = {
      method: 'POST',
      originalUrl: 'some url',
      path: 'some path',
      ipAddress: 'some ip',
      forwardedForIpAddress: 'some ip',
      referer: 'some host',
      userAgent: 'some user agent',
    };

    beforeEach(() => {
      mockReq.method = expectedLogPayload.method;
      mockReq.originalUrl = expectedLogPayload.originalUrl;
      mockReq.path = expectedLogPayload.path;
      mockReq.connection.remoteAddress = expectedLogPayload.ipAddress;
      mockReq.headers['x-forwarded-for'] = expectedLogPayload.forwardedForIpAddress;
      mockReq.headers.host = expectedLogPayload.referer;
      mockReq.headers['user-agent'] = expectedLogPayload.userAgent;
    });

    it('should log the request starting', () => {
      const expectedLogEvent = mockLogger.LOG_EVENTS.REQUEST.START;
      underTest.logRequestStart(mockReq, mockRes, mockNext);
      expect(mockLogger.log.info).toHaveBeenCalledWith(expectedLogEvent, expectedLogPayload);
    });

    it('should call next', () => {
      underTest.logRequestStart(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('logRequestEnd', () => {
    beforeEach(() => {
      mockRes.finished = true;
      mockRes.req = mockReq;
    });

    describe('when the request has a status code less then 500', () => {
      const expectedLogEvent = mockLogger.LOG_EVENTS.REQUEST.COMPLETE;

      beforeEach(() => {
        mockRes.statusCode = 200;
        mockOnFinished.mockImplementation((res, callback) => {
          callback(undefined, res);
        });
      });

      it('should log the end of the request', () => {
        underTest.logRequestEnd(mockReq, mockRes, mockNext);
        expect(mockLogger.log.info).toHaveBeenCalledWith(expectedLogEvent, expect.anything());
      });
    });

    describe('or when the request has a status code greater then 499', () => {
      const expectedLogEvent = mockLogger.LOG_EVENTS.REQUEST.COMPLETE_WITH_ERRORS;

      beforeEach(() => {
        mockRes.statusCode = 500;
        mockOnFinished.mockImplementation((res, callback) => {
          callback(undefined, res);
        });
      });

      it('should log the end of the request', () => {
        underTest.logRequestEnd(mockReq, mockRes, mockNext);
        expect(mockLogger.log.error).toHaveBeenCalledWith(expectedLogEvent, expect.anything());
      });
    });

    describe('or when the request has unexpectedly errored', () => {
      const expectedLogEvent = mockLogger.LOG_EVENTS.REQUEST.UNEXPECTED_ERROR;
      const expectedError = new Error();

      beforeEach(() => {
        mockOnFinished.mockImplementation((res, callback) => {
          callback(expectedError, res);
        });
      });

      it('should log the end of the request', () => {
        underTest.logRequestEnd(mockReq, mockRes, mockNext);
        expect(mockLogger.log.error).toHaveBeenCalledWith(expectedLogEvent, expect.anything());
      });
    });
  });
});
