const { respond } = require('../../lib/express/utils/responseUtils');

module.exports = {
  rootController: (req, res) => {
    respond(req, res, {});
  },
};
