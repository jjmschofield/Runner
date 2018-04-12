module.exports = {
  createLogSpy: () => {
    return jest.spyOn(console, 'log').mockImplementation(() => {
    });
  },

  createErrorSpy: () => {
    return jest.spyOn(console, 'error').mockImplementation(() => {
    });
  },
};
