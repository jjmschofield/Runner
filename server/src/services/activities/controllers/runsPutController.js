const { respond, respondNotFound, respondUnexpectedError, respondBadRequest } = require('../../../lib/express/utils/responseUtils');
const { log, LOG_EVENTS } = require('../../../lib/logger/logger');
const { isValidInt, isValidDate } = require('../../../lib/validators/paramValidators');
const { addRunToStoreByUserId } = require('../models/Run');

module.exports = {
  runsPutController: async (req, res) => {
    // TODO - be aware, this endpoint will allow anyone to add a run to anyone as there is no auth
    const { userId, distance, duration, date } = req.body;

    if (!isValidInt(userId) || !isValidInt(distance) || !isValidInt(duration) || !isValidDate(date)) {
      respondBadRequest(req, res);
      return;
    }

    try {
      const run = await addRunToStoreByUserId(req.pgPool, { userId, distance, duration, date });

      if (!run) {
        respondNotFound(req, res);
        return;
      }

      respond(req, res, {
        run,
      });
    }
    catch (error) {
      log.error(LOG_EVENTS.ERROR.UNEXPECTED_ERROR, { error });
      respondUnexpectedError(req, res);
    }
  },
};
