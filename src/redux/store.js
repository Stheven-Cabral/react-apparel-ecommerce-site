// Creating a redux store.

import { createStore, applyMiddleware } from 'redux';
// redux logger is dev-tool for tracking state.
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;