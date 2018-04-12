import { getRunsByUserById } from '../../../api/activitiesApi';

export function fetchRunsByUserId(userId) {
  return (dispatch) => {
    dispatch(fetchRunsByUserIdRequest());

    return getRunsByUserById(userId)
      .then((runs) => {
        dispatch(fetchRunsSuccess({ userId, runs }));
      })
      .catch((error) => {
        console.error(`Couldn't fetch runs for user ${userId}`, error);
        dispatch(fetchUserFailure());
        return Promise.reject();
      });
  };
}

export const FETCH_RUNS_BY_USER_ID_REQUEST = 'FETCH_RUNS_BY_USER_ID_REQUEST';

function fetchRunsByUserIdRequest() {
  return { type: FETCH_RUNS_BY_USER_ID_REQUEST };
}

export const FETCH_RUNS_SUCCESS = 'FETCH_RUNS_SUCCESS';

function fetchRunsSuccess(data) {
  return { type: FETCH_RUNS_SUCCESS, data };
}

export const FETCH_RUNS_FAILURE = 'FETCH_RUNS_FAILURE';

function fetchUserFailure() {
  return { type: FETCH_RUNS_FAILURE };
}
