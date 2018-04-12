const winston = require('winston');

module.exports = {
  createConsoleTransport: (logLevel) => {
    return {
      constructor: winston.transports.Console,
      options: {
        level: logLevel,
        colorize: true,
      },
    };
  },
};
