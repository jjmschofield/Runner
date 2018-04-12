/* eslint-disable global-require */
const { createMockLogger } = require('../../logger/logger.mock');
const { createMockResponseHelpers } = require('../utils/responseUtils.mock');
const { createRequestMock, createResponseMock, createNextMock } = require('../../express/mocks/express.mock');

describe('src/lib/express/middleware/errorHandlerMiddleware.test.js', () => {
  const mockResponseHelpers = createMockResponseHelpers();
  const mockLogger = createMockLogger();
  const underTest = require('./errorHandlerMiddleware');

  let expectedError;
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    expectedError = new Error();
    expectedError.message = 'some message';
    expectedError.stack = 'some stack trace';

    mockReq = createRequestMock();
    mockRes = createResponseMock();
    mockNext = createNextMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('unexpectedErrorHandler', () => {
    it('should respond with an unexpected error', () => {
      underTest.unexpectedErrorHandler(expectedError, mockReq, mockRes, mockNext);
      expect(mockResponseHelpers.respondUnexpectedError).toHaveBeenCalledWith(mockReq, mockRes);
    });

    it('should not call next', () => {
      underTest.unexpectedErrorHandler(expectedError, mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should log the event', () => {
      const expectedLogEvent = mockLogger.LOG_EVENTS.ERROR.UNEXPECTED_ERROR;
      const expectedOriginalUrl = 'original url';
      const expectedPath = 'path';

      mockReq.originalUrl = expectedOriginalUrl;
      mockReq.path = expectedPath;

      const expectedPayload = {
        error: expectedError,
        originalUrl: expectedOriginalUrl,
        path: expectedPath,
      };
      underTest.unexpectedErrorHandler(expectedError, mockReq, mockRes, mockNext);
      expect(mockLogger.log.error).toHaveBeenCalledWith(expectedLogEvent, expectedPayload);
    });
  });
});
