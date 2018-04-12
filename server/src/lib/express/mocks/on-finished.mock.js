module.exports = {
  createMockOnFinished: () => {
    const mockOnFinished = jest.fn();
    jest.mock('on-finished', () => {
      return mockOnFinished;
    });
    return mockOnFinished;
  },
};
