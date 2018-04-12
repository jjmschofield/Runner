module.exports = {
  createConsoleTransportMock: () => {
    const mockConsoleTransport = {
      createConsoleTransport: jest.fn().mockImplementation(() => {
        return function consoleTransportConstructor() {
        };
      }),
    };

    jest.mock('./consoleTransport', () => {
      return mockConsoleTransport;
    });

    return mockConsoleTransport;
  },
};
