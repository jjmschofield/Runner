const { log, LOG_EVENTS } = require('../../logger/logger');

module.exports = {
  respond: (req, res, payload) => {
    log.info(LOG_EVENTS.RESPONSE.RESPONDING_OK);
    res.status(200).send(payload);
  },
  respondBadRequest: (req, res, payload) => {
    log.info(LOG_EVENTS.RESPONSE.RESPONDING_BAD_REQUEST);
    res.status(400).send(payload);
  },
  respondNotFound: (req, res, payload) => {
    log.info(LOG_EVENTS.RESPONSE.RESPONDING_NOT_FOUND);
    res.status(404).send(payload);
  },
  respondUnexpectedError: (req, res) => {
    log.info(LOG_EVENTS.RESPONSE.RESPONDING_UNEXPECTED_ERROR);
    res.status(500).send();
  },
};
