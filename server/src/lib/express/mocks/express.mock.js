module.exports = {
  createNextMock: () => {
    return jest.fn();
  },
  createRequestMock: () => {
    return {
      headers: {},
      connection: {},
      body: {},
    };
  },
  createResponseMock: () => {
    const responseMock = {
      status: jest.fn().mockImplementation(() => {
        return responseMock;
      }),
      send: jest.fn().mockImplementation(() => {
        return responseMock;
      }),
    };
    return responseMock;
  },
  createAppMock: () => {
    const mockExpressApp = {
      use: jest.fn().mockReturnThis(),
    };

    jest.mock('express', () => {
      return () => {
        return mockExpressApp;
      };
    });

    return mockExpressApp;
  },
};
