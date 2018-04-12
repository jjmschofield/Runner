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


export default (runsState = new RunsState(), action) => {
  switch (action.type) {
    case FETCH_RUNS_BY_USER_ID_REQUEST:
      return fetchRunsForUserIdInProgress(runsState, action);
    case FETCH_RUNS_SUCCESS:
      return fetchRunsSuccess(runsState, action);
    case FETCH_RUNS_FAILURE:
      return fetchRunsFailure(runsState, action);

    default:
      return runsState;
  }
};
