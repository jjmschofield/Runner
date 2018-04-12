module.exports = {
  createMockResponseHelpers: () => {
    const mockResponseHelpers = {
      respond: jest.fn(),
      respondUnexpectedError: jest.fn(),
      respondBadRequest: jest.fn(),
      respondNotFound: jest.fn(),
    };

    jest.mock('./responseUtils', () => {
      return mockResponseHelpers;
    });

    return mockResponseHelpers;
  },
};
