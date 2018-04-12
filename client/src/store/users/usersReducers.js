import { UsersState } from './models/UsersState';
import {
  FETCH_USER_BY_ID_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './actions/fetchUser';

import {
  fetchUserByIdInProgress,
  fetchUserSuccess,
  fetchUserFailure,
} from './reducers/fetchUser';


export default (usersState = new UsersState(), action) => {
  switch (action.type) {
    case FETCH_USER_BY_ID_REQUEST:
      return fetchUserByIdInProgress(usersState, action);
    case FETCH_USER_SUCCESS:
      return fetchUserSuccess(usersState, action);
    case FETCH_USER_FAILURE:
      return fetchUserFailure(usersState, action);

    default:
      return usersState;
  }
};
