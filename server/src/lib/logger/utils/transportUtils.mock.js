module.exports = {
  createMockTransportHelpers: () => {
    const mockTransportHelpers = {
      addTransportSync: jest.fn(),
    };

    jest.mock('./transportUtils', () => {
      return mockTransportHelpers;
    });

    return mockTransportHelpers;
  },
};
