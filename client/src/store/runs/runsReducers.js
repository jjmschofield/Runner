import { RunsState } from './models/RunsState';
import {
  FETCH_RUNS_BY_USER_ID_REQUEST,
  FETCH_RUNS_SUCCESS,
  FETCH_RUNS_FAILURE,
} from './actions/fetchRuns';

import {
  fetchRunsForUserIdInProgress,
  fetchRunsSuccess,
  fetchRunsFailure,
} from './reducers/fetchRuns';

import { PUT_RUN_REQUEST, PUT_RUN_SUCCESS, PUT_RUN_FAILURE } from './actions/addRun';
import { putRunInProgress, putRunSuccess, putRunFailure, } from './reducers/addRun';

export default (runsState = new RunsState(), action) => {
  switch (action.type) {
    case FETCH_RUNS_BY_USER_ID_REQUEST:
      return fetchRunsForUserIdInProgress(runsState, action);
    case FETCH_RUNS_SUCCESS:
      return fetchRunsSuccess(runsState, action);
    case FETCH_RUNS_FAILURE:
      return fetchRunsFailure(runsState, action);

    case PUT_RUN_REQUEST:
      return putRunInProgress(runsState, action);
    case PUT_RUN_SUCCESS:
      return putRunSuccess(runsState, action);
    case PUT_RUN_FAILURE:
      return putRunFailure(runsState, action);

    default:
      return runsState;
  }
};
