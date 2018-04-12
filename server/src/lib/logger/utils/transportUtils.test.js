const underTest = require('./transportUtils');
const { createErrorSpy } = require('../../mocks/console.mock');

describe('src/lib/logger/utils/transportUtils.js', () => {
  const errorSpy = createErrorSpy();

  const mockWinstonLogger = {
    add: jest.fn(),
  };

  const expectedLogLevel = 'silly';

  const expectedTransport = {
    constructor: function transportConstructor() {
    },
    expectedOptions: {
      someProp: 'some value',
    },
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('addTransportSync', () => {
    const mockTransportConstructor = jest.fn().mockReturnValue(expectedTransport);

    it('should add the transport to the logger', () => {
      underTest.addTransportSync(mockWinstonLogger, mockTransportConstructor, expectedLogLevel);
      expect(mockTransportConstructor).toHaveBeenCalledWith(expectedLogLevel);
      expect(mockWinstonLogger.add)
        .toHaveBeenCalledWith(expectedTransport.constructor, expectedTransport.options);
    });
  });
});
