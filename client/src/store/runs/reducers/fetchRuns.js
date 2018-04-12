import { Run } from '../models/Run';

export function fetchRunsForUserIdInProgress(state) {
  return Object.assign({}, state, {
    fetchInProgress: true,
    fetchError: false,
  });
}

export function fetchRunsSuccess(state, action) {
  const existingRuns = getExistingRuns(state, action.data.userId);
  const newRuns = action.data.runs.map((run) => {
    return new Run(run);
  });

  return Object.assign({}, state, {
    runsByUserId: {
      ...state.runsByUserId,
      [action.data.userId]: existingRuns.concat(newRuns),
    },
    fetchInProgress: false,
    fetchError: false,
  });
}

function getExistingRuns(state, userId) {
  if (state.runsByUserId[userId]) {
    return Array.from(state.runsByUserId[userId]);
  }
  return [];
}

export function fetchRunsFailure(state) {
  return Object.assign({}, state, {
    fetchInProgress: false,
    fetchError: true,
  });
}

