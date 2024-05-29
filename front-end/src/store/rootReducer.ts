import { combineReducers } from 'redux';
import userReducer from './userReducer';
import claimReducer from './claimReducer';

const rootReducer = combineReducers({
  user: userReducer,
  claim: claimReducer,
});

export default rootReducer;
