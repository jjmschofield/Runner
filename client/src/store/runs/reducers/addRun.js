import { Run } from '../models/Run';

export function putRunInProgress(state) {
  return Object.assign({}, state, {
    fetchInProgress: true,
    fetchError: false,
  });
}

export function putRunSuccess(state, action) {
  const runs = getExistingRuns(state, action.data.run.userId);
  runs.push(new Run(action.data.run));

  console.log(runs);


  return Object.assign({}, state, {
    runsByUserId: {
      ...state.runsByUserId,
      [action.data.run.userId]: runs,
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

export function putRunFailure(state) {
  return Object.assign({}, state, {
    fetchInProgress: false,
    fetchError: true,
  });
}

