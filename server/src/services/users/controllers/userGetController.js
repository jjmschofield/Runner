const { respond, respondNotFound, respondUnexpectedError, respondBadRequest } = require('../../../lib/express/utils/responseUtils');
const { log, LOG_EVENTS } = require('../../../lib/logger/logger');
const { isValidInt } = require('../../../lib/validators/paramValidators');
const { getUserFromStoreById } = require('../models/User');

module.exports = {
  userGetController: async (req, res) => {
    // TODO - be aware, this endpoint will return ANY user without checking authorization to access the record
    const { userId } = req.params;
    if (!isValidInt(userId)) {
      respondBadRequest(req, res);
      return;
    }

    try {
      const user = await getUserFromStoreById(req.pgPool, userId);

      if (!user) {
        respondNotFound(req, res);
        return;
      }

      respond(req, res, {
        user,
      });
    }
    catch (error) {
      log.error(LOG_EVENTS.ERROR.UNEXPECTED_ERROR, { error });
      respondUnexpectedError(req, res);
    }
  },
};
