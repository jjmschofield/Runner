const onFinished = require('on-finished');
const correlator = require('correlation-id');

const { log, LOG_EVENTS } = require('../logger');

module.exports = {
  logRequestStart: (req, res, next) => {
    logRequestStart(req);
    next();
  },
  logRequestEnd: (req, res, next) => {
    req.start = Date.now();
    const correlationId = correlator.getId();
    onFinished(res, (error, completedRes) => {
      correlator.withId(correlationId, () => {
        logRequestEnd(error, completedRes);
      });
    });
    next();
  },
};

function logRequestStart(req) {
  const meta = {
    method: req.method,
    originalUrl: req.originalUrl,
    path: req.path,
    ipAddress: req.connection.remoteAddress,
    forwardedForIpAddress: req.headers['x-forwarded-for'],
    referer: req.headers.host,
    userAgent: req.headers['user-agent'],
  };
  log.info(LOG_EVENTS.REQUEST.START, meta);
}

function logRequestEnd(error, res) {
  const requestEndData = createRequestEndData(res);
  if (error) {
    requestEndData.error = error;
    log.error(LOG_EVENTS.REQUEST.UNEXPECTED_ERROR, requestEndData);
  }
  else if (res.statusCode < 500) {
    log.info(LOG_EVENTS.REQUEST.COMPLETE, requestEndData);
  }
  else {
    log.error(LOG_EVENTS.REQUEST.COMPLETE_WITH_ERRORS, requestEndData);
  }
}

function createRequestEndData(res) {
  return {
    // eslint-disable-next-line no-underscore-dangle
    contentBytes: res._contentLength,
    executionTimeMs: Date.now() - res.req.start,
    // eslint-disable-next-line no-underscore-dangle
    hasBody: res._hasBody,
    // eslint-disable-next-line no-underscore-dangle
    headers: res._headers,
    method: res.req.method,
    originalUrl: res.req.originalUrl,
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
  };
}
