const { STORED_PROCEDURES } = require('./sql/STORED_PROCEDURES');
const { callFunction } = require('../../../lib/pg/callFunction');

class User {
  constructor({ id, givenName, familyName, avatarUrl, dob, weight }) {
    this.id = id;

    this.profile = {
      givenName,
      familyName,
      avatarUrl,
      dob,
    };

    this.bios = {
      weight,
    };
  }
}

const getUserFromStoreById = async (pgConnectionPool, userId) => {
  const storeResponse = await callFunction(pgConnectionPool, STORED_PROCEDURES.SELECT_USER_PROFILE_AND_BIO, [userId]);

  if (storeResponse.rows.length < 1) {
    return null;
  }

  return createUserFromUserInStore(storeResponse.rows[0]);
};

const createUserFromUserInStore = (userInStore) => {
  return new User({
    id: userInStore.id,
    givenName: userInStore.profile_given_name,
    familyName: userInStore.profile_family_name,
    avatarUrl: userInStore.profile_avatar_url,
    dob: userInStore.profile_dob,
    weight: userInStore.bios_weight,
  });
};

module.exports = {
  User,
  getUserFromStoreById,
};
