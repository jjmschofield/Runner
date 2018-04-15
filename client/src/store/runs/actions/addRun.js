import { putRun } from '../../../api/activitiesApi';

export function addRun({userId, distance, duration, date}) {
  return (dispatch) => {
    dispatch(putRunRequest());

    return putRun({userId, distance, duration, date})
      .then((run) => {
        dispatch(putRunsSuccess({ run }));
      })
      .catch((error) => {
        console.error('Couldn\'t put run', error);
        dispatch(putRunFailure());
        return Promise.reject();
      });
  };
}

export const PUT_RUN_REQUEST = 'PUT_RUN_REQUEST';

function putRunRequest() {
  return { type: PUT_RUN_REQUEST };
}

export const PUT_RUN_SUCCESS = 'PUT_RUN_SUCCESS';

function putRunsSuccess(data) {
  return { type: PUT_RUN_SUCCESS, data };
}

export const PUT_RUN_FAILURE = 'PUT_RUN_FAILURE';

function putRunFailure() {
  return { type: PUT_RUN_FAILURE };
}
