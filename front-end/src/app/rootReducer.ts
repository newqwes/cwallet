import { combineReducers } from 'redux';
import { userSlice } from '../entities/User';
import { usersSlice } from '../entities/Users';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
});

export default rootReducer;
