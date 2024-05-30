import { combineReducers } from 'redux';
import { userSlice } from '../entities/User';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});

export default rootReducer;
