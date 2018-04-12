const validator = require('validator');
const { respond, respondNotFound, respondUnexpectedError, respondBadRequest } = require('../../lib/express/utils/responseUtils');
const { log, LOG_EVENTS } = require('../../lib/logger/logger');
const { isValidInt } = require('../../lib/validators/paramValidators');
const { getRunsFromStoreByUserId } = require('../models/Run');

module.exports = {
  runsGetController: async (req, res) => {
    // TODO - be aware, this endpoint will return ANY users runs without checking authorization to access the record
    const { userId } = req.query;
    if (!isValidInt(userId)) {
      respondBadRequest(req, res);
      return;
    }

    try {
      const runs = await getRunsFromStoreByUserId(req.pgPool, userId);

      if (!runs) {
        respondNotFound(req, res);
        return;
      }

      respond(req, res, {
        runs,
      });
    }
    catch (error) {
      log.error(LOG_EVENTS.ERROR.UNEXPECTED_ERROR, { error });
      respondUnexpectedError(req, res);
    }
  },
};
