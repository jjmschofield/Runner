import { getUserById } from '../../../api/usersApi';

export function fetchUserById(userId) {
  return (dispatch) => {
    dispatch(fetchUserByIdRequest());

    return getUserById(userId)
      .then((user) => {
        dispatch(fetchUserSuccess({ user }));
      })
      .catch((error) => {
        console.error(`Couldn't fetch user ${userId}`, error);
        dispatch(fetchUserFailure());
        return Promise.reject();
      });
  };
}

export const FETCH_USER_BY_ID_REQUEST = 'FETCH_USER_BY_ID_REQUEST';

function fetchUserByIdRequest() {
  return { type: FETCH_USER_BY_ID_REQUEST };
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

function fetchUserSuccess(data) {
  return { type: FETCH_USER_SUCCESS, data };
}

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

function fetchUserFailure() {
  return { type: FETCH_USER_FAILURE };
}
