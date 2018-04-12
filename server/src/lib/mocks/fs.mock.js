module.exports = {
  createMockFs: () => {
    const mockReadFileSync = jest.fn();

    jest.mock('fs', () => {
      return {
        readFileSync: mockReadFileSync,
      };
    });

    return {
      mockReadFileSync,
    };
  },
};
