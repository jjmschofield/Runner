const correlator = require('correlation-id');

module.exports = {
  setCorrelationId: (req, res, next) => {
    const providedId = getCorrelationIdFromRequest(req);

    if (typeof providedId === 'string') {
      correlator.withId(providedId, next);
    }
    else {
      correlator.withId(next);
    }
  },
};

function getCorrelationIdFromRequest() { // TODO - define a header to set the correlation ID
  return null;
}
