module.exports = {
  createMockResponseHelpers: () => {
    const mockResponseHelpers = {
      respond: jest.fn(),
      respondUnexpectedError: jest.fn(),
    };

    jest.mock('./responseUtils', () => {
      return mockResponseHelpers;
    });

    return mockResponseHelpers;
  },
};
