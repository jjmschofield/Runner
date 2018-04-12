/* eslint-disable global-require */
const { createMockLogger } = require('../../logger/logger.mock');
const { createResponseMock, createRequestMock } = require('../mocks/express.mock');

describe('src/lib/express/responseUtils.js', () => {
  const mockLogger = createMockLogger();

  const underTest = require('./responseUtils');

  let mockRes;
  let mockReq;

  beforeEach(() => {
    mockRes = createResponseMock();
    mockReq = createRequestMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('respond', () => {
    it('should apply the status code 200', () => {
      underTest.respond(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should end the request with the provided payload', () => {
      const expectedPayload = { someProp: 'some value' };
      underTest.respond(mockReq, mockRes, expectedPayload);
      expect(mockRes.send).toHaveBeenCalledWith(expectedPayload);
    });

    it('should log the event', () => {
      const expectedEvent = mockLogger.LOG_EVENTS.RESPONSE.RESPONDING_OK;
      underTest.respond(mockReq, mockRes);
      expect(mockLogger.log.info).toHaveBeenCalledWith(expectedEvent);
    });
  });

  describe('respondBadRequest', () => {
    it('should apply the status code 500', () => {
      underTest.respondBadRequest(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should log the event', () => {
      const expectedEvent = mockLogger.LOG_EVENTS.RESPONSE.RESPONDING_BAD_REQUEST;
      underTest.respondBadRequest(mockReq, mockRes);
      expect(mockLogger.log.info).toHaveBeenCalledWith(expectedEvent);
    });
  });

  describe('respondNotFound', () => {
    it('should apply the status code 404', () => {
      underTest.respondNotFound(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('should log the event', () => {
      const expectedEvent = mockLogger.LOG_EVENTS.RESPONSE.RESPONDING_NOT_FOUND;
      underTest.respondNotFound(mockReq, mockRes);
      expect(mockLogger.log.info).toHaveBeenCalledWith(expectedEvent);
    });
  });

  describe('respondUnexpectedError', () => {
    it('should apply the status code 500', () => {
      underTest.respondUnexpectedError(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });

    it('should log the event', () => {
      const expectedEvent = mockLogger.LOG_EVENTS.RESPONSE.RESPONDING_UNEXPECTED_ERROR;
      underTest.respondUnexpectedError(mockReq, mockRes);
      expect(mockLogger.log.info).toHaveBeenCalledWith(expectedEvent);
    });
  });
});
