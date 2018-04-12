const { STORED_PROCEDURES } = require('./sql/STORED_PROCEDURES');
const { callFunction } = require('../../../lib/pg/callFunction');

class Run {
  constructor({ id, userId, distance, duration, date, kCalMin }) {
    this.id = id;
    this.userId = userId;
    this.distance = distance;
    this.duration = duration;
    this.kCalMin = kCalMin;
    this.date = date;
  }
}

const getRunsFromStoreByUserId = async (pgConnectionPool, userId) => {
  const storeResponse = await callFunction(pgConnectionPool, STORED_PROCEDURES.SELECT_RUNS_FOR_USER, [userId]);

  if (storeResponse.rows.length < 1) {
    return [];
  }

  const runs = storeResponse.rows.map((run) => {
    return createUserFromUserInStore(run);
  });

  return runs;
};

const createUserFromUserInStore = (runInStore) => {
  return new Run({
    id: runInStore.id,
    userId: runInStore.user_id,
    distance: runInStore.distance_meters,
    duration: runInStore.duration_seconds,
    date: runInStore.date,
    kCalMin: runInStore.k_cal_min,
  });
};


module.exports = {
  Run,
  getRunsFromStoreByUserId,
};
