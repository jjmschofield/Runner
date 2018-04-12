import { User } from '../models/User';

export function fetchUserByIdInProgress(state) {
  return Object.assign({}, state, {
    fetchInProgress: true,
    fetchError: false,
  });
}

export function fetchUserSuccess(state, action) {
  return Object.assign({}, state, {
    usersById: {
      ...state.usersById,
      [action.data.user.id]: new User(action.data.user),
    },
    fetchInProgress: false,
    fetchError: false,
  });
}

export function fetchUserFailure(state) {
  return Object.assign({}, state, {
    fetchInProgress: false,
    fetchError: true,
  });
}
