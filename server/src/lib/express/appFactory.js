const express = require('express');
const cors = require('cors');

const { setCommonSecurityHeaders } = require('./middleware/securityHeaderMiddleware');
const { logRequestStart, logRequestEnd } = require('../logger/middleware/requestLoggersMiddleware');
const { setCorrelationId } = require('../logger/middleware/correlationIdMiddleware');
const { unexpectedErrorHandler } = require('./middleware/errorHandlerMiddleware');

module.exports = {
  createDefaultExpressApp: () => {
    const app = express();
    applyMiddleware(app);
    return app;
  },
  applyErrorHandlerMiddleware: (app) => {
    applyErrorHandlerMiddleware(app);
    return app;
  },
};

function applyMiddleware(app) {
  applySecurityMiddleware(app);
  applyLoggerMiddleware(app);
}

function applyErrorHandlerMiddleware(app) {
  app.use(unexpectedErrorHandler);
}

function applySecurityMiddleware(app) {
  app.use(setCommonSecurityHeaders);
  // TODO this allows all address to access this api from a browser - this should be restricted
  app.use(cors());
}

function applyLoggerMiddleware(app) {
  app.use(setCorrelationId);
  app.use(logRequestStart);
  app.use(logRequestEnd);
}
