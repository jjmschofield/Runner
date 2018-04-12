module.exports = {
  callFunction: async (pool, functionName, args) => {
    const client = await pool.connect();
    try {
      const res = await client.query(`SELECT * FROM ${functionName}(${args})`);
      return res;
    }
    finally {
      client.release();
    }
  },
};
