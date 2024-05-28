import { combineReducers } from 'redux';
import userReducer from './userReducer.ts';
import refreshReducer from './refreshReducer.ts';

const rootReducer = combineReducers({
  user: userReducer,
  refresh: refreshReducer,
});

export default rootReducer;
