const validator = require('validator');

const isValidInt = (int) => {
  return typeof int === 'string' && validator.isInt(int) && parseInt(int, 10) < 2147483648;
};

module.exports = {
  isValidInt,
};
