import { createStore as createReduxStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import users from './users/usersReducers';

export function createStore() {
  const reducers = combineReducers({
    users,
  });

  const logger = createLogger();

  return createReduxStore(
    reducers,
    applyMiddleware(thunk, logger)
  );
}

export default createStore;
