import { combineReducers } from 'redux';
import userReducer from './userReducer.ts';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
