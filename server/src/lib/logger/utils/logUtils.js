const correlator = require('correlation-id');
const caller = require('caller');

module.exports = {
  winstonLogWrapper: (winstonLogFn, logEvent, meta) => {
    const extendedMeta = extendMeta(meta, logEvent);
    const message = logEventToString(logEvent, extendedMeta);
    winstonLogFn(message, extendedMeta);
  },
};

function logEventToString(logEvent, meta) {
  if (typeof logEvent !== 'object') {
    return logEvent;
  }

  // eslint-disable-next-line no-underscore-dangle
  return `[${logEvent.msg}] ${logEvent.description} [${logEvent.id}][${meta._correlationId}]`;
}

function extendMeta(meta, logEvent) {
  const extendedProperties = {
    _id: logEvent.id,
    _name: logEvent.msg,
    _accountId: process.env.ACCOUNT_ID,
    _stack: process.env.STACK_NAME,
    _region: process.env.REGION,
    _service: process.env.SERVICE_NAME,
    _timestamp: Date.now(),
    _correlationId: correlator.getId(),
    _caller: caller(3),
  };

  if (meta && meta.error) {
    extendedProperties.error = {
      message: meta.error.message,
      stack: meta.error.stack,
    };
  }

  return Object.assign({}, meta, extendedProperties);
}
