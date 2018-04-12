/* eslint-disable global-require */
const correlator = require('correlation-id');
const validator = require('validator');

const { createNextMock, createRequestMock, createResponseMock } = require('../../express/mocks/express.mock');


describe('src/lib/logger/middleware/correlationIdMiddleware.js', () => {
  const underTest = require('./correlationIdMiddleware');

  let mockNext;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockNext = createNextMock();
    mockReq = createRequestMock();
    mockRes = createResponseMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('setCorrelationId', () => {
    describe('when the request does not contain a correlation ID', () => {
      it('should set a random correlation ID', (done) => {
        mockNext.mockImplementation(() => {
          const result = correlator.getId();
          const isValidGuid = validator.isUUID(result);

          expect(result).toBeDefined();
          expect(isValidGuid).toEqual(true);

          done();
        });

        underTest.setCorrelationId(mockReq, mockRes, mockNext);
      });

      it('should call next', () => {
        underTest.setCorrelationId(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });
});
