const winston = require('winston');

const LOG_EVENTS = require('./definitions/LOG_EVENTS');
const { addTransportSync } = require('./utils/transportUtils');
const { winstonLogWrapper } = require('./utils/logUtils');
const { createConsoleTransport } = require('./transports/consoleTransport');

module.exports = {
  log: {
    error: (logEvent, meta) => {
      winstonLogWrapper(module.exports.logger.error, logEvent, meta);
    },
    warn: (logEvent, meta) => {
      winstonLogWrapper(module.exports.logger.warn, logEvent, meta);
    },
    info: (logEvent, meta) => {
      winstonLogWrapper(module.exports.logger.info, logEvent, meta);
    },
    verbose: (logEvent, meta) => {
      winstonLogWrapper(module.exports.logger.verbose, logEvent, meta);
    },
    debug: (logEvent, meta) => {
      winstonLogWrapper(module.exports.logger.debug, logEvent, meta);
    },
    silly: (logEvent, meta) => {
      winstonLogWrapper(module.exports.logger.silly, logEvent, meta);
    },
  },
  LOG_EVENTS,
  logger: createWinstonLogger(),
};

function createWinstonLogger() {
  const logLevel = process.env.logLevel || 'debug';

  const logger = new winston.Logger({
    level: logLevel,
  });

  addTransportSync(logger, createConsoleTransport, logLevel);

  return logger;
}
