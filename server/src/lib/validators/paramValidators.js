const validator = require('validator');
const dateFns = require('date-fns');

const isValidInt = (int) => {
  if (typeof int === 'string') {
    return validator.isInt(int)
      && parseInt(int, 10) < 2147483648
      && parseInt(int, 10) > -2147483648;
  }

  if (typeof int === 'number') {
    return int < 2147483648
      && int > -2147483648
      && int.toString().indexOf('.') < 0;
  }

  return false;
};

const isValidDate = (date) => {
  return dateFns.isValid(new Date(date));
};

module.exports = {
  isValidInt,
  isValidDate,
};
