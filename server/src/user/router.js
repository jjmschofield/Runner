const express = require('express');

const { rootController } = require('./controllers/rootController');

module.exports = {
  createUserRouter,
};


function createUserRouter() {
  const router = express.Router();

  router.get('/', rootController);

  return router;
}
