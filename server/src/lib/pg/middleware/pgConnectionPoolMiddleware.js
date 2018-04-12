const createPgConnectionPoolMiddleware = (pool) => {
  return (req, res, next) => {
    req.pgPool = pool;
    next();
  };
};

module.exports = {
  createPgConnectionPoolMiddleware,
};
