const { Pool } = require('pg');

module.exports = {
  createPool: ({ user, host, database, password }) => {
    return new Pool({
      user,
      host,
      database,
      password,
    });
  },
};
