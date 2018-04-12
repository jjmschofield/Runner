const { log, LOG_EVENTS } = require('../../logger/logger');
const { respondUnexpectedError } = require('../utils/responseUtils');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  unexpectedErrorHandler: (error, req, res, next) => {
    const errorLogPayload = createErrorLogPayload(req, error);
    log.error(LOG_EVENTS.ERROR.UNEXPECTED_ERROR, errorLogPayload);
    respondUnexpectedError(req, res);
  },
};

function createErrorLogPayload(req, error) {
  return {
    error,
    originalUrl: req.originalUrl,
    path: req.path,
  };
}
