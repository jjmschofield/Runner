const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { createPool } = require('../lib/pg/createPool');
const { createPgConnectionPoolMiddleware } = require('../lib/pg/middleware/pgConnectionPoolMiddleware');
const { rootController } = require('./controllers/rootController');
const { runsGetController } = require('./controllers/runsGetController');

const envVarsLoaded = () => {
  return process.env.DB_ACTIVITIES_SERVICE_USER && process.env.DB_ACTIVITIES_SERVICE_PASSWORD;
};

if (!envVarsLoaded()) {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
  if (!envVarsLoaded()) throw new Error('Activities service is missing required env vars');
}

const createActivitiesRouter = () => {
  const router = express.Router();

  const pgPool = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_ACTIVITIES_SERVICE_USER,
    password: process.env.DB_ACTIVITIES_SERVICE_PASSWORD,
  });

  router.use(createPgConnectionPoolMiddleware(pgPool));

  router.get('/', rootController);
  router.get('/runs', runsGetController);

  return router;
};

module.exports = {
  createActivitiesRouter,
};
