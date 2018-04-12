/* eslint-disable global-require */
const { createAppMock } = require('./mocks/express.mock');

const { logRequestStart, logRequestEnd } = require('../logger/middleware/requestLoggersMiddleware');
const { setCorrelationId } = require('../logger/middleware/correlationIdMiddleware');
const { setCommonSecurityHeaders } = require('./middleware/securityHeaderMiddleware');
const { unexpectedErrorHandler } = require('./middleware/errorHandlerMiddleware');

describe('src/lib/express/appFactory.js', () => {
  const mockApp = createAppMock();
  const underTest = require('./appFactory');

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createDefaultExpressApp', () => {
    it('should return a new express app', () => {
      expect(underTest.createDefaultExpressApp()).toEqual(mockApp);
    });

    it('should apply the setCommonSecurityHeaders middleware', () => {
      underTest.createDefaultExpressApp();
      expect(mockApp.use).toHaveBeenCalledWith(setCommonSecurityHeaders);
    });

    it('should apply the setCorrelationId middleware', () => {
      underTest.createDefaultExpressApp();
      expect(mockApp.use).toHaveBeenCalledWith(setCorrelationId);
    });

    it('should apply the logRequestStart middleware', () => {
      underTest.createDefaultExpressApp();
      expect(mockApp.use).toHaveBeenCalledWith(logRequestStart);
    });

    it('should apply the logRequestEnd middleware', () => {
      underTest.createDefaultExpressApp();
      expect(mockApp.use).toHaveBeenCalledWith(logRequestEnd);
    });
  });

  describe('applyErrorHandlerMiddleware', () => {
    it('should return a new express app', () => {
      const app = underTest.createDefaultExpressApp();
      underTest.applyErrorHandlerMiddleware(app);
      expect(mockApp.use).toHaveBeenCalledWith(unexpectedErrorHandler);
    });
  });
});
